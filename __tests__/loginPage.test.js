import "@testing-library/jest-dom";
import {
  fireEvent,
  render,
  screen,
  waitFor,
  act,
} from "@testing-library/react";
import LoginPage from "@/pages/loginPage";
import mockRouter from "next-router-mock";

jest.mock("next/router", () => jest.requireActual("next-router-mock"));

const TestLoginComponent = () => {
  return <LoginPage />;
};

describe("Render Login Page", () => {
  test("Correctly render login page", () => {
    mockRouter.push("/");
    render(<TestLoginComponent />);
    const emailInput = screen.getByPlaceholderText("Email");
    const passwordInput = screen.getByPlaceholderText("Password");
    const submitButton = screen.getByText("Log in");

    expect(emailInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
    expect(submitButton).toBeInTheDocument();
  });
});

describe("Attempt Login", () => {
  test("Attempt incorrect login", () => {
    mockRouter.push("/");
    const alertSpy = jest.spyOn(window, "alert").mockImplementation(() => {});
    render(<TestLoginComponent />);
    const emailInput = screen.getByPlaceholderText("Email");
    const passwordInput = screen.getByPlaceholderText("Password");
    const submitButton = screen.getByText("Log in");

    fireEvent.change(emailInput, {
      target: { value: "testing@unitTesting.com" },
    });
    fireEvent.change(passwordInput, { target: { value: "123123" } });
    fireEvent.click(submitButton);

    expect(emailInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
    expect(submitButton).toBeInTheDocument();
    expect(alertSpy).toHaveBeenCalledWith(
      "The email or password is incorrect."
    );
    alertSpy.mockRestore();
  });
});

describe("Redirect to signup page", () => {
  test("Redirect to signup page", () => {
    mockRouter.push("/");
    render(<TestLoginComponent />);
    const signupButton = screen.getByText("Sign up").closest("a");
    expect(signupButton).toHaveAttribute("href", "signupPage");
  });
});

// describe("Test Login Input", () => {
//   test("Test email input", () => {
//     mockRouter.push("/");
//     render(<TestLoginComponent />);
//     const emailInput = screen.getByPlaceholderText("Email");
//     fireEvent.change(emailInput, {
//       target: { value: "testing@example.com" },
//     });
//     expect(emailInput.value).toBe("testing@example.com");
//   });
// });
