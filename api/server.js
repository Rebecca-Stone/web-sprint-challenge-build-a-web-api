const express = require("express");
// third party middleware
const helmet = require("helmet");
const morgan = require("morgan");
const cors = require("cors");

// these are for the router 
const actionRouter = require('./actions/actions-router');
const projectRouter = require('./projects/projects-router');

const server = express();

server.use(express.json());
server.use(helmet());
server.use(morgan("dev"));
server.use(cors());

// put the api route here
server.use("/api/actions", actionRouter);
server.use("/api/projects", projectRouter);

server.get("/", (req, res) => {
  res.send(`<h1>sanity check</h1>`);
});



// Configure your server here
// Build your actions router in /api/actions/actions-router.js
// Build your projects router in /api/projects/projects-router.js
// Do NOT `server.listen()` inside this file!

module.exports = server;
