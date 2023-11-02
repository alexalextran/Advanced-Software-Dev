import "@testing-library/jest-dom";
import {
    fireEvent,
    render,
    screen,
} from "@testing-library/react";
import OpenAI from "@/pages/openai";
import mockRouter from "next-router-mock";

// Mock the retrieveAnalytics function
const mockAddAanalyticsDB = jest.fn();

jest.mock("next/router", () => jest.requireActual("next-router-mock"));

const TestAnalyticsComponent = () => {
    return <OpenAI addAanalyticsDB={mockAddAanalyticsDB} />;
};

jest.mock('../context/AuthContext', () => ({
    useAuth: () => ({
        addAanalyticsDB: jest.fn(),
    }),
}));



test("send button is disabled when there is no text in the textfield", () => {
    render(<OpenAI />);
    const sendButton = screen.getByText("Send");
    expect(sendButton).toBeDisabled();
});

test("send button is disabled after clicking the send button", async () => {
    render(<OpenAI />);
    const inputValue = screen.getByPlaceholderText("Enter Response Here");
    const sendButton = screen.getByText("Send");
    fireEvent.change(inputValue, { target: { value: "This is a test response." } });
    fireEvent.click(sendButton);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    expect(sendButton).toBeDisabled();
});

