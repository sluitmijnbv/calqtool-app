/* =========================================================
   ===== CONTEXT BUILDER
========================================================= */

function buildAssistantContext(){

  const execution = getCurrentExecution();

  return {
    projectName: state.currentProject?.name,
    projectType: state.currentProject?.type,
    region: state.region,
    year: state.year,
    plan: state.plan,
    executionId: execution?.id,
    elements: execution?.elements || [],
    total: DOM.total?.innerText || "€ 0,00"
  };

}

/* =========================================================
   ===== MESSAGE RENDER
========================================================= */

function appendMessage(sender, text){

  if(!DOM_ASSISTANT.messages) return;

  const div = document.createElement("div");
  div.style.marginBottom = "10px";

  const strong = document.createElement("strong")
strong.textContent = sender + ": "

const span = document.createElement("span")
span.textContent = text

div.appendChild(strong)
div.appendChild(span)
;

  DOM_ASSISTANT.messages.appendChild(div);

  DOM_ASSISTANT.messages.scrollTop =
    DOM_ASSISTANT.messages.scrollHeight;

}

/* =========================================================
   ===== ACTION ENGINE
========================================================= */

function executeAssistantAction(action){

  const execution = getCurrentExecution();

  if(!execution) return;

  switch(action.type){

    case "add_element":

      if(!enforceLimit("measure")) return;

      execution.elements.push({
        code: action.code,
        quantity: action.quantity || 1,
        hourlyRateOverride: null
      });

      incrementUsage("measure");

      EventBus.emit("builder:updated");
      break;

    case "adjust_quantity":

      const index =
        execution.elements.findIndex(
          el => el.code === action.code
        );

      if(index !== -1){
        execution.elements[index].quantity =
          action.quantity;

        EventBus.emit("builder:updated");
      }
      break;

    case "warning":

      EventBus.emit("policy:received", {
        status: "warning",
        messages: [action.message]
      });
      break;

    default:
      console.warn("Onbekende assistent actie:", action);

  }

}

/* =========================================================
   ===== SEND MESSAGE
========================================================= */

async function sendAssistantMessage(){

  const message =
    DOM_ASSISTANT.input.value.trim();

  if(!message) return;

  appendMessage("Jij", message);

  DOM_ASSISTANT.input.value = "";

  showGlobalLoader();

  const context = buildAssistantContext();

  const data = await apiRequest("/assistant", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      message,
      context
    })
  });

  hideGlobalLoader();

  if(!data) return;

  if(data.reply){
    appendMessage("Hulp", data.reply);
  }

  if(data.actions && Array.isArray(data.actions)){
    data.actions.forEach(action=>{
      executeAssistantAction(action);
    });
  }

  EventBus.emit("assistant:completed", data);

}

import { api } from '../core/api.js'
import { state } from '../core/state.js'

export async function askAssistant(message){
  const exec=state.project.executions[state.executionIndex]
  return api("assistant",{
    method:"POST",
    headers:{'Content-Type':'application/json'},
    body:JSON.stringify({message,context:{project:state.project,execution:exec}})
  })
}
