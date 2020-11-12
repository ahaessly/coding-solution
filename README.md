# coding-solution

##Requirements
Install the Google Cloud SDK on your system.

	https://cloud.google.com/sdk/docs/install

### Configure access to BigQuery

In the google cloud console, under `IAM & Admin` -> `IAM`, grant your user the "BigQuery User" role.

### Create a service account and key

In the google cloud console, under `IAM & Admin' -> 'Service Accounts`, create a service account. Then select that service account and choose `Add Key`. This will download a json file with your private key information. Make a copy of this file in the `server` subdirectory and  name it `credentials.json` 

## Ingest sequences

I am using Google BigQuery to store the sequences. In the `bq` subdirectory is a schema file `sequence_schema.json` that defines the BQ schema and a script that will load the data `loaddata.sh`.
The script assumes that all the individual sequence json files are in a local directory. This has scalability limitations. For a scalable solution, the files should be loaded from google cloud storage. 

- put the json sequence files on your local system and use this location as the `<path-to-files>` parameter below
- log into gcloud and follow the instructions to authenticate
`gcloud auth login`
- set your project
- from the `bq` directory, run the loaddata shell script. You can you any text names (with `_` as the only special character allowed) for the dataset, table parameters. The script will create them if they do not exist. Specify a filename as <tmpfile> which will be used to correctly format the data for upload. This load command is not idempotent. It will load the data as many times as it is called with the same dataset and table parameters. 

	`./loadddata.sh <google-project> <dataset> <table> <path-to-files> <tmpfile>`

## Run the client and server
<!--You need to have the google client cli installed before building the running the docker images. Run

`gcloud auth application-default login`
-->
From the main directory run:

`docker-compose build`

`docker-compose up`

At any time to stop the client and server, you can run:

`docker-compose stop`

or you can kill the docker and then run:

`docker-compose down`

## Use the Sequence-Finder UI

On the system running the docker image, go to:
`http://localhost:3031`

Click the `Edit` button to specify the project, dataset and table where the sequences are loaded.

Input any combination of nucleotides (A, C, T, G) and click on submit. (At this time using the enter key will not submit the search).

## REST API
The rest Api is server on localhost:3003

