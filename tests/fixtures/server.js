// Tiny HTTP server used by the start/wait-on test. Self-terminates so it
// never keeps the step alive after the action exits.
const http = require('http')
const server = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain' })
  res.end('cypress-fixture-ok')
})
server.listen(8765, () => console.log('fixture server listening on 8765'))
setTimeout(() => process.exit(0), 30000).unref()
