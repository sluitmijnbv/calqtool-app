import { getApiBase } from "./config.js"

/**
 * Laadt CalqCore library lokaal uit data/library/ (alleen dev).
 * Echte bestanden staan in .gitignore — nooit committen naar public repo.
 */
export async function loadLocalLibrary() {
  const files = [
  "/data/library/calqcore_library_2026_v3.json",
  "/data/context/calqcore_context_2026_v3.json"
  ]

  try {
    const [libraryRes, contextRes] = await Promise.all(
      files.map(f => fetch(f).then(r => (r.ok ? r.json() : null)))
    )

    if (!libraryRes?.elements) return null

    const priceLibrary = {}
    const elements = libraryRes.elements

    if (Array.isArray(elements)) {
      for (const el of elements) {
        priceLibrary[el.code] = el
      }
    } else {
      Object.assign(priceLibrary, elements)
    }

    return {
      priceLibrary,
      context: contextRes,
      libraryVersion: libraryRes.meta?.version || "2026_v3"
    }
  } catch {
    return null
  }
}

export async function initLibrary(state) {
  const local = await loadLocalLibrary()
  if (!local) {
    console.info(
      "Geen lokale CalqCore library gevonden. " +
      "Plaats bestanden in data/library/ (zie data/LEESMIJ.txt)."
    )
    return false
  }

  state.priceLibrary = local.priceLibrary
  state.libraryVersion = local.libraryVersion
  if (local.context?.defaults_by_projectCategory) {
    state.contextDefaults = local.context.defaults_by_projectCategory
  }
  return true
}
