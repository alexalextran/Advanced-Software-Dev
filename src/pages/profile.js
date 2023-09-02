import { ProfileFields } from "@/Components/ProfileComponent";
import { useState } from "react";

const Profile = () => {
  const [isDisabled, setDisabled] = useState(true);
  const [isClicked, setClicked] = useState(false);

  const update = (event) => {
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
  return (
    <div>
      <h1>Username</h1>
      <form onSubmit={update}>
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
        <Button isClicked={isClicked} />
      </form>
    </div>
  );
};

export default Profile;
