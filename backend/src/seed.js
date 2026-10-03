import mongoose from "mongoose";
import dotenv from "dotenv";
import dns from "node:dns";
import CodingProblem from "./models/CodingProblem.js";
import Question from "./models/Question.js";
import { CODING_PROBLEMS } from "./seedHelper.js";

// Fix Windows DNS SRV lookup for mongodb+srv://
try {
  dns.setServers(["8.8.8.8", "1.1.1.1"]);
} catch (e) {}

dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/prepline";

const STARTER_QUESTIONS = [
  {
    mode: "technical",
    topic: "Data Structures",
    difficulty: "Easy",
    questionText: "What is the difference between an array and a linked list, and when would you choose one over the other?",
    source: "seed"
  },
  {
    mode: "technical",
    topic: "JavaScript",
    difficulty: "Medium",
    questionText: "Explain closures in JavaScript with an example of a practical use case.",
    source: "seed"
  },
  {
    mode: "technical",
    topic: "Databases",
    difficulty: "Medium",
    questionText: "What is the difference between SQL and NoSQL databases? When would you pick MongoDB over MySQL?",
    source: "seed"
  },
  {
    mode: "technical",
    topic: "System Design",
    difficulty: "Hard",
    questionText: "How would you design a URL shortening service like bit.ly? Walk through your approach.",
    source: "seed"
  },
  {
    mode: "technical",
    topic: "React",
    difficulty: "Medium",
    questionText: "What is the Virtual DOM and how does React use it to optimize rendering?",
    source: "seed"
  },
  {
    mode: "hr",
    topic: "Behavioral",
    difficulty: "Easy",
    questionText: "Tell me about yourself and why you're interested in this role.",
    source: "seed"
  },
  {
    mode: "hr",
    topic: "Behavioral",
    difficulty: "Medium",
    questionText: "Describe a time you disagreed with a teammate. How did you handle it?",
    source: "seed"
  },
  {
    mode: "hr",
    topic: "Career",
    difficulty: "Easy",
    questionText: "Where do you see yourself in the next three to five years?",
    source: "seed"
  },
  {
    mode: "hr",
    topic: "Behavioral",
    difficulty: "Medium",
    questionText: "Tell me about a project you're most proud of and the impact it had.",
    source: "seed"
  }
];

async function seed() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log("Connected to MongoDB for seeding...");

    await CodingProblem.deleteMany({});
    await CodingProblem.insertMany(CODING_PROBLEMS);
    console.log(`Seeded ${CODING_PROBLEMS.length} Coding Problems successfully.`);

    await Question.deleteMany({});
    await Question.insertMany(STARTER_QUESTIONS);
    console.log("Seeded Starter Questions successfully.");

    process.exit(0);
  } catch (err) {
    console.error("Seeding Error:", err);
    process.exit(1);
  }
}

seed();
