const BASE = import.meta.env.VITE_API_BASE

export async function api(endpoint, options = {}) {
  try {
    const res = await fetch(`${BASE}${endpoint}`, options)

    if (!res.ok) {
      throw new Error("API error")
    }

    return await res.json()
  } catch (err) {
    console.error(err)
    return null
  }
}
