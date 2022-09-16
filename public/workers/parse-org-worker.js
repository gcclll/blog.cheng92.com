importScripts('/libs/org-file-parser-with-js.umd.development.js')

var parser = self['org-file-parser-with-js']

const contentList = []
const errors = []

self.addEventListener('message', function (event) {
  const filenames = JSON.parse(event.data)

  if (Array.isArray(filenames)) {
    const names = filenames.map((f) => f.name)
    getNextPoster(
      names,
      0,
      (name, index, content) => {
        contentList.push({ index, name, content })
      },
      () => {
        for (let i = 0; i < contentList.length; i++) {
          const { content, index, name } = contentList[i] || {}
          if (content) {
            const ast = parser.baseParse(content)
            const value = ast.properties?.find((p) => p.name === 'ID')?.value
            const result = { filename: name, index, id: value, ast }
            postMessage(result)
          }
        }
      },
    )
  }
})

function tryCatch(fn) {
  let result
  try {
    result = fn()
  } catch (e) {
    errors.push(e.message)
  }
  console.log(result, 333)
  return result
}

function getNextPoster(names, index, done, end) {
  getPoster(`/posts/${names[index]}.org`, (content) => {
    done(names[index], index, content)
    if (index < names.length - 1) {
      getNextPoster(names, index + 1, done, end)
    } else {
      end()
    }
  })
}

function getPoster(path, doneCallback) {
  return fetch(path)
    .then((response) => response.body)
    .then((rb) => {
      const reader = rb.getReader()

      return new ReadableStream({
        start(controller) {
          function push() {
            reader.read().then(({ done, value }) => {
              if (done) {
                controller.close()
                return
              }

              controller.enqueue(value)
              push()
            })
          }

          push()
        },
      })
    })
    .then((stream) =>
      new Response(stream, { headers: { 'Content-Type': 'text/html' } }).text(),
    )
    .then((result) => {
      doneCallback(result)
    })
}
