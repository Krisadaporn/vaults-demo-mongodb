const mysql = require('mysql2');

// Create a connection to the database
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'your_password',
    database: 'your_database'
});

// The input username to be used in the query
const username = 'someUsername';

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
