import { apiUrl } from "../core/config.js"

export async function analyze(file) {
  const fd = new FormData()
  fd.append("file", file)

  const res = await fetch(apiUrl("vision"), {
    method: "POST",
    body: fd
  })

  return res.json()
}
