import { EventBus } from '../core/eventBus.js'

export function handlePolicy(policy){
  if(!policy) return

  if(policy.status === "blocked"){
    EventBus.emit("builder:lock")
  }

  if(policy.status === "warning"){
    EventBus.emit("builder:warning", policy.messages)
  }
}
