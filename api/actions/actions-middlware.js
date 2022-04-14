// add middlewares here related to actions
const Actions = require("../actions/actions-model");

// - [ ] Write at least two middleware functions for this API, and consume them in the proper places of your code.

// function logger(req, res, next) {
//   req.timestamp = new Date();
//   console.log(`
//   METHOD: ${req.method},
//   URL: ${req.baseUrl},
//   TS: ${req.timestamp}
//   `);
//   next();
// }

function validateActionId(req, res, next) {
  Actions.get(req.params.id)
    .then((action) => {
      if (action) {
        req.existingAction = action;
        next();
      } else {
        res.status(404).json({ message: "action not found" });
      }
    })
    .catch((error) => {
      console.log(error);
    });
}

function validateAction(req, res, next) {
  let { id, project_id, description, notes, completed } = req.body;
  if (
    typeof description != "string" ||
    description.trim() == "" ||
    typeof notes != "string" ||
    notes.trim() == "" ||
    typeof completed != "boolean"
  ) {
    res.status(400).json({ message: "some fields are missing" });
    return;
  }
  req.action = { id: id, project_id: project_id, description: description, notes: notes, completed: completed };
  next();
}

module.exports = {
  // logger,
  validateActionId,
  validateAction,
};
