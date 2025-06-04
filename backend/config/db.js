import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

const connectDB = async () => {
    try {
        if (!process.env.MONGO_URL) {
            throw new Error('MongoDB connection URL is not defined in environment variables');
        }

        // Ensure we're using the correct database name
        const mongoUrl = process.env.MONGO_URL.replace('/eccomerce?', '/Eccomerce?');
        
        // Debug log - remove in production
        console.log('Attempting to connect to MongoDB...');
        console.log('Connection string format check:', mongoUrl.split('@')[0].replace(/:[^:]*@/, ':****@'));
        
        const conn = await mongoose.connect(mongoUrl, {
            serverSelectionTimeoutMS: 5000, // Timeout after 5s instead of 30s
            socketTimeoutMS: 45000, // Close sockets after 45s
        });
        
        console.log(`MongoDB Connected: ${conn.connection.host}`);
        console.log(`Database Name: ${conn.connection.name}`);
    } catch (error) {
        console.error('MongoDB Connection Error Details:');
        console.error(`Error name: ${error.name}`);
        console.error(`Error message: ${error.message}`);
        if (error.code) {
            console.error(`Error code: ${error.code}`);
        }
        if (error.stack) {
            console.error('Stack trace:', error.stack);
        }
        process.exit(1);
    }
};

export default connectDB; 