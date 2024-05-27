const mysql = require('mysql');

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'for me'
});

db.connect((err) => {
    if (err) {
        console.error('MySQL Connection Error:', err);
        process.exit(1);
    } else {
        console.log('MySQL Connected...');
    }
});

module.exports = db;
