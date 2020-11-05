
var sequence = require('../models/sequence')

exports.getDBInfo = function(req, res) {
    console.log(`Got a GET request for dbinfo`);
    res.json(sequence.getDBInfo(req.params.project, req.params.dataset, req.params.table))
}

exports.setDBInfo = function(req, res) {
    console.log(`Got a POST request for dbinfo`);
    sequence.setDBInfo(req.params.project, req.params.dataset, req.params.table)
    res.end()
}

exports.getSequence = function(req, res) {
    console.log(`Got a GET request for a sequence ${req.params.id}`);
    sequence.getById(req.params.id)
        .then(([rows]) => res.json(rows))
        .catch((error) => res.send(error))
}

exports.findMatches = function(req, res) {
    console.log(`Return sequences that contain this subsequence ${req.params.bases}`)
    sequence.findSequencesContainingBases(req.params.bases)
        .then(([rows]) => res.json(rows))
        .catch((error) => res.send(error))
}

 
 
