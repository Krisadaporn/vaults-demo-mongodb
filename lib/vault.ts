import axios from 'axios';

export function GetMongodbURI(mongodbUser, mongodbPass){
    return {
      props:{
        mongodbURI: `mongodb+srv://${mongodbUser}:${mongodbPass}@vaults-mongo.o2tlioo.mongodb.net/?retryWrites=true&w=majority`}
    };
}
export async function getMongoDBSideProps() {
    const vaultToken = process.env.VAULT_TOKEN;
    const vaultUrl = process.env.VAULT_URI;
  
    try {
      const response = await axios.get(vaultUrl, {
        headers: {
          'X-Vault-Token': vaultToken
        }
      });
      const {data} = response.data.data;
  
      if (!data) {
        throw new Error('Data not found');
      }
      let { MONGODB_PASS, MONGODB_USER } = data
  
      if (!MONGODB_PASS || !MONGODB_USER) {
        throw new Error('MongoDB credentials not found in response');
      }
    //   let MONGODB_USER = MONGODB_USER+'isNotConnected'
      const MONGODB_URI = GetMongodbURI(MONGODB_USER,MONGODB_PASS).props['mongodbURI']
      console.log(MONGODB_URI)
      return {
          mongodbUser: MONGODB_USER,
          mongodbPass: MONGODB_PASS,
          mongodbUri: MONGODB_URI
      };
    } catch (error) {
      console.error('Error fetching data:', error);
      return {
        props: {
          mongodbUser: null,
          mongodbPass: null,
          mongodbUri: null,
          error: error.message
        }
      };
    }
  }
  
  export default getMongoDBSideProps;