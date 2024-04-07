import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const defaultConnectionString = 'mongodb+srv://lakshmivishal9496:Happycouple@24@cluster0.2ffuhyk.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';

export const connectDB = async () => {
  // Use the connection URL from the environment variable or fallback to the hardcoded one
  const connectionString = process.env.CONNECTION_URL || defaultConnectionString;

  try {
    await mongoose.connect(connectionString, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB connected');
  } catch (error) {
    console.error('Database connection failed:', error.message);
    process.exit(1);
  }
};
