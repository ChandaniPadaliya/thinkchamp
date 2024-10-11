const express = require("express");

// start express server
const app = express();
require("dotenv").config();
const cors = require("cors");

app.use(cors({ origin: true }));
app.use((req, res, next) => {
  res.setHeader("Acces-Control-Allow-Origin", "*");
  res.setHeader("Acces-Control-Allow-Methods", "GET,POST,PUT,PATCH,DELETE");
  res.setHeader("Acces-Contorl-Allow-Methods", "Content-Type", "Authorization");
  next();
});


const http = require("http").createServer(app);
// colling startup files
require("./src/startup/dbConfig")();
require("./src/startup/routes")(app);

// redis
// const redis = require('redis')

// const redisClient   = redis.createClient()
//   .on('error', err => console.log('Redis Client Error', err))
//   .connect();
// Setup server port
const port = process.env.PORT || 10000;

// listen for requests
http.listen(port, () => console.log(`INFO: ON PORT TO ${port}`));
