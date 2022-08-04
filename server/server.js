const express = require("express");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.urlencoded({ extended: true }));

app.use(express.static("server/public"));

let todoRouter = require("./routes/weekend-to-do-list.router");
app.use("/todo", todoRouter);

app.listen(PORT, function () {
  // app.use(PORT, () => {
  console.log("listening on port", PORT);
});
