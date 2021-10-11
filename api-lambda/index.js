const { DynamoDBClient, ScanCommand } = require('@aws-sdk/client-dynamodb');

const REGION = "us-east-1";

exports.handler = async (event) => {
  const ddbClient = new DynamoDBClient({ region: REGION });
  const ddbResponse = await ddbClient.send(new ScanCommand({
    TableName: 'birthdays',
  }));
  
  const responseBody = [];
  ddbResponse.Items.forEach((item) => {
    const newItem = {};
    for (let key in item) {
      newItem[key] = item[key]['S'];
    }
    responseBody.push(newItem);
  });

  const response = {
    statusCode: 200,
    body: JSON.stringify(responseBody),
  };
  return response;
};
