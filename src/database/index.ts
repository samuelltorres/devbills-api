import mongoose from 'mongoose';

export async function setupMongo(): Promise<void> {
  try {
    if (mongoose.connection.readyState === 1) {
      return;
    }

    console.log('🎲  Connecting to DataBase...');
    await mongoose.connect(process.env.MONGO_URL as string);
    console.log('✅  DataBase Connected!');
  } catch (err) {
    // throw new Error(`❌  DataBase not connected. - ${err}`);
    console.error(`❌  DataBase not connected. - ${err}`);
    process.exit(1);
  }
}
