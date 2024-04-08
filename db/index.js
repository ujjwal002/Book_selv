const express = require("express");
const app = express();

const groupRoutes = require("./routes/groupRoutes");
const chapterRoutes = require("./routes/chapterRoutes");
app.use(express.json());
require("./config/db").connect();

const user = require("./routes/userRoutes");
const group = require("./routes/groupRoutes");
const chapter = require("./routes/chapterRoutes");
const content = r;

app.use("/api/v1", user);

app.listen(3000, () => {
  console.log("====================================");
  console.log("server started");
  console.log("====================================");
});
