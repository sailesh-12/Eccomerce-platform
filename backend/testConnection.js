import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

console.log('Starting connection test...');
console.log('Attempting to connect to database...');

// Test the connection
mongoose.connect(process.env.MONGO_URL)
    .then(() => {
        console.log('Successfully connected to MongoDB.');
        console.log('Connection Details:');
        console.log('Database Name:', mongoose.connection.name);
        console.log('Database Host:', mongoose.connection.host);
        console.log('Database Port:', mongoose.connection.port);
        process.exit(0);
    })
    .catch((error) => {
        console.error('Failed to connect to MongoDB');
        console.error('Error:', error.message);
        console.error('Full error:', error);
        process.exit(1);
    }); 