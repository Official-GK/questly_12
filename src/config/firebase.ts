import { initializeApp } from 'firebase/app';
import { getAuth, connectAuthEmulator } from 'firebase/auth';
import { getFirestore, connectFirestoreEmulator } from 'firebase/firestore';
import { getAnalytics } from "firebase/analytics";
import { getStorage, connectStorageEmulator } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyDuMENjxgXUeEFs-86SDffpebiJ9uzA0xM",
  authDomain: "questly-6d952.firebaseapp.com",
  projectId: "questly-6d952",
  storageBucket: "questly-6d952.appspot.com",
  messagingSenderId: "101337258033",
  appId: "1:101337258033:web:c98626475aa9da2ee71d10",
  measurementId: "G-3GP6PL68VZ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize services
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

// Initialize analytics only in production
let analytics = null;
if (typeof window !== 'undefined' && import.meta.env.PROD) {
  analytics = getAnalytics(app);
}

// Connect to emulators only in development and if FIREBASE_USE_EMULATOR is true
const useEmulator = import.meta.env.DEV && import.meta.env.VITE_FIREBASE_USE_EMULATOR === 'true';

if (useEmulator) {
  console.log('Using Firebase Emulators');
  connectAuthEmulator(auth, 'http://127.0.0.1:9098', { disableWarnings: true });
  connectFirestoreEmulator(db, '127.0.0.1', 8081);
  connectStorageEmulator(storage, '127.0.0.1', 9198);
}

export { app, auth, db, storage, analytics };
