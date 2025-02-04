// Write your server logic here
const http = require("http");
const fs = require("fs");

const server = http.createServer((req, res) => {

    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.url == "/question") {
    fs.readFile("questions.json", (err, data) => {
      if (err) {
        res.end("Internal Server Error");
      } else {
        res.end(data);
      }
    });
  } else {
    res.end("invaild request");
  }
});
const PORT = 3000;
server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}/`);
});
