
var sequence = require('../models/sequence')

exports.getSequence = function(req, res) {
    console.log(`Got a GET request for a sequence ${req.params.id}`);
    sequence.getById(req.params.id)
        .then(([rows]) => res.json(rows))
        .catch((error) => res.send(error))
}

// exports.listSequences = function(req, res) {
//      console.log("doing it")
//      res.json({ message: "thank god"})
// }

exports.findMatches = function(req, res) {
    console.log(`Return sequences that contain this subsequence ${req.params.bases}`)
    sequence.findSequencesContainingBases(req.params.bases)
        .then(([rows]) => res.json(rows))
        .catch((error) => res.send(error))
}

 
 
