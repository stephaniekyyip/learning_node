// hellonode.js - Uses pure Node + ES6 (no Express)

// Load HTTP module
const http = require("http");
const hostname = '127.0.0.1';
const port = 3000;

// Create HTTP server and listen on port 3000 for requests
const server = http.createServer((req, res) => {

  // Set the response HTTP header w/ HTTP status and content type
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end('Hello world\n');
});

// Listen for request on port 3000 and have a callback function to have the port listened on logged
server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
