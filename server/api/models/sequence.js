// Import the Google Cloud client library
const {BigQuery} = require('@google-cloud/bigquery')

const projectId = 'broad-dsp-spec-ops'
const datasetId = 'andrea_test'
const tableId = 'sequences'

// Create a client
const bigqueryClient = new BigQuery()

const selectFrom = `SELECT * FROM \`${datasetId}.${tableId}\``
const legacySelectFrom = `SELECT * FROM [${projectId}:${datasetId}.${tableId}]`
// const limit = function(num) { ` limit ${num}`}
const idQuery = `${selectFrom} WHERE id = `


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
  const query = `${legacySelectFrom} WHERE bases contains "${bases}"`

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