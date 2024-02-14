const http = require("http");
const { spawn } = require("child_process");

const port = 8000;
let childProcess;

const startChildProcess = () => {
  if (!childProcess) {
    childProcess = spawn("node", ["getCount.js"], { stdio: [0, 1, 2, "ipc"] });
    console.log("Child process started");

    childProcess.on("message", (message) => {
      console.log("Returning /total results");
      res.setHeader("Content-Type", "application/json");
      res.writeHead(200);
      res.end(message);
    });
  } else {
    console.log("Child process is already running");
  }
};

const stopChildProcess = () => {
  if (childProcess) {
    childProcess.kill();
    childProcess = null;
    console.log("Child process stopped");
  } else {
    console.log("Child process is not running");
  }
};

const requestListener = function (req, res) {
  if (req.url === "/total") {
    startChildProcess();
    childProcess.send("START");
  } else if (req.url === "/hello") {
    console.log("Returning /hello results");
    res.setHeader("Content-Type", "application/json");
    res.writeHead(200);
    res.end(`{"message":"hello"}`);
  } else if (req.url === "/stop") {
    stopChildProcess();
    res.setHeader("Content-Type", "application/json");
    res.writeHead(200);
    res.end(`{"message":"Child process stopped"}`);
  }
};

const server = http.createServer(requestListener);
server.listen(port, () => {
  console.log(`Server is running on http://:${port}`);
});