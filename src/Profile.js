import React, { useState } from "react";
import { useCollectionData } from "react-firebase-hooks/firestore";

function Profile({ firebase, stoarge }) {
  const [img, setImg] = useState(null);
  const handleChange = (event) => {
    console.log(event.target.files[0]);
    if (event.target.files[0]) {
      setImg(event.target.files[0]);
    }
  };
  const uploadToStoarge = () => {
    const uplaod = stoarge.ref(`images/${img.name}`).put(img);
    uplaod.on(
      "state_changed",
      (snapshot) => {},
      (error) => {
        console.log(error);
      },
      () => {
        stoarge
          .ref("images")
          .child(img.name)
          .getDownloadURL()
          .then((url) => {
            console.log(url);
          });
      }
    );
  };

  return (
    <div>
      <button
        onClick={() => {
          firebase.auth().signOut();
        }}>
        sign out
      </button>
      {/* <button onClick={log}>read from firestore</button>
      <button onClick={saveToFirestore}>add dril to db</button> */}

      <h1>Welcome to my website</h1>
      <h2>are you ugly? let me see</h2>
      <input type='file' onChange={handleChange}></input>
      <button onClick={uploadToStoarge}>upload image</button>
    </div>
  );
}

export default Profile;
