import { useRouter } from "next/router";
import { MdEmail } from "react-icons/md";
import { FaLock, FaUser } from "react-icons/fa6";
import { IconContext } from "react-icons";
import LoginField from "@/Components/LoginComponent";
import { useAuth } from "../../context/AuthContext";
import React, { useEffect } from "react";
import { doc, getFirestore, setDoc } from "firebase/firestore";
// use router.push('/Dashboard') to go redirect user to dashboard after user auth
//
const SignupPage = () => {
  const router = useRouter();
  const { user, signup } = useAuth();

  const signupfunc = async (event) => {
    event.preventDefault();
    // Get details from form
    var { email, password, username } = document.forms[0];
    // sign up logic
    // use email.value to get value of variable

    try {
      await signup(email.value, password.value);

      const db = getFirestore();
      await setDoc(doc(db, "users", email.value.toLowerCase()), {
        username: username.value,
        password: password.value,
      });
      router.replace("/Dashboard");
    } catch (err) {
      alert(err.message);
      console.log(err);
    }

    // Redirect to dashboard if valid
    // Todo: pass email to dashboard page

    // Redirect if not valid
  };

  useEffect(() => {
    if (user) router.push("/Dashboard");
  }, [user]);

  return (
    <div className="formDiv">
      <h1>Sign up Here!</h1>
      <form onSubmit={signupfunc}>
        <LoginField
          icon={<FaUser />}
          type="text"
          name="username"
          placeholder="Username"
        />
        <LoginField
          icon={<MdEmail />}
          type="email"
          name="email"
          placeholder="Email"
        />
        <LoginField
          icon={<FaLock />}
          type="password"
          name="password"
          placeholder="Password"
        />
        <br />
        <button type="submit">Sign up</button>
      </form>
      <br />
      <span>
        <i>
          Have an account?{" "}
          <a href="loginPage">
            {" "}
            <u>Login</u>
          </a>{" "}
          here
        </i>
      </span>
    </div>
  );
};

export default SignupPage;
