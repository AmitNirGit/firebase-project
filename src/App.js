import "./App.css";
import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
import "firebase/storage";
import { useAuthState } from "react-firebase-hooks/auth";
import SignIn from "./SignIn";
import Profile from "./Profile";

const firebaseConfig = {
  apiKey: "AIzaSyBMKHEasOaB7YPigmGh7S4NYJxNyIQsAYM",
  authDomain: "fir-3d60a.firebaseapp.com",
  databaseURL: "https://fir-3d60a.firebaseio.com",
  projectId: "fir-3d60a",
  storageBucket: "fir-3d60a.appspot.com",
  messagingSenderId: "147305046540",
  appId: "1:147305046540:web:e5e782528364fc236a4429",
  measurementId: "G-C5ZTF1M2WY",
};
firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
const stoarge = firebase.storage();

function App() {
  const [user] = useAuthState(auth);
  return (
    <div className='App'>
      {user ? (
        <Profile firebase={firebase} user={user} stoarge={stoarge} />
      ) : (
        <SignIn auth={auth} firebase={firebase} />
      )}
    </div>
  );
}

export default App;
