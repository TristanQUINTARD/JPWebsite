import mongoose from 'mongoose';

const MONGO_URI = process.env.MONGO_URI || 'mongodb+srv://Tristan:nature123@cluster0.yo4fvwt.mongodb.net/?appName=Cluster0rn';

let isConnected = false;

export const ConnectDB = async () => {
  try {
    if (mongoose.connection.readyState >= 1) {
      if (!isConnected) {
        console.log('Already connected to MongoDB');
        isConnected = true;
      }
      return;
    }

    await mongoose.connect(MONGO_URI, {
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
      connectTimeoutMS: 5000,
    });

    isConnected = true;
    console.log('Connected to MongoDB successfully');
    
    // Gérer les événements de connexion
    mongoose.connection.on('disconnected', () => {
      console.log('MongoDB disconnected');
      isConnected = false;
    });
    
    mongoose.connection.on('error', (err) => {
      console.error('MongoDB connection error:', err);
      isConnected = false;
    });

  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    isConnected = false;
    throw error;
  }
};
