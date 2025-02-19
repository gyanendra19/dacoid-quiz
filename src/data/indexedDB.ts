import { openDB } from "idb";
import { AttemptsProp } from "../App";

const DB_NAME = "QuizDB";
const STORE_NAME = "attempts";

interface StoredAttempts {
  id: number;
  attempts: AttemptsProp[];
}

// Initialize Database
const initDB = async () => {
  return openDB(DB_NAME, 1, {
    upgrade(db) {
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME, {
          keyPath: "id",
          autoIncrement: true,
        });
      }
    },
  });
};

// Save an attempt (insert or update)
export const saveAttempt = async (id: number, attempts: AttemptsProp[]) => {
  const db = await initDB();
  const attempt = { id, attempts };
  console.log("Saving:", attempt);

  await db.put(STORE_NAME, attempt);
};

// Retrieve all attempts
export const getAttempts = async (): Promise<StoredAttempts[]> => {
  const db = await initDB();
  return db.getAll(STORE_NAME);
};

// Clear all attempts
export const clearAttempts = async () => {
  const db = await initDB();
  await db.clear(STORE_NAME);
};
