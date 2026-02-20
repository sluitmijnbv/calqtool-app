import { uuid } from './utils.js'
import { EventBus } from './eventBus.js'

export const state = {
  plan: "trial",
  usage: { measure: 0, review: 0, export: 0 },
  region: "randstad",
  year: "2026",
  project: null,
  executionIndex: 0
}

export function initState() {

  state.project = {
    id: uuid(),
    name: "Nieuw project",
    executions: [
      {
        id: uuid(),
        name: "Standaard",
        elements: []
      }
    ]
  }

  EventBus.emit("state:initialized", state)
}
