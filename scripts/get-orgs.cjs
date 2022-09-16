const fs = require('fs')
const path = require('path')

fs.readdir(
  path.resolve(__dirname, '../public/posts/'),
  {
    withFileTypes: true,
  },
  (err, files) => {
    if (err) {
      console.log(err)
      return
    }

    const names = files
      .map((file) => {
        if (/\.org$/.test(file.name)) {
          return file.name.replace(/\.org$/, '')
        }

        return ''
      })
      .filter(Boolean)

    fs.writeFile(
      path.resolve(__dirname, '../public/posts/all.json'),
      JSON.stringify(names.map((name) => ({ name })), null, 2),
      (err) => err && console.log(err)
    )
  },
)
