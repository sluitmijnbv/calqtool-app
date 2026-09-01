import { analyze } from "./drawing.js"
import { EventBus } from "../core/eventBus.js"

export function initBulkUpload() {
  const input = document.getElementById("ct-drawing-file")
  const btn = document.getElementById("ct-analyze-drawing")
  const status = document.getElementById("ct-upload-status")

  if (!input || !btn) return

  btn.addEventListener("click", async () => {
    const files = [...(input.files || [])]
    if (!files.length) {
      setStatus(status, "Selecteer eerst een PDF, afbeelding of ZIP-bestand.")
      return
    }

    const zipFiles = files.filter(isZip)
    const otherFiles = files.filter(f => !isZip(f))

    if (zipFiles.length) {
      setStatus(
        status,
        `ZIP (${formatSize(zipFiles[0].size)}) kan hier niet direct verwerkt worden. ` +
        `Plaats het bestand in projects/herenstraat-64/source/ en draai: npm run extract:herenstraat`
      )
      return
    }

    btn.disabled = true
    setStatus(status, "Bezig met analyseren…")

    try {
      for (const file of otherFiles) {
        const result = await analyze(file)
        EventBus.emit("drawing:analyzed", { file: file.name, result })
      }
      setStatus(status, `${otherFiles.length} tekening(en) geanalyseerd.`)
    } catch (err) {
      console.error(err)
      setStatus(status, "Analyse mislukt. Probeer een kleinere PDF of afbeelding.")
    } finally {
      btn.disabled = false
    }
  })
}

function isZip(file) {
  return (
    file.name.toLowerCase().endsWith(".zip") ||
    file.type === "application/zip" ||
    file.type === "application/x-zip-compressed"
  )
}

function setStatus(el, message) {
  if (el) el.textContent = message
}

function formatSize(bytes) {
  if (bytes < 1024 * 1024) return `${Math.round(bytes / 1024)} KB`
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`
}
