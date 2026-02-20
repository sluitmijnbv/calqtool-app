const LIMITS = {
  trial: { measure: 3, export: 1 },
  basic: { measure: 25, export: 10 },
  pro: { measure: 200, export: 100 },
  enterprise: { measure: Infinity, export: Infinity }
}

export function canUse(plan, type, usage) {
  return usage[type] < LIMITS[plan][type]
}

export function incrementUsage(state, type) {
  state.usage[type]++
}