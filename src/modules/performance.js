import { state } from '../core/state.js'
import { EventBus } from '../core/eventBus.js'

/* ======================================================
   LOCAL STORAGE PERSISTENCE
====================================================== */

const STORAGE_KEY = "calqtool_autosave"

export function persist(){
  try{
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(state)
    )
  }catch(e){
    console.warn("Persist error:", e)
  }
}

export function restore(){
  try{
    const raw = localStorage.getItem(STORAGE_KEY)
    if(!raw) return

    const data = JSON.parse(raw)
    Object.assign(state, data)

    EventBus.emit("project:restored", state)

  }catch(e){
    console.warn("Restore error:", e)
  }
}

/* ======================================================
   PAYLOAD CACHE RESET
====================================================== */

export function resetPayloadCache(){
  state.lastPayload = null
}

/* ======================================================
   AUTO PERSIST ON PROJECT CHANGE
====================================================== */

EventBus.on("project:changed", ()=>{
  persist()
})

/* ======================================================
   RESET CACHE ON CRITICAL CHANGES
====================================================== */

EventBus.on("execution:changed", resetPayloadCache)
EventBus.on("plan:changed", resetPayloadCache)
EventBus.on("project:loaded", resetPayloadCache)
