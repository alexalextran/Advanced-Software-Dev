import { useRouter } from "next/router";

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
    router.push("/Dashboard");
    // Redirect if not valid
  };

  return (
    <div>
      <h1>Login Here!</h1>
      <form onSubmit={login}>
        <label>Email: </label>
        <input type="email" name="email" required />
        <label>Password: </label>
        <input type="password" name="password" required />
        <button type="submit">Log in</button>
      </form>
    </div>
  );
};

export default LoginPage;
