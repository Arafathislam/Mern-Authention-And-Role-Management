const express = require("express");
const dotenv = require("dotenv");
const app = express();
const cors = require("cors");
const cookieParser = require("cookie-parser");
const connect= require("./database/config/connectionDB.js");
const router = require("./routerManager.js");
const useragent = require('express-useragent');
dotenv.config();
const PORT = process.env.PORT || 8002;

//middlewares
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(useragent.express());

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'https://hasan-imzi.tech, https://devtestbd.tech');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  // Handle preflight requests
  if (req.method === 'OPTIONS') {
    return res.sendStatus(200);
  }

  next();
});


// app.use(cors());




app.use(
  cors({
    origin: [
      "http://hasan-imzi.tech",
      "https://hasan-imzi.tech",
      "https://devtestbd.tech",
      "http://devtestbd.tech",
    ],
    credentials: true,
  })
);



app.get("/", (req, res) => {
  return res.status(200).send("Super Store Management by Arafath");
});

async function main() {
  try {
    this.app = app;
  } catch (err) {
    console.log(err);
  }
}
main();

//Connection
app.listen(PORT, (req, res) => {
  console.log(`Listening on ${PORT}`);
  connect();
  router();
});