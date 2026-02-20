import { state } from '../core/state.js'
import { EventBus } from '../core/eventBus.js'
import { calculateExecution } from '../core/engine.js'
import { canUse, incrementUsage } from '../core/usageEngine.js'

/* === ADD ELEMENT === */
export function addElement(code) {

  if (!canUse(state.plan, "measure", state.usage)) {
    EventBus.emit("policy:block",
      "Metingen limiet bereikt.")
    return
  }

  const execution =
    state.project.executions[state.executionIndex]

  execution.elements.push({
    code,
    quantity: 1
  })

  incrementUsage(state, "measure")

  EventBus.emit("builder:update")
}

/* === UPDATE QUANTITY === */
export function updateQuantity(index, value) {

  const execution =
    state.project.executions[state.executionIndex]

  execution.elements[index].quantity =
    parseFloat(value) || 0

  EventBus.emit("builder:update")
}

/* === REMOVE ELEMENT === */
export function removeElement(index) {

  const execution =
    state.project.executions[state.executionIndex]

  execution.elements.splice(index, 1)

  EventBus.emit("builder:update")
}

/* === CALCULATE === */
function calculate() {

  const execution =
    state.project.executions[state.executionIndex]

  const result = calculateExecution({
    elements: execution.elements,
    priceLibrary: state.priceLibrary || {},
    laborRate: state.laborRate || 45,
    regionFactor: 1,
    indexFactor: 1
  })

  EventBus.emit("builder:result", result)
}

/* === LISTENER === */
EventBus.on("builder:update", calculate)