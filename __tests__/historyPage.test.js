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

jest.mock("next/router", () => jest.requireActual("next-router-mock"));

const TestChatHistoryComponent = () => {
  return (
    <AuthContextProvider>
      <ChatHistory />
    </AuthContextProvider>
  );
};

describe("Render Chat History Page", () => {
  test("Correctly render chat history page", () => {
    mockRouter.push("/history");
    const dumb = () => jest.fn();
    jest.spyOn(React, "useEffect").mockImplementation(dumb);
    render(<TestChatHistoryComponent />);
    const chatHistoryHeader = screen.getByText("Chat History");

    expect(chatHistoryHeader).toBeInTheDocument();
  });
});
