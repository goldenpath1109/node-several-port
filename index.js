// const express = require("express");
// const port = 5001;
// console.log("port: ", port);

// // const app = express();

// // app.listen(port, () => {
// //   console.log(`Server started on port ${port}`);
// // });

// const http = require('http');

// const host = 'localhost';

// const requestListener = function (req, res) {};

// const server = http.createServer(requestListener);
// server.listen(port, host, () => {
//   console.log(`Server is running on http://${host}:${port}`);
// });
const http = require("http");
const { spawn } = require("child_process");

const port = 4000;

const requestListener = function (req, res) {
  if (req.url === "/total") {
    const child = fork(__dirname + "/getCount");

    child.on("message", (message) => {
      console.log("Returning /total results");
      res.setHeader("Content-Type", "application/json");
      res.writeHead(200);
      res.end(message);
    });

    child.send("START");
  } else if (req.url === "/hello") {
    console.log("Returning /hello results");
    res.setHeader("Content-Type", "application/json");
    res.writeHead(200);
    res.end(`{"message":"hello"}`);
  }
};

const server = http.createServer(requestListener);
server.listen(port, () => {
  console.log(`Server is running on http://:${port}`);
});
