import { state } from '../core/state.js'
import { api } from '../core/api.js'
import { EventBus } from '../core/eventBus.js'

export async function saveProject(){
  await api("projects",{
    method:"POST",
    headers:{'Content-Type':'application/json'},
    body:JSON.stringify(state.project)
  })

  EventBus.emit("project:saved")
}
