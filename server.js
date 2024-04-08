const express = require("express");
const app = express();
const PORT = 5000;
const authRoute = require("./routes/auth");
const userRoute = require("./routes/users");
const recordRoute = require("./routes/records");
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
app.use("/api/users", userRoute);
app.use("/api/records", recordRoute);

app.get("/", (req, res) => {
  res.send("hello world");
});

app.listen(PORT, () => console.log("サーバ起動"));
