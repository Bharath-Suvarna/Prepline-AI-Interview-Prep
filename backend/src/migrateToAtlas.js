import mongoose from "mongoose";
import dotenv from "dotenv";
import dns from "node:dns";

// Fix Windows DNS SRV lookup for mongodb+srv://
try {
  dns.setServers(["8.8.8.8", "1.1.1.1"]);
} catch (e) {}

dotenv.config();

const LOCAL_URI = process.env.LOCAL_MONGODB_URI || "mongodb://127.0.0.1:27017/prepline";
const ATLAS_URI = process.argv[2] || process.env.MONGODB_ATLAS_URI || process.env.MONGODB_URI;

if (!ATLAS_URI || ATLAS_URI.includes("127.0.0.1") || ATLAS_URI.includes("localhost")) {
  console.error("Error: Please provide a valid MongoDB Atlas connection URI as an argument or in process.env.MONGODB_ATLAS_URI.");
  console.error("Usage: node src/migrateToAtlas.js \"mongodb+srv://<user>:<password>@cluster.mongodb.net/prepline\"");
  process.exit(1);
}

async function migrate() {
  console.log("=== Prepline Local MongoDB to MongoDB Atlas Migration Tool ===");
  
  // 1. Connect to Local MongoDB & Read Data
  console.log(`Connecting to Local MongoDB: ${LOCAL_URI}...`);
  const localConn = await mongoose.createConnection(LOCAL_URI).asPromise();
  console.log("Connected to Local MongoDB successfully.");

  const collections = ["users", "questions", "codingproblems", "interviewsessions", "codesubmissions"];
  const localData = {};

  for (const colName of collections) {
    try {
      const col = localConn.collection(colName);
      const docs = await col.find({}).toArray();
      localData[colName] = docs;
      console.log(`- Read ${docs.length} document(s) from local collection '${colName}'`);
    } catch (e) {
      localData[colName] = [];
      console.log(`- Local collection '${colName}' empty or missing.`);
    }
  }

  await localConn.close();

  // 2. Connect to MongoDB Atlas & Write Data
  console.log(`\nConnecting to MongoDB Atlas...`);
  const atlasConn = await mongoose.createConnection(ATLAS_URI).asPromise();
  console.log("Connected to MongoDB Atlas successfully.");

  for (const colName of collections) {
    const docs = localData[colName] || [];
    if (docs.length === 0) continue;

    const atlasCol = atlasConn.collection(colName);
    let insertedCount = 0;
    let skippedCount = 0;

    for (const doc of docs) {
      const exists = await atlasCol.findOne({ _id: doc._id });
      if (!exists) {
        await atlasCol.insertOne(doc);
        insertedCount++;
      } else {
        skippedCount++;
      }
    }
    console.log(`- Collection '${colName}': Migrated ${insertedCount} document(s) (Skipped ${skippedCount} already existing).`);
  }

  await atlasConn.close();
  console.log("\nMigration completed successfully! All your local data is now in MongoDB Atlas.");
  process.exit(0);
}

migrate().catch((err) => {
  console.error("Migration Failed:", err.message);
  process.exit(1);
});
