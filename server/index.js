const express = require("express");
const http = require("http");
const path = require("path");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const User = require("./routes/user")

require("dotenv").config();
const cors = require("cors");


//connect to mongoDB
mongoose.set("useCreateIndex", true);
mongoose.connect("mongodb://" + process.env.DB_HOST + ":" + process.env.DB_PORT + "/" + process.env.DB_NAME, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.connection.on("connected", () => {
  console.log("connected to mongo database");
});

mongoose.connection.on("error", (err) => {
  console.log("Error at mongoDB: " + err);
});

const port = process.env.PORT || 3000;
const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/user',User)

let server = http.createServer(app);

app.use(function (err, req, res, next) {
  res.status(404).json(err.message);
});

server.listen(port, () => {
  console.log(`Server is starting at ${port}`);
});
