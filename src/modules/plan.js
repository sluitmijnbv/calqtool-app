import { state } from '../core/state.js'

export const LIMITS = {
  trial:{ measure:3, export:2 },
  basic:{ measure:20, export:10 },
  pro:{ measure:100, export:100 },
  enterprise:{ measure:Infinity, export:Infinity }
}

export function canUse(type){
  return state.usage[type] < LIMITS[state.plan][type]
}
