const express = require("express");
const app = express();
const PORT = 5000;
const authRoute = require("./routes/auth");
require("dotenv").config();
const mongoose = require("mongoose");

mongoose
  .connect(process.env.MONGOURL)
  .then(() => {
    console.log("DB接続完了");
  })
  .catch((err) => {
    console.log(err);
  });

app.use(express.json());
app.use("/api/auth", authRoute);

app.get("/", (req, res) => {
  res.send("hello world");
});

app.listen(PORT, () => console.log("サーバ起動"));
