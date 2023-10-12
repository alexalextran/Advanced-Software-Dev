import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import AdminLogOn from "../src/Components/adminLogOn";
      
describe("AdminLogOn Component", () => {
  it("displays an error message for invalid credentials", () => {
    const setAdminLoggedIn = jest.fn();
    const { container } = render(<AdminLogOn setadminLoggedIn={setAdminLoggedIn} />);

    const emailInput = screen.getByLabelText("Email:");
    const passwordInput = screen.getByLabelText("Password:");
    const loginButton = screen.getByText("Login");

    // Enter invalid admin credentials
    fireEvent.change(emailInput, { target: { value: "invalid@example.com" } });
    fireEvent.change(passwordInput, { target: { value: "wrongpassword" } });

    fireEvent.click(loginButton);

    // Verify that setAdminLoggedIn was not called
    expect(setAdminLoggedIn).not.toHaveBeenCalled();

    // Verify that an error message is present in the document
    const errorMessage = screen.getByText("Invalid credentials. Please try again.");
    expect(errorMessage).toBeTruthy();
  });
});
