

/**
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
 */
var AWS = require('aws-sdk');
var region = process.env.REGION;
AWS.config.update({ region: region });
var ddb = new AWS.DynamoDB.DocumentClient({ apiVersion: '2012-08-10' });

const resolvers = {
  Query: {
    getProviderUsername: async (context) => {
      const user_details = {
        username: context.arguments.input.username,
        email: context.arguments.input.email
      };
      const params = {
        TableName: 'Provider-6hh537i2ofbbpfanwwnypakboa-dev',
        FilterExpression: 'userDetails = :user_details',
        ExpressionAttributeValues: { ':user_details': user_details }
      };

      try {
        const response = await ddb.scan(params).promise();

        return response.Items[0];
      } catch (error) {
        console.error(error.code, error.message);

        return error;
      }

    }
  }
};


exports.handler = async (event) => {
  const typeHandler = resolvers[event.typeName];

  if (typeHandler) {
    const resolver = typeHandler[event.fieldName];

    if (resolver) {
      const result = await resolver(event);

      return result;
    }
  }

  throw new Error("Resolver not found.");
};