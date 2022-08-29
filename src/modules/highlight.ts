// import 'highlight.js/styles/stackoverflow-light.css'
// import 'highlight.js/styles/github.css'
import hljs from 'highlight.js/lib/core'
import javascript from 'highlight.js/lib/languages/javascript'
import hljsVuePlugin from '@highlightjs/vue-plugin'

import { type UserModule } from '~/types'

hljs.registerLanguage('javascript', javascript)

export const install: UserModule = ({ app }) => {
  app.use(hljsVuePlugin)
}
