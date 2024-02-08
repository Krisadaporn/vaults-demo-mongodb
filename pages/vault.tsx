// pages/VaultData.js

import axios from 'axios';
import { useState } from 'react';


export default function VaultData({ mongodbPass, mongodbUser, mongodbUri}){
  // const [data, setData] =useState("");

  // const vaultData = () => {
  //   setData({mongodbUri})
  //   console.log(setData({mongodbUri}))
  // };

  return (
    <div className='container'>
      <h1>Vault Data for illustration purpose</h1>
      <h3>MongoDB Password: {mongodbPass}</h3>
      <h3>MongoDB User: {mongodbUser}</h3>
      <h3>MongoDB URI: {mongodbUri}</h3> 
    </div>
  );
}

// const VaultPages = ({ mongodbPass, mongodbUser, mongodbUri}) => {
//   return ( 
//     <div className='container'>
//       <h1>Vault Data for illustration purpose</h1>
//       <h3>MongoDB Password: {mongodbPass}</h3>
//       <h3>MongoDB User: {mongodbUser}</h3>
//       <h3>MongoDB URI: {mongodbUri}</h3> 
//     </div>
//   );
// };

export function GetMongodbURI(mongodbUser, mongodbPass){
  return {
    props:{
      mongodbURI: `mongodb+srv://${mongodbUser}:${mongodbPass}@vaults-mongo.o2tlioo.mongodb.net/?retryWrites=true&w=majority`}
  };
}

export async function getServerSideProps() {
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
    const { MONGODB_PASS, MONGODB_USER } = data

    if (!MONGODB_PASS || !MONGODB_USER) {
      throw new Error('MongoDB credentials not found in response');
    }
    const MONGODB_URI = GetMongodbURI(MONGODB_USER,MONGODB_PASS).props['mongodbURI']
    // console.log(MONGODB_URI)
    return {
      props: {
        mongodbUser: MONGODB_USER,
        mongodbPass: MONGODB_PASS,
        mongodbUri: MONGODB_URI
      }
    };
  } catch (error) {
    console.error('Error fetching data:', error);
    return {
      props: {
        mongodbUser: null,
        mongodbPass: null,
        error: error.message
      }
    };
  }
}

// export default VaultPages;
