// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { createUser } from "./service/user.route";

const firebaseConfig = {
  apiKey: "AIzaSyBAS6108w6O-yC4KauEO1O64vnF3wQimIE",
  authDomain: "mediumclone-a8615.firebaseapp.com",
  projectId: "mediumclone-a8615",
  storageBucket: "mediumclone-a8615.appspot.com",
  messagingSenderId: "293273507869",
  appId: "1:293273507869:web:06a00908c5d0fdedcc4ef4",
  measurementId: "G-63VHPL93MD",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth();

export { app, auth };
export const provider = new GoogleAuthProvider();

export const signInWithGoogle = () => {
  signInWithPopup(auth, provider)
    .then(async (result) => {
      const name = result.user.displayName;
      const email = result.user.email;
      const profilePic = result.user.photoURL;
      console.log("profilePic", profilePic);
      const data = {
        name: name,
        email: email,
        image: profilePic,
      };

      const res = await createUser(data);
      console.log(res);

      localStorage.setItem("name", name);
      localStorage.setItem("email", email);
      localStorage.setItem("profilePic", profilePic);
    })
    .catch((error) => console.log(error));
};
