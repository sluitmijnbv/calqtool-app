import { state } from '../core/state.js'
import { api } from '../core/api.js'
import { EventBus } from '../core/eventBus.js'
import { canUse } from './plan.js'

export function addElement(code){
  if(!canUse("measure")) return alert("Limiet bereikt")

  const exec = state.project.executions[state.executionIndex]

  exec.elements.push({
    code,
    quantity: 1
  })

  state.usage.measure++
  EventBus.emit("builder:update")
}

export async function calculate(){
  const exec = state.project.executions[state.executionIndex]

  const data = await api("calculate",{
    method:"POST",
    headers:{'Content-Type':'application/json'},
    body:JSON.stringify({
      projectId: state.project.id,
      executionId: exec.id,
      elements: exec.elements,
      region: state.region,
      year: state.year
    })
  })

  EventBus.emit("builder:result", data)
}
