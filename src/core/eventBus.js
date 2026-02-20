export const EventBus = {
  events: {},

  on(event, handler) {
    if (!this.events[event]) {
      this.events[event] = []
    }
    this.events[event].push(handler)
  },

  emit(event, data) {
    if (this.events[event]) {
      this.events[event].forEach(h => h(data))
    }
  },

  off(event, handler) {
    if (!this.events[event]) return
    this.events[event] =
      this.events[event].filter(h => h !== handler)
  }
}
