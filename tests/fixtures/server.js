// Minimal HTTP server used by the start/wait-on test.
// Exits on its own so a lingering child process cannot hang the step.
const http = require('http')
const fs = require('fs')
const path = require('path')

const port = parseInt(process.argv[2] || '8765', 10)
const marker = process.argv[3]

const server = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain' })
  res.end('ok')
})

server.listen(port, () => {
  console.log(`fixture server listening on ${port}`)
  if (marker) {
    fs.writeFileSync(path.resolve(marker), 'started\n')
  }
})

setTimeout(() => {
  server.close()
  process.exit(0)
}, 30000).unref()
setTimeout(() => process.exit(0), 30000)
