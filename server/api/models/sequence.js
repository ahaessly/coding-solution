// Import the Google Cloud client library
const {BigQuery} = require('@google-cloud/bigquery')

var projectId='ahdsoftware'
var datasetId='asimov'
var tableId='sequences'
var token=''

// Create a client
var bigqueryClient

selectFrom = function() {
  console.log('getting select')
  return `SELECT * FROM \`${datasetId}.${tableId}\``
}

legacySelectFrom = function() {
  console.log(`getting legacy select using project ${projectId}`)
  return `SELECT * FROM [${projectId}:${datasetId}.${tableId}]`
}


// const limit = function(num) { ` limit ${num}`}
const idQuery = selectFrom() + ` WHERE id = `

exports.setDBInfo = function(project, dataset, table, token) {
  console.log("setting db info")
  projectId = project
  datasetId = dataset
  tableId = table
  this.token = token
  bigqueryClient=new BigQuery({token: token})
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
      projectId: projectId
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