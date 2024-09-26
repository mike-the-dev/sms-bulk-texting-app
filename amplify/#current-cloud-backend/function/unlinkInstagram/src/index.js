

/**
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
 */
var AWS = require('aws-sdk');
var region = process.env.REGION;
AWS.config.update({ region: region });
var ddb = new AWS.DynamoDB.DocumentClient({ apiVersion: '2012-08-10' });

const resolvers = {
  Mutation: {
    unLinkInstagram: async (context) => {
      const userId = context.arguments.input.id;
      const isLinked = context.arguments.input.instagramDetails.isLinked;
      try {

        var instagram_attr = {
          isLinked,
        };

        var params = {
          TableName: 'Provider-6hh537i2ofbbpfanwwnypakboa-dev',
          Key: { id: userId },
          UpdateExpression: 'Set #instagramDetails.isLinked = :instagramDetails',
          ExpressionAttributeNames: { '#instagramDetails': 'instagramDetails' },
          ExpressionAttributeValues: { ':instagramDetails': instagram_attr.isLinked },
          ReturnValues: "UPDATED_NEW",
        };

        await ddb.update(params).promise();

        return {
          isLinked,
        };
      } catch (err) {
        console.log(err);
        return null;
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