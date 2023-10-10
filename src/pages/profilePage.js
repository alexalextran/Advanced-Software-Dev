import { ProfileFields } from "@/Components/ProfileComponent";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Navigation from "./navigation";
import { useAuth } from "../../context/AuthContext";
import {
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  getFirestore,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import {
  getAuth,
  updateEmail,
  updatePassword,
  reauthenticateWithCredential,
  EmailAuthProvider,
  deleteUser,
} from "firebase/auth";
import { async } from "@firebase/util";
import { admin } from "../../firebase";

const Profile = () => {
  const [isDisabled, setDisabled] = useState(true);
  const [isClicked, setClicked] = useState(false);
  const [username, setUsername] = useState(null);
  const router = useRouter();
  const { user, logout, updateUserEmail, login } = useAuth();

  let emailVariable = "";
  const auth = getAuth();
  // To prevent error when user is not logged in
  if (emailVariable === "") {
    try {
      emailVariable = user.email;
    } catch (error) {
      emailVariable = "";
    }
  }
  useEffect(() => {
    const getUsername = async (email) => {
      const db = getFirestore();
      const userdb = doc(db, "users", email);
      // const userObj = await getDoc(userdb);
      // setUsername(userObj.data().username);
      await getDoc(userdb).then((doc) => {
        if (doc.exists()) {
          setUsername(doc.data().username);
        } else {
          console.log("No such document!");
        }
      });
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
      console.log(
        "This is the email before getting old password: " + emailVariable
      );
      const oldPassword = (
        await getDoc(doc(getFirestore(), "users", emailVariable))
      ).data().password;
      const creds = EmailAuthProvider.credential(
        emailVariable,
        (await getDoc(doc(getFirestore(), "users", emailVariable))).data()
          .password
      );
      await reauthenticateWithCredential(getAuth().currentUser, creds);

      await updateEmail(getAuth().currentUser, email.value).then(() => {
        console.log("Email updated");
      });
      // Update user collection fields
      const db = getFirestore();
      const userdb = doc(db, "users", emailVariable);
      const userObj = await getDoc(userdb);
      await setDoc(
        doc(getFirestore(), "users", email.value.toLowerCase()),
        userObj.data()
      );
      deleteDoc(userdb);
      emailVariable = email.value;
      console.log("This is the new email: " + emailVariable);
      console.log("This is user.email: " + user.email);
      router.reload();
      // await login(email.value, oldPassword);
    }
    if (password.value !== "") {
      // Update firestore auth password
      const creds = EmailAuthProvider.credential(
        emailVariable,
        (await getDoc(doc(getFirestore(), "users", emailVariable))).data()
          .password
      );
      await reauthenticateWithCredential(getAuth().currentUser, creds);
      // const oldPassword = (
      //   await getDoc(doc(getFirestore(), "users", emailVariable))
      // ).data().password;
      // login(emailVariable, oldPassword);
      await updatePassword(getAuth().currentUser, password.value).then(() => {
        console.log("Password updated");
        console.log(emailVariable);
        console.log(password.value);
      });
      await updateDoc(doc(getFirestore(), "users", emailVariable), {
        password: password.value,
      });
      await login(emailVariable, password.value);
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

  const Delete = async () => {
    // Have a pop up to ask if user is sure
    const response = window.confirm(
      "Are you sure you want to delete your account?"
    );
    if (response) {
      // Delete account logic
      await deleteDoc(doc(getFirestore(), "users", emailVariable));
      await deleteUser(getAuth().currentUser);
      console.log("Delete account");
      logout();
      router.push("/");
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
