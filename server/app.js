const path=require('path')
const express = require("express");
const history = require("connect-history-api-fallback");
const router = require("./router");

const app = express();
const bodyParser = require("body-parser");

app.use(bodyParser());
app.use("/api", router);
app.use(
  history({
    index: "/index.html",
  })
);
app.use(express.static(path.join(__dirname, "dist")));

app.listen(3000, () => {
  console.log("Server is listening on http://localhost:3000");
});
