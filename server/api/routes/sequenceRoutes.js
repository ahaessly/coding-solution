
module.exports = function(app) {
  var controller = require('../controllers/sequenceController')

  //  app.route('/sequence')
  //   .get(controller.listSequences)

  app.route('/sequence/:id')
    .get(controller.getSequence)

  app.route('/sequence/match/:bases')
    .get(controller.findMatches)
};

