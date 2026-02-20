export async function analyze(file){
  const fd = new FormData()
  fd.append("file", file)

  return fetch(
    "https://calqtool-worker-production.mdvlijter.workers.dev/vision",
    {
      method:"POST",
      body: fd
    }
  ).then(r=>r.json())
}
