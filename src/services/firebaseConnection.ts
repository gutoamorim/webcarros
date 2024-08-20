import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCm3WvLmWgeS8HsH4PyUmlLgAR7uj4JZNg",
  authDomain: "webcarros-d0026.firebaseapp.com",
  projectId: "webcarros-d0026",
  storageBucket: "webcarros-d0026.appspot.com",
  messagingSenderId: "128132329593",
  appId: "1:128132329593:web:8d6cbb93015ae68e5b64a8",
};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);
const auth = getAuth(app);
const storage = getStorage(app);

export { db, auth, storage };
