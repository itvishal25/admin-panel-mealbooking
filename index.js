const express = require("express");
const app = express();
const mongoose = require("mongoose");
const userRouter = require("./routes/user");
const bodyParser = require("body-parser");

app.use(bodyParser.json());
app.use(express.json());
app.use("/user", userRouter);
// app.use("/")
app.get("/", (req, res) => {
  // 200
  return res.status(200).send({ message: "Get Request", data: "user get successfully" });
});

mongoose.connect("mongodb://127.0.0.1:27017/admin_panel", { useNewUrlParser: true })
  .then(() => {
    console.log("conneted with database succesfully");
  })
  .catch(() => {
    console.log("connection failed");
  })

app.listen(3030, () => {
  console.log("server is listening on 3030");
});

// CRUD

// CREATE -> post
// READ -> get
// UPDATE -> patch, put
// DELETE -> delete
