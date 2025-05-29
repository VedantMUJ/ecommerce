require('dotenv').config();
const db = require('./config/db');

async function testConnection() {
    try {
        const [rows] = await db.query('SELECT 1');
        console.log('MySQL Connection Successful!');
        console.log('Test query result:', rows);
        process.exit(0);
    } catch (error) {
        console.error('MySQL Connection Error:', error);
        process.exit(1);
    }
}

testConnection(); 