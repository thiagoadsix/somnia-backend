aws dynamodb --endpoint-url=http://localhost:4566 create-table \
  --table-name Dreams \
  --attribute-definitions AttributeName=id,AttributeType=S \
  --key-schema AttributeName=id,KeyType=HASH \
  --provisioned-throughput ReadCapacityUnits=10,WriteCapacityUnits=5