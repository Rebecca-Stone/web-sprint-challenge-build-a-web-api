// add middlewares here related to actions
const Actions = require('../actions/actions-model');

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

module.exports = {
    logger,
}