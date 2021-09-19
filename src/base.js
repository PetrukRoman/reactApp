import firebase from "firebase/app";
import "firebase/database"; // If using Firebase database
import "firebase/storage";
const config = {
  projectId: "vkr-0-b2cda",
  appId: "1:700032593961:web:2c3e2e58030878b587ac38",
  databaseURL:
    "https://vkr-0-b2cda-default-rtdb.europe-west1.firebasedatabase.app",
  storageBucket: "vkr-0-b2cda.appspot.com",
  locationId: "us-central",
  apiKey: "AIzaSyCpocruHe0SzMs6Hre5GFcfoR4nQqmuxOU",
  authDomain: "vkr-0-b2cda.firebaseapp.com",
  messagingSenderId: "700032593961",
  measurementId: "G-7BZXCZ90GD",
};
const app = firebase.initializeApp(config);
export default app;
