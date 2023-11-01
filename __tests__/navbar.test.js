import "@testing-library/jest-dom";
import React, { useState as useStateMock } from "react";
import {
  fireEvent,
  render,
  screen,
  waitFor,
  act,
} from "@testing-library/react";
import ChatHistory from "@/pages/history";
import mockRouter from "next-router-mock";
import { AuthContextProvider } from "../context/AuthContext";
import Navigation from "@/pages/navigation";

jest.mock("next/router", () => jest.requireActual("next-router-mock"));

const TestNavbar = () => {
  return <Navigation />;
};

describe("Render Navbar", () => {
  test("Correctly render navbar", () => {
    mockRouter.push("/Dashboard");
    render(<TestNavbar />);
    const dashboardLink = screen.getByText("Dashboard");
    const historyLink = screen.getByText("History");
    const profileLink = screen.getByText("Profile");
    const adminLink = screen.getByText("Admin");

    expect(dashboardLink).toBeInTheDocument();
    expect(historyLink).toBeInTheDocument();
    expect(profileLink).toBeInTheDocument();
    expect(adminLink).toBeInTheDocument();
  });
});
