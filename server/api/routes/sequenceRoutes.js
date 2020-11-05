
module.exports = function(app) {
  var controller = require('../controllers/sequenceController')

  app.route('/dbinfo/:project/:dataset/:table')
    .post(controller.setDBInfo)

  app.route('/dbinfo')
    .get(controller.getDBInfo)

  app.route('/sequence/:id')
    .get(controller.getSequence)

  app.route('/sequence/match/:bases')
    .get(controller.findMatches)
};

