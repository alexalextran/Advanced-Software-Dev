import { ProfileFields } from "@/Components/ProfileComponent";
import { useRouter } from "next/router";
import { useState } from "react";
import Navigation from "./navigation";
import { useAuth } from '../../context/AuthContext'
const Profile = () => {
  const [isDisabled, setDisabled] = useState(true);
  const [isClicked, setClicked] = useState(false);
  const router = useRouter();
  const { user, logout } = useAuth()


  const Update = (event) => {
    event.preventDefault();
    // Get details from form
    var { username, email, password } = document.forms[0];
    // update DB logic
    console.log(email.value);
    console.log(username.value);
    console.log(password.value);

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
    logout()
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
              placeholder="Get from db"
              disabled={isDisabled}
            />
            <ProfileFields
              label="Email: "
              type="email"
              name="email"
              placeholder="Get from db"
              disabled={isDisabled}
            />
            <ProfileFields
              label="Password: "
              type="text"
              name="password"
              placeholder="Get from db"
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
