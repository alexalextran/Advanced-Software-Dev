import { useRouter } from "next/router";
import { BsFillPersonFill, BsLockFill } from "react-icons/bs";
import { IconContext } from "react-icons";

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
        <div className="inputFieldWithIcon">
          <IconContext.Provider
            value={{ size: "2em", className: "loginIconStyle" }}
          >
            <BsFillPersonFill />
          </IconContext.Provider>
          <input type="email" name="email" placeholder="Email" required />
        </div>
        <div className="inputFieldWithIcon">
          <IconContext.Provider
            value={{ size: "2em", className: "loginIconStyle" }}
          >
            <BsLockFill />
          </IconContext.Provider>
          <input
            type="password"
            name="password"
            placeholder="Password"
            required
          />
        </div>
        <br />
        <button type="submit">Log in</button>
      </form>
      <br />
      <span>
        <i>Don&apos;t have an account? Sign up here</i>
      </span>
    </div>
  );
};

export default LoginPage;
