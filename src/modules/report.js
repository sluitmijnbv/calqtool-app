import { state } from '../core/state.js'
import { api } from '../core/api.js'
import { canUse } from './plan.js'

export async function generateReport(){
  if(!canUse("export")) return alert("Export limiet bereikt")

  const exec = state.project.executions[state.executionIndex]

  const data = await api("report",{
    method:"POST",
    headers:{'Content-Type':'application/json'},
    body:JSON.stringify({
      projectId: state.project.id,
      executionId: exec.id,
      elements: exec.elements
    })
  })

  if(data.url){
    window.open(data.url)
  }

  state.usage.export++
}
