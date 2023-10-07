import { ProfileFields } from "@/Components/ProfileComponent";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Navigation from "./navigation";
import { useAuth } from "../../context/AuthContext";
import {
  doc,
  getDoc,
  getDocs,
  getFirestore,
  updateDoc,
} from "firebase/firestore";
import {
  getAuth,
  updateEmail,
  updatePassword,
  reauthenticateWithCredential,
  EmailAuthProvider,
} from "firebase/auth";

const Profile = () => {
  const [isDisabled, setDisabled] = useState(true);
  const [isClicked, setClicked] = useState(false);
  const [username, setUsername] = useState(null);
  const router = useRouter();
  const { user, logout, updateUserEmail } = useAuth();

  let emailVariable = "";
  const auth = getAuth();
  // To prevent error when user is not logged in
  try {
    emailVariable = user.email;
  } catch (error) {
    emailVariable = "";
  }
  useEffect(() => {
    const getUsername = async (email) => {
      const db = getFirestore();
      const userdb = doc(db, "users", email);
      const userObj = await getDoc(userdb);
      setUsername(userObj.data().username);
    };

    getUsername(emailVariable);
  }, []);

  const Update = async (event) => {
    event.preventDefault();
    // Get details from form
    var { username, email, password } = document.forms[0];
    // update DB logic
    updateUserEmail(email.value);

    if (username.value !== "") {
      // Update user collection fields
      await updateDoc(
        doc(getFirestore(), "users", emailVariable),
        { username: username.value },
        { merge: true }
      );
    }
    if (email.value !== "") {
      // Update firestore auth email
      // updateEmail(getAuth().currentUser, email.value).then(() => {
      //   console.log("Email updated");
      // });
      // Update user collection fields
      // const db = getFirestore();
      // const userdb = doc(db, "users", emailVariable);
      // const userObj = await getDoc(userdb);
      // await setDoc(doc(getFirestore(), "users", email.value), userObj.data());
      // deleteDoc(userdb);
    }
    if (password.value !== "") {
      // Update firestore auth password
      const creds = EmailAuthProvider.credential(
        emailVariable,
        (await getDoc(doc(getFirestore(), "users", emailVariable))).get(
          "password"
        )
      );
      reauthenticateWithCredential(getAuth().currentUser, creds);
      updatePassword(getAuth().currentUser, password.value).then(() => {
        console.log("Password updated");
        console.log(emailVariable);
      });
      await updateDoc(doc(getFirestore(), "users", emailVariable), {
        password: password.value,
      });
    }
    // Set the buttons back to original state
    setDisabled(true);
    setClicked(false);
  };

  const Button = (props) => {
    if (!props.isClicked) {
      return (
        <button
          onClick={() => {
            setDisabled(false);
            setClicked(true);
          }}
        >
          Update personal particulars
        </button>
      );
    } else {
      return (
        <div>
          <button type="submit">Submit</button>
          <button
            onClick={() => {
              setDisabled(true);
              setClicked(false);
            }}
          >
            Cancel
          </button>
        </div>
      );
    }
  };

  const Delete = () => {
    // Have a pop up to ask if user is sure
    const response = window.confirm(
      "Are you sure you want to delete your account?"
    );
    if (response) {
      // Delete account logic
      console.log("Delete account");
    }
  };

  const LogOut = () => {
    // Have a pop up to ask if user is sure
    const response = window.confirm("Are you sure you want to log out?");
    if (response) {
      logout();
      router.push("/");
    }
  };

  return (
    <div>
      <Navigation />
      <div className="formDiv">
        <h1>Username</h1>
        <form onSubmit={Update}>
          <div className="profileForm">
            <ProfileFields
              label="Username: "
              type="text"
              name="username"
              placeholder={username}
              disabled={isDisabled}
            />
            <ProfileFields
              label="Email: "
              type="email"
              name="email"
              placeholder={emailVariable}
              disabled={isDisabled}
            />
            <ProfileFields
              label="Password: "
              type="text"
              name="password"
              placeholder="Type new password"
              disabled={isDisabled}
            />
          </div>
          <Button isClicked={isClicked} />
        </form>
        <br />
        <button onClick={LogOut}> Log Out </button>
        <br />
        <button onClick={Delete}>
          <span style={{ color: "red" }}>Delete account</span>
        </button>
      </div>
    </div>
  );
};

export default Profile;
