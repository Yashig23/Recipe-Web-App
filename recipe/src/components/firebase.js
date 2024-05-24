import { initializeApp } from "firebase/app";
import { getDatabase } from 'firebase/database';
// import { ref, child, get, set, update, remove} from "https://recipe-book2-3494d-default-rtdb.firebaseio.com";

const firebaseConfig = {
  apiKey: "AIzaSyBgNFQI_t6UHtCHdWiHVwax8e5_cXCubPE",
  authDomain: "recipe-book2-3494d.firebaseapp.com",
  databaseURL: "https://recipe-book2-3494d-default-rtdb.firebaseio.com",
  projectId: "recipe-book2-3494d",
  storageBucket: "recipe-book2-3494d.appspot.com",
  messagingSenderId: "913107438020",
  appId: "1:913107438020:web:f3371b67e97f4e3ab27c91"
};

// Initialize Firebase


const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

export {db};