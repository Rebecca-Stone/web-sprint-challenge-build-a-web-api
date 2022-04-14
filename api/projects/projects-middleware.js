// add middleware here related to projects
const Projects = require("../projects/projects-model");

// - [ ] Write at least two middleware functions for this API, and consume them in the proper places of your code.

function logger(req, res, next) {
  req.timestamp = new Date();
  console.log(`
  METHOD: ${req.method}, 
  URL: ${req.baseUrl}, 
  TS: ${req.timestamp}
  `);
  next();
}

function validateProjectId(req, res, next) {
  Projects.get(req.params.id).then((project) => {
    if (project) {
      req.existingProject = project;
      next();
    } else {
      res.status(404).json({ message: "project not found" });
    }
  });
}

module.exports = {
  logger,
  validateProjectId,
};
