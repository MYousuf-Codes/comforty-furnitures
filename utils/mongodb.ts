import { MongoClient } from "mongodb";

// Ensure the MongoDB connection happens only on the server side (avoid issues on the client side)
const MONGODB_URI = process.env.MONGODB_URI as string;

if (!MONGODB_URI) {
  throw new Error("Please define the MONGODB_URI in your .env file");
}

let client: MongoClient;
let clientPromise: Promise<MongoClient>;

// For TypeScript to be able to export this function correctly, define it outside the `if` block
export async function connectToDatabase(): Promise<MongoClient> {
  if (process.env.NODE_ENV === "development") {
    // In development, use a global MongoClient instance
    let globalWithMongoClientPromise = global as typeof globalThis & {
      _mongoClientPromise: Promise<MongoClient>;
    };
    if (!globalWithMongoClientPromise._mongoClientPromise) {
      client = new MongoClient(MONGODB_URI);
      globalWithMongoClientPromise._mongoClientPromise = client.connect();
    }
    clientPromise = globalWithMongoClientPromise._mongoClientPromise;
  } else {
    // In production, create a new MongoClient instance
    client = new MongoClient(MONGODB_URI);
    clientPromise = client.connect();
  }

  // Return the connected client promise
  return clientPromise;
}
