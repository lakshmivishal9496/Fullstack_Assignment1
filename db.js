// db.js
import { connect } from 'mongoose';

const connectDB = async () => {
  try {
    await connect(process.env.CONNECTION_URL);
    console.log('MongoDB connected');
  } catch (error) {
    console.error('Database connection failed:', error);
    process.exit(1);
  }
};

export default connectDB;
