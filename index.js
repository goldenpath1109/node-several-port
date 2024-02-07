const express = require("express");
const port = 5001;
console.log("port: ", port);

const app = express();

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
