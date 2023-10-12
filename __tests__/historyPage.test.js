import "@testing-library/jest-dom";
import React from "react";
import {
  fireEvent,
  render,
  screen,
  waitFor,
  act,
} from "@testing-library/react";
import ChatHistory from "@/pages/history";
import mockRouter from "next-router-mock";

jest.mock("next/router", () => jest.requireActual("next-router-mock"));

const TestChatHistoryComponent = () => {
  return <ChatHistory />;
};

describe("Render Chat History Page", () => {
  test("Correctly render chat history page", () => {
    mockRouter.push("/history");
    jest.spyOn(React, "useEffect").mockImplementation((f) => f());
    render(<TestChatHistoryComponent />);
    const interviewQuestionPara = screen.getByText("Interview Question");

    expect(interviewQuestionPara).toBeInTheDocument();
  });
});
