# coding-solution

## Ingest sequences

I am using Google BigQuery to store the sequences. In the bq/ subdirectory is a schema file `sequence_schema.json` that defines the BQ schema and a script that will load the data `loaddata.sh`.
The script assumes that all the individual sequence json files are in a local directory. This has scalability limitations. For a scalable solution, the files should be loaded from google cloud storage. 

- build the docker image
- start the docker image
`docker run -it <image> /bin/bash`
- log into gcloud and follow the instructions to authenticate
`gcloud auth login`
- set your project and load the data

## Run the client and server
From the main directory run:

`docker-compose build`

`docker-compose up`

At any time to stop the client and server, you can run:

`docker-compose stop`

