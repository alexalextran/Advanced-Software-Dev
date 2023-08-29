import { useRouter } from "next/router";
import { MdEmail } from "react-icons/md";
import { FaLock, FaUser } from "react-icons/fa6";
import { IconContext } from "react-icons";
import LoginField from "@/Components/LoginComponent";

// use router.push('/Dashboard') to go redirect user to dashboard after user auth

const SignupPage = () => {
  const router = useRouter();
  const signup = (event) => {
    event.preventDefault();
    // Get details from form
    var { email, password, username } = document.forms[0];
    // sign up logic
    // use email.value to get value of variable

    // Redirect to dashboard if valid
    // Todo: pass email to dashboard page
    router.replace("/Dashboard");
    // Redirect if not valid
  };

  return (
    <div className="formDiv">
      <h1>Sign up Here!</h1>
      <form onSubmit={signup}>
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
