// Styles
import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'

// Vuetify
import { createVuetify } from 'vuetify'

import { type UserModule } from '~/types'

// https://vuetifyjs.com/en/introduction/why-vuetify/#feature-guides
const vuetify = createVuetify({
  // https://next.vuetifyjs.com/en/features/theme/
  theme: {
    defaultTheme: 'light',
  },
})

/**
 * plugins/webfontloader.js
 *
 * webfontloader documentation: https://github.com/typekit/webfontloader
 */

async function loadFonts() {
  const webFontLoader = await import(
    /* webpackChunkName: "webfontloader" */ 'webfontloader'
  )

  webFontLoader.load({
    google: {
      families: ['Roboto:100,300,400,500,700,900&display=swap'],
    },
  })
}

export const install: UserModule = ({ isClient, app }) => {
  if (!isClient) return

  loadFonts()
  app.use(vuetify)
}
