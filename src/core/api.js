import { apiUrl } from "./config.js"

export async function api(endpoint, options = {}) {
  try {
    const res = await fetch(apiUrl(endpoint), options)

    if (!res.ok) {
      throw new Error("API error")
    }

    return await res.json()
  } catch (err) {
    console.error(err)
    return null
  }
}
