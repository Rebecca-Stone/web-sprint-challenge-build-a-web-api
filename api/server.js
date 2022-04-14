const express = require("express");
const helmet = require("helmet");
const morgan = require("morgan");
const cors = require("cors");
const actionRouter = require("./actions/actions-router");
const projectRouter = require("./projects/projects-router");

const server = express();

server.use(express.json());
server.use(helmet());
server.use(morgan("dev"));
server.use(cors());

server.use("/api/actions", actionRouter);
server.use("/api/projects", projectRouter);

server.get("/", (req, res) => {
  res.send(`<h1>sanity check</h1>`);
});

server.use((err, req, res, next) => {
  res.status(err.status || 500).json({
    message: err.message,
    stack: err.error.stack,
  });
});

module.exports = server;
