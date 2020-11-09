#!/bin/bash

if [ $# -lt 4 ]; then
  echo "usage: $0 <google-projectid> <dataset> <table> <dir> <tmpfile>"
  exit
fi

PROJECT_ID=$1
DATASET=$2
TABLE=$3
FILES=$4
TMP_FILE=$5
rm -f $TMP_FILE

set +e
bq ls --project_id $PROJECT_ID $DATASET_NAME > /dev/null
if [ $? -ne 0 ]; then
  set -e
  echo "making dataset $DATASET"
  bq mk --project_id=$PROJECT_ID $DATASET
fi
set +e
bq show --project_id $PROJECT_ID ${DATASET}.${TABLE} > /dev/null
if [ $? -ne 0 ]; then
  set -e
  echo "making table ${DATASET}.${TABLE}"
  bq --location=US mk --project_id=$PROJECT_ID ${DATASET}.${TABLE} sequence_schema.json
fi

for f in $FILES/*
do
  cat $f >> $TMP_FILE
  echo "" >> $TMP_FILE
done
bq load  --project_id=$PROJECT_ID --source_format=NEWLINE_DELIMITED_JSON ${DATASET}.${TABLE} $TMP_FILE sequence_schema.json
