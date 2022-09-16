import axios from 'axios'

function createWorker(path: string): Worker | undefined {
  let worker: Worker | undefined
  if (window.Worker) {
    worker = new window.Worker(path)
  }

  return worker
}

export function createOrgParsingWorker() {
  axios.get(`/posts/all.json`).then((res) => {
    const worker = createWorker(`/workers/parse-org-worker.js`)
    if (worker) {
      worker.onmessage = function (event) {
        const data = event.data
        console.log(data, 'message')
      }
      worker.postMessage(JSON.stringify(res.data))
    }
  })
  // const worker: Worker | undefined = createWorker(`/workers/parse-org-workerf.js`)
}
