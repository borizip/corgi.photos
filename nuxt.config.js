

const STAGE = process.env.STAGE || 'dev'

module.exports = {
  mode: 'universal',
  head: {
    title: 'Corgi Photos - Lorem Ipsum Gallery',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'Corgi Photos - Lorem Ipsum Gallery' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },
  loading: { color: '#fff' },
  css: [
    '~/assets/scss/home.scss',
  ],
  plugins: [
  ],
  buildModules: [
  ],
  modules: [
    '@nuxtjs/google-gtag',
  ],
  build: {
    extend (config, ctx) {
    }
  },
  'google-gtag': {
    id: 'UA-151383765-1',
    debug: STAGE !== 'prod',
  },
}
