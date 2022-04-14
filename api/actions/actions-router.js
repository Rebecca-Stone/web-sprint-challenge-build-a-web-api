// Write your "actions" router here!
const express = require("express");
const Actions = require("./actions-model");

const {
  validateActionId,
  validateAction,
} = require("./actions-middlware");

const router = express.Router();

// - [ ] `[GET] /api/actions`
//   - Returns an array of actions (or an empty array) as the body of the response.
router.get("/", (req, res) => {
  Actions.get()
    .then((actions) => {
      res.status(200).json(actions);
    })
    .catch((error) => {
      console.log(error);
    });
});

// - [ ] `[GET] /api/actions/:id`
//   - Returns an action with the given `id` as the body of the response.
//   - If there is no action with the given `id` it responds with a status code 404.
router.get("/:id", validateActionId, (req, res) => {
  res.json(req.existingAction);
});

// - [ ] `[POST] /api/actions`
//   - Returns the newly created action as the body of the response.
//   - If the request body is missing any of the required fields it responds with a status code 400.
//   - When adding an action make sure the `project_id` provided belongs to an existing `project`.
router.post("/", validateAction, (req, res) => {
  //   Projects.getProjectActions(req.params.project_id);

  Actions.insert(req.action)
    .then((action) => {
      res.status(201).json(action);
    })
    .catch((error) => {
      console.log(error);
    });
});

// - [ ] `[PUT] /api/actions/:id`
//   - Returns the updated action as the body of the response.
//   - If there is no action with the given `id` it responds with a status code 404.
//   - If the request body is missing any of the required fields it responds with a status code 400.
router.put("/:id", validateAction, validateActionId, (req, res) => {
  Actions.update(req.params.id, req.action)
    .then(() => {
      res.status(200).json(req.action);
    })
    .catch((error) => {
      console.log(error);
    });
});

// - [ ] `[DELETE] /api/actions/:id`
//   - Returns no response body.
//   - If there is no action with the given `id` it responds with a status code 404.
router.delete("/:id", validateActionId, (req, res) => {
  Actions.remove(req.existingAction.id)
    .then(() => {
      res.status(200).json(req.existingAction);
    })
    .catch((error) => {
      console.log(error);
    });
});

module.exports = router;
