const path = require("path");
const express = require("express");
const OS = require("os");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const app = express();
const cors = require("cors");

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "/")));
app.use(cors());

mongoose.connect(
  // process.env.MONGO_URI,
  //  'mongodb://my_mongo_user:my_mongo_password@mongodb:27017',
  "mongodb+srv://my_mongo_user:my_mongo_password@cluster0.v7ozr.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0",
  {
    // user: process.env.MONGO_USERNAME,
    user: "my_mongo_user",
    pass: "my_mongo_password",
  }
);

var Schema = mongoose.Schema;

var dataSchema = new Schema({
  name: String,
  id: Number,
  description: String,
  image: String,
  velocity: String,
  distance: String,
});
var planetModel = mongoose.model("planets", dataSchema);

app.post("/planet", function (req, res) {
  // console.log("Received Planet ID " + req.body.id)
  planetModel.findOne({
    id: req.body.id,
  });
});

app.get("/", async (req, res) => {
  res.sendFile(path.join(__dirname, "/", "index.html"));
});

app.get("/os", function (req, res) {
  res.setHeader("Content-Type", "application/json");
  res.send({
    os: OS.hostname(),
    env: process.env.NODE_ENV,
  });
});

app.get("/live", function (req, res) {
  res.setHeader("Content-Type", "application/json");
  res.send({
    status: "live",
  });
});

app.get("/ready", function (req, res) {
  res.setHeader("Content-Type", "application/json");
  res.send({
    status: "ready",
  });
});

app.listen(3000, () => {
  console.log("Server successfully running on port - " + 3000);
});

module.exports = app;
