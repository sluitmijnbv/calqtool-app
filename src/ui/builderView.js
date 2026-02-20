import { EventBus } from '../core/eventBus.js'
import { updateQuantity,
         removeElement } from '../modules/builder.js'

function formatCurrency(value){
  return Number(value).toLocaleString("nl-NL",{
    minimumFractionDigits:2,
    maximumFractionDigits:2
  })
}

function renderTable(result){

  const tableBody =
    document.getElementById("ct-selected-elements")

  if (!tableBody) return

  tableBody.innerHTML = ""

  result.breakdown.forEach((el, index) => {

    const row = document.createElement("tr")

    row.innerHTML = `
      <td>${el.name}</td>
      <td>
        <input type="number"
          value="${el.quantity}"
          data-index="${index}"
          class="qty-input" />
      </td>
      <td>€ ${formatCurrency(el.labor)}</td>
      <td>€ ${formatCurrency(el.material)}</td>
      <td><strong>€ ${formatCurrency(el.total)}</strong></td>
      <td>
        <button data-remove="${index}">✕</button>
      </td>
    `

    tableBody.appendChild(row)
  })

  bindRowEvents()
}

function bindRowEvents(){

  document.querySelectorAll(".qty-input")
    .forEach(input=>{
      input.addEventListener("change", e=>{
        const index =
          parseInt(e.target.dataset.index)
        updateQuantity(index, e.target.value)
      })
    })

  document.querySelectorAll("[data-remove]")
    .forEach(btn=>{
      btn.addEventListener("click", e=>{
        const index =
          parseInt(e.target.dataset.remove)
        removeElement(index)
      })
    })
}

EventBus.on("builder:result", renderTable)

EventBus.on("policy:block", message=>{
  alert(message)
})