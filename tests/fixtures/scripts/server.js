// Minimal HTTP server used with the action's start / wait-on inputs.
// Exits on its own after 60 seconds so it never outlives the job.
const http = require('http')
const port = parseInt(process.argv[2] || '8787', 10)
const server = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain' })
  res.end('ok')
})
server.listen(port, '127.0.0.1', () => {
  console.log(`test server listening on ${port}`)
})
setTimeout(() => process.exit(0), 60000).unref()
