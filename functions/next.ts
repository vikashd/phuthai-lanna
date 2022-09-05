import { https } from 'firebase-functions'
import next from 'next'
import { join } from 'path'
import { parse } from 'url'

const dev = process.env.NODE_ENV !== 'production'
const nextjsDistDir = join('src', require('../src/next.config.js').distDir)

// TODO: set dev to false to serve locally
const app = next({
  dev,
  conf: {
    distDir: nextjsDistDir,
  },
})
const handle = app.getRequestHandler()

const nextjsFunc = https.onRequest((req, res) =>
  app.prepare().then(() => {
    const parsedUrl = parse(req.url, true)
    const { pathname, query } = parsedUrl

    if (pathname === '/contact') {
      app.render(req, res, '/', query)
      return
    }

    handle(req, res, parsedUrl)
  })
)

export default nextjsFunc
