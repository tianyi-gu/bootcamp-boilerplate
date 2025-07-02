import * as path from 'path';
import { MongoClient, ServerApiVersion } from 'mongodb';
import dotenv from 'dotenv'

const __dirname = path.resolve()
dotenv.config({ path: path.resolve(__dirname, 'config.env') })

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(process.env.ATLAS_URI, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

let database

export const connectToServer = async () => {
    try {
      // Connect the client to the server
      await client.connect();
      
      // Verify connection by pinging the database
      await client.db("notes-app").command({ ping: 1 });
      console.log("✅ MongoDB connection established successfully!");

      database = client.db("notes-app");
      return true; // Return success status
    } catch (err) {
      console.error("❌ MongoDB connection failed:", err);
      return false; // Return failure status
    }
};

export const getDb = () => {
  return database
}
