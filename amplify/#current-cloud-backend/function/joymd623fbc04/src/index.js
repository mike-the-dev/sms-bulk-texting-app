

/**
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
 */
var AWS = require('aws-sdk');
var region = process.env.REGION;
var { "v4": uuid } = require('uuid');
AWS.config.update({ region: region });
var ddb = new AWS.DynamoDB.DocumentClient({ apiVersion: '2012-08-10' });

const resolvers = {
  Mutation: {
    createProviders: async (context) => {
      // Array of provider objects
      const providers = context.arguments.input;

      let requests = [];
      const requestLength = providers.length;

      let response = [];

      if (requestLength < 25) throw new Error('A minimum of 25 items is required');

      for (let index = 0; index < providers.length; index++) {
        requests.push({
          PutRequest: {
            Item: {
              "id": uuid(),
              "nameOfProvider": providers[index]['nameOfProvider'],
              "nameOfPractice": providers[index]['nameOfPractice'],
              "description": providers[index]['description'],
              "practicingSince": providers[index]['practicingSince'],
              "schoolOfMedicine": providers[index]['schoolOfMedicine'],
              "medicalLicenseIsValid": providers[index]['medicalLicenseIsValid'],
              "languagesSpoken": providers[index]['languagesSpoken'],
              "insurancesAccepted": providers[index]['insurancesAccepted'],
              "socialMedia": providers[index]['socialMedia'],
              "favoriteProcedure": providers[index]['favoriteProcedure'],
              "schoolRank": providers[index]['schoolRank'],
              "certifications": providers[index]['certifications'],
              "chooseMedicineBecause": providers[index]['chooseMedicineBecause'],
              "location": providers[index]['location'],
              "market": providers[index]['market'],
              "featuredImage": providers[index]['featuredImage'],
              "createdAt": new Date().toISOString(),
              "__typename": "Provider"
            }
          }
        });

        let params = {
          RequestItems: {
            'Provider-6hh537i2ofbbpfanwwnypakboa-dev': requests
          }
        };

        if (requests.length === 2) {

          try {
            const items = await ddb.batchWrite(params).promise();
            requests.map(item => response.push(item.PutRequest.Item));
            requests = [];
          } catch (e) {
            console.log(e);
          }
        } else if (index + 1 === requestLength && requests.length < 2) {
          try {
            const items = await ddb.batchWrite(params).promise();
            requests.map(item => response.push(item.PutRequest.Item));
          } catch (e) {
            console.log(e);
          }
        }
      }

      return response;
    }
  }
}


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