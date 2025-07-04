const AWS = require('aws-sdk');
const dynamoDb =  new AWS.DynamoDB.DocumentClient();

module.exports.handler = async () => {
    const params = {
         TableName: process.env.COFFEE_ORDERS_TABLE 
        }

        try {
            const result = await dynamoDb.scan(params).promise();
            return {
                statusCode: 200,
            headers: {
            'Access-Control-Allow-Origin': '*',  // <--- THIS IS CORS FIX
            'Access-Control-Allow-Credentials': true,
            },
                body: JSON.stringify(result.Items)
            }
        } catch (error) {
                  return {
      statusCode: 500,
            headers: {
            'Access-Control-Allow-Origin': '*',  // <--- THIS IS CORS FIX
            'Access-Control-Allow-Credentials': true,
            },
      body: JSON.stringify({ error: `Could not retrieve orders: ${error.message}` })
    };
        }
}