import React, { useRef, useState } from "react";
import { useCollectionData } from "react-firebase-hooks/firestore";

export default function SignIn({ firebase, auth }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [bio, setBio] = useState("");
  const [food, setFood] = useState("");
  const [emailLog, setEmailLog] = useState("");
  const [passwordLog, setPasswordLog] = useState("");
  const [emailReset, setEmailReset] = useState("");

  const firestore = firebase.firestore();

  const myUsers = firestore.collection("users");
  const query = myUsers;
  const [users] = useCollectionData(query);

  const saveToFirestore = (data) => {
    myUsers.add(data);
  };

  const signInWithGoogle = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    auth.signInWithPopup(provider);
  };
  const signInWithFacebook = () => {
    const provider = new firebase.auth.FacebookAuthProvider();
    firebase.auth().signInWithPopup(provider);
    //   .then(function (result) {
    //     // This gives you a GitHub Access Token. You can use it to access the GitHub API.
    //     const token = result.credential.accessToken;
    //     // The signed-in user info.
    //     const user = result.user;
    //     // ...
    //   });
  };

  const signUp = () => {
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .catch((error) => {
        console.log(error);
      });
    saveToFirestore({
      email: email,
      bio: bio,
      food: food,
    });
  };
  const signIn = () => {
    firebase
      .auth()
      .signInWithEmailAndPassword(emailLog, passwordLog)
      .catch((error) => {
        console.log(error);
      });
  };

  const forgotPassword = () => {
    firebase
      .auth()
      .sendPasswordResetEmail(emailReset)
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div>
      <h1> LOGIN PAGE</h1>
      <button onClick={signInWithGoogle}> Sign in with Google</button>
      <button onClick={signInWithFacebook}>sign in with Facebook</button>
      <h1>Sign In with email and password</h1>
      <h2>email</h2>
      <input
        type='text'
        name='email'
        onChange={(e) => {
          setEmailLog(e.target.value);
        }}
      />
      <h2>password</h2>
      <input
        type='password'
        name='password'
        onChange={(e) => {
          setPasswordLog(e.target.value);
        }}
      />
      <button onClick={signIn}>signIn</button>
      <h1>or, just sign up</h1>
      <h2>email</h2>
      <input
        type='text'
        name='email'
        onChange={(e) => {
          setEmail(e.target.value);
        }}
      />
      <h2>password</h2>
      <input
        type='password'
        name='password'
        onChange={(e) => {
          setPassword(e.target.value);
        }}
      />
      <h2>bio</h2>
      <input
        type='text'
        name='name'
        onChange={(e) => {
          setBio(e.target.value);
        }}
      />
      <h2>favorite food</h2>
      <input
        type='text'
        name='name'
        onChange={(e) => {
          setFood(e.target.value);
        }}
      />
      <button onClick={signUp}>signUp</button>

      <h1>forgot your password? enter your email here</h1>
      <input
        type='text'
        name='email'
        onChange={(e) => {
          setEmailReset(e.target.value);
        }}
      />
      <button onClick={forgotPassword}>reset password here</button>
    </div>
  );
}
