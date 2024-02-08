// // pages/VaultData.js

// import axios from 'axios';

// const VaultData = ({ mongodbPass, mongodbUser}) => {
//   return (
//     <div>
//       <h1>Vault Data for illustrate purpose</h1>
//       <p>MongoDB Password: {mongodbPass}</p>
//       <p>MongoDB User: {mongodbUser}</p>
//     </div>
//   );
// };

// export async function getServerSideProps() {
//   const vaultToken = process.env.VAULT_TOKEN;
//   const vaultUrl = process.env.VAULT_URI;

//   try {
//     const response = await axios.get(vaultUrl, {
//       headers: {
//         'X-Vault-Token': vaultToken
//       }
//     });

//     const {data} = response.data.data;

//     if (!data) {
//       throw new Error('Data not found');
//     }

//     const { MONGODB_PASS, MONGODB_USER } = data; // Destructure MONGODB_PASS and MONGODB_USER from data
    
//     return {
//       props: {
//         mongodbUser: MONGODB_USER,
//         mongodbPass: MONGODB_PASS,
//       }
//     };
//   } catch (error) {
//     console.error('Error fetching data:', error);
//     return {
//       props: {
//         mongodbUser: null,
//         mongodbPass: null,
//       }
//     };
//   }
// }

// export default VaultData;

import axios from 'axios';

const VaultData = ({ mongodbPass, mongodbUser }) => {
  return (
    <div>
      <h1>Vault Data for illustration purpose</h1>
      <p>MongoDB Password: {mongodbPass}</p>
      <p>MongoDB User: {mongodbUser}</p>
    </div>
  );
};

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

    return {
      props: {
        mongodbUser: MONGODB_USER,
        mongodbPass: MONGODB_PASS,
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

export default VaultData;
