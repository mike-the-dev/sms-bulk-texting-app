// @ts-ignore
import AWS from 'aws-sdk';

AWS.config.update({
  region: process.env.AWS_REGION,
  accessKeyId: process.env.AWS_ACCESS_KEY,
  secretAccessKey: process.env.AWS_SECRET_KEY
});

const ddb = new AWS.DynamoDB.DocumentClient({ apiVersion: '2012-08-10' });

const getDocumentById = async (id: string): Promise<any | void> => {
  
  // try {
    const TableName = process.env.AWS_DYNAMODB ? process.env.AWS_DYNAMODB : '';
    if ( !TableName ) throw new Error('Table name envrionment variable unavailable');

    const params = {
      TableName: TableName,
      Key: {
        id: id
      }
    };

    const item = await ddb.get(params).promise();

    console.log('item: ', item);
    
    return item?.Item;
  // } catch (error: any) {
    // console.log('ERROR: ', error);
    // return null;
  // }
};

export default getDocumentById;
