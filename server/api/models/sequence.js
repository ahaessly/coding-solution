// Import the Google Cloud client library
const {BigQuery} = require('@google-cloud/bigquery')

var projectId = 'broad-dsp-spec-ops'
var datasetId = 'andrea_test'
var tableId = 'sequences'

// Create a client
const bigqueryClient = new BigQuery()

selectFrom = function() {
  return `SELECT * FROM \`${datasetId}.${tableId}\``
}

legacySelectFrom = function() {
  return `SELECT * FROM [${projectId}:${datasetId}.${tableId}]`
}

// const limit = function(num) { ` limit ${num}`}
const idQuery = selectFrom() + ` WHERE id = `

exports.setDBInfo = function(project, dataset, table) {
  console.log("setting db info")
  projectId = project
  datasetId = dataset
  tableId = table
}

exports.getDBInfo = function() {
  console.log("getting dbinfo")
  return {
    project: projectId,
    dataset: datasetId,
    table: tableId
  }
}

exports.getById = function(id) {
  
  query = `${idQuery} "${id}"`
  console.log(`query: ${query}`)
  const options = {
      query: query,
      location: 'US',
    };
  
  return bigqueryClient.createQueryJob(options)
  .then(([job]) => 
      job.getQueryResults())
}

exports.findSequencesContainingBases = function(bases) {
  const query = legacySelectFrom() + ` WHERE bases contains "${bases}"`

  console.log(`query: ${query}`)
  const options = {
      query: query,
      location: 'US',
      useLegacySql: true,
    };
  
  return bigqueryClient.createQueryJob(options)
  .then(([job]) =>
      job.getQueryResults())
  .catch((error) => console.error(error))

}