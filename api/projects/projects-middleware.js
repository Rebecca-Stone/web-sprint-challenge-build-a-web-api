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
  Projects.get(req.params.id)
    .then((project) => {
      if (project) {
        req.existingProject = project;
        next();
      } else {
        res.status(404).json({ message: "project not found" });
      }
    })
    .catch((error) => {
      console.log(error);
    });
}

function validateProject(req, res, next) {
  //   let { name, description } = req.body;
  if (
    typeof req.body.name != "string" ||
    req.body.name.trim() == "" ||
    typeof req.body.description != "string" ||
    req.body.description.trim() == ""
  ) {
    res.status(400).json({ message: "missing some fields" });
    return;
  }
  req.project = { name: req.body.name, description: req.body.description, completed: true };
//   console.log(req.project);
  next();
}

module.exports = {
  logger,
  validateProjectId,
  validateProject,
};
