import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc, serverTimestamp } from "firebase/firestore";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID
};

const isMock = !firebaseConfig.apiKey || firebaseConfig.apiKey.includes("mock");

let db = null;
if (!isMock) {
  try {
    const app = initializeApp(firebaseConfig);
    db = getFirestore(app);
    console.log("Firebase initialized successfully in Firestore mode.");
  } catch (error) {
    console.warn("Firebase initialization failed. Falling back to Local Storage mode:", error);
  }
} else {
  console.log("Running in Local Storage fallback mode (mock credentials detected).");
}

/**
 * Submit RSVP data.
 * @param {Object} rsvpData - { guestName: string, attending: boolean, guestCount: number }
 */
export async function submitRSVP(rsvpData) {
  if (db) {
    try {
      const docRef = await addDoc(collection(db, "rsvps"), {
        ...rsvpData,
        createdAt: serverTimestamp()
      });
      return { success: true, id: docRef.id };
    } catch (error) {
      console.error("Error writing to Firestore:", error);
      throw error;
    }
  } else {
    // LocalStorage fallback for testing
    let existing = [];
    try {
      const storedRsvps = JSON.parse(localStorage.getItem("rsvps") || "[]");
      existing = Array.isArray(storedRsvps) ? storedRsvps : [];
    } catch (error) {
      console.warn("Stored RSVP data was invalid. Resetting local fallback storage:", error);
    }

    const newEntry = {
      ...rsvpData,
      id: `local-${Date.now()}`,
      createdAt: new Date().toISOString()
    };
    existing.push(newEntry);
    localStorage.setItem("rsvps", JSON.stringify(existing));
    
    // Simulate network delay for realistic UI test
    await new Promise((resolve) => setTimeout(resolve, 800));
    return { success: true, id: newEntry.id, isLocal: true };
  }
}

/**
 * Get all RSVPs.
 * @returns {Promise<Array>} List of RSVP objects
 */
export async function getRSVPs() {
  if (db) {
    try {
      const { getDocs, query, orderBy } = await import("firebase/firestore");
      const q = query(collection(db, "rsvps"), orderBy("createdAt", "desc"));
      const querySnapshot = await getDocs(q);
      const rsvps = [];
      querySnapshot.forEach((doc) => {
        rsvps.push({ id: doc.id, ...doc.data() });
      });
      return rsvps;
    } catch (error) {
      console.error("Error fetching from Firestore:", error);
      throw error;
    }
  } else {
    return JSON.parse(localStorage.getItem("rsvps") || "[]");
  }
}

export { db };
