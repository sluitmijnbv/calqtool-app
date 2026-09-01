import workers from "../../config/workers.json"

/** API-base URL: .env > data-api attribuut > config/workers.json */
export function getApiBase() {
  const fromEnv = import.meta.env.VITE_API_BASE
  if (fromEnv) return normalizeBase(fromEnv)

  const app = document.getElementById("ct-app")
  const fromDom = app?.dataset?.api
  if (fromDom) return normalizeBase(fromDom)

  return normalizeBase(workers.workers.production.apiBase)
}

function normalizeBase(url) {
  return url.endsWith("/") ? url : `${url}/`
}

export function apiUrl(path = "") {
  const base = getApiBase()
  return `${base}${path.replace(/^\//, "")}`
}

export { workers }
