// Write your "projects" router here!
const express = require("express");
const Projects = require("./projects-model");

const {
  logger,
  validateProjectId,
  validateProject,
} = require("./projects-middleware");

const router = express.Router();

// - [ ] `[GET] /api/projects`
//   - Returns an array of projects as the body of the response.
//   - If there are no projects it responds with an empty array.
router.get("/", logger, (req, res) => {
  Projects.get()
    .then((posts) => {
      res.status(200).json(posts);
    })
    .catch((error) => {
      console.log(error);
    });
});

// - [ ] `[GET] /api/projects/:id`
//   - Returns a project with the given `id` as the body of the response.
//   - If there is no project with the given `id` it responds with a status code 404.
router.get("/:id", validateProjectId, (req, res) => {
  res.json(req.existingProject);
});

// - [ ] `[POST] /api/projects`
//   - Returns the newly created project as the body of the response.
//   - If the request body is missing any of the required fields it responds with a status code 400.
router.post("/", validateProject, (req, res) => {
  Projects.insert(req.project)
    .then((project) => {
      res.status(201).json(project);
    })
    .catch((error) => {
      console.log(error);
    });
});

// - [ ] `[PUT] /api/projects/:id`
//   - Returns the updated project as the body of the response.
//   - If there is no project with the given `id` it responds with a status code 404.
//   - If the request body is missing any of the required fields it responds with a status code 400.
router.put("/:id", validateProject, validateProjectId, (req, res) => {
  Projects.update(req.params.id, req.project)
    .then(() => {
      res.status(200).json(req.project);
    })
    .catch((error) => {
      console.log(error);
    });
});

// - [ ] `[DELETE] /api/projects/:id`
//   - Returns no response body.
//   - If there is no project with the given `id` it responds with a status code 404.

// - [ ] `[GET] /api/projects/:id/actions`
//   - Returns an array of actions (could be empty) belonging to a project with the given `id`.
//   - If there is no project with the given `id` it responds with a status code 404.

module.exports = router;
