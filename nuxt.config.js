

module.exports = {
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
    '~/assets/css/home.css',
  ],
  plugins: [
  ],
  buildModules: [
    '@nuxtjs/tailwindcss',
  ],
  modules: [
    '@nuxtjs/google-gtag',
  ],
  build: {
    publicPath: process.env.SERVERLESS_NUXT_PUBLIC_PATH,
  },
  'google-gtag': {
    id: 'UA-151383765-1',
    debug: process.env.NODE_ENV !== 'production',
  },
}
