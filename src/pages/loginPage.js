import { useRouter } from "next/router";
import { MdEmail } from "react-icons/md";
import { FaLock } from "react-icons/fa6";
import LoginField from "@/Components/LoginComponent";

// use router.push('/Dashboard') to go redirect user to dashboard after user auth

const LoginPage = () => {
  const router = useRouter();
  const login = (event) => {
    event.preventDefault();
    // Get details from form
    var { email, password } = document.forms[0];
    // Login logic
    // use email.value to get value of variable

    // Redirect to dashboard if valid
    // Todo: pass email to dashboard page
    router.replace("/Dashboard");
    // Redirect if not valid
  };

  return (
    <div className="formDiv">
      <h1>Login Here!</h1>
      <form onSubmit={login}>
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
        <button type="submit">Log in</button>
      </form>
      <br />
      <span>
        <i>
          Don&apos;t have an account?{" "}
          <a href="signupPage">
            <u>Sign up</u>
          </a>{" "}
          here
        </i>
      </span>
    </div>
  );
};

export default LoginPage;
