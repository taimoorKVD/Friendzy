export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    titleTemplate: 'Kingdom Vision %s',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'stylesheet', href: 'https://cdn.jsdelivr.net/npm/bootstrap-icons@1.5.0/font/bootstrap-icons.css' },
    ]
  },

  // nuxt built in loader
  loading: false,

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    '~plugins/filter.js'
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/bootstrap
    'bootstrap-vue/nuxt',
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    '@nuxtjs/auth-next'
  ],

  // router: {
  //   middleware: ['guest'],
  // },

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    baseURL: 'http://localhost:8000/',
    credentials: true
  },

  auth: {
    strategies: {
      'laravelSanctum': {
        provider: 'laravel/sanctum',
        url: 'http://localhost:8000',
        endpoints: {
            login: {
                url: '/login'
            },
            logout: {
                url: '/logout'
            },
            user: {
                url: '/api/user'
            },
        },
        user: {
          property: false
        }
      },
    },
    redirect: {
      login: '/auth/login',
      logout: '/',
      home: '/users'
    }
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
  }
}
