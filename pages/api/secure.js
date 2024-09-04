const mysql = require('mysql2');

// The input username to be used in the query
const username = 'someUsername';

// Validate the username parameter
if (!username || typeof username !== 'string') {
    console.error('Invalid value for parameter "username".');
    return;
}

// Secure query using a parameterized query
const query = 'SELECT * FROM users WHERE username = ?';

// Execute the query with the parameter
connection.execute(query, [username], (err, results) => {
    if (err) {
        console.error('Error executing query:', err);
        return;
    }

    // Handle the results
    console.log('User data:', results);
});

// Close the connection
connection.end();
