

/**
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
 */
var AWS = require('aws-sdk');
var region = process.env.REGION;
var client_id = process.env.CLIENT_ID;
var client_secret = process.env.CLIENT_SECRET;
var axios = require('axios');
var qs = require('qs');
AWS.config.update({ region: region });
var ddb = new AWS.DynamoDB.DocumentClient({ apiVersion: '2012-08-10' });

const resolvers = {
  Mutation: {
    createInstagramToken: async (context) => {
      const code = context.arguments.input.longLiveToken;
      const userId = context.arguments.input.userId;

      try {
        const accessTokenUrl = "https://api.instagram.com/oauth/access_token";
        const accessTokenData = {
          client_id: client_id,
          client_secret: client_secret,
          grant_type: "authorization_code",
          redirect_uri: "https://www.joymd.com/auth",
          code: code
        };
        const accessTokenOptions = { headers: { "content-type": "application/x-www-form-urlencoded" } };

        const response = await axios.post(accessTokenUrl, qs.stringify(accessTokenData), accessTokenOptions);

        const accessToken = response.data.access_token;
        const instaAppSecret = client_secret;

        const longAccessResponse = await axios.get(`https://graph.instagram.com/access_token?grant_type=ig_exchange_token&client_secret=${instaAppSecret}&access_token=${accessToken}`);
        const longLiveToken = longAccessResponse.data.access_token;

        const instagramResponse = await axios.get(`https://graph.instagram.com/me?fields=id,username&access_token=${longLiveToken}`);
        const instagramData = await instagramResponse.data;

        var instagram_attr = {
          longLiveToken: longLiveToken,
          isLinked: true,
          username: instagramData.username
        };

        var params = {
          TableName: 'Provider-6hh537i2ofbbpfanwwnypakboa-dev',
          Key: { id: userId },
          UpdateExpression: 'Set #instagramDetails = :instagramDetails',
          ExpressionAttributeNames: { '#instagramDetails': 'instagramDetails' },
          ExpressionAttributeValues: { ':instagramDetails': instagram_attr },
          ReturnValues: "UPDATED_NEW",
        };

        await ddb.update(params).promise();

        return {
          longLiveToken: longLiveToken,
          isLinked: true,
          username: instagramData.username
        }
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