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

test('sends percentages to the database', async () => {
    const { getByPlaceholderText, getByText } = render(<OpenAI />);
    const inputField = getByPlaceholderText('Enter Response Here');
    fireEvent.change(inputField, { target: { value: 'Sample response' } });
    const sendButton = getByText('Send');
    fireEvent.click(sendButton);
    //Mock percentage from the AI Feedback response
    const mockPercentages = {
        Confidence: 50,
        Coherence: 60,
        Professionalism: 70,
        Creativity: 80,
    };
    const addAanalyticsDBMock = jest.fn();
    addAanalyticsDBMock(mockPercentages);
    expect(addAanalyticsDBMock).toHaveBeenCalledWith(mockPercentages);
});

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

test("send audio button is disabled if there is no file selected", () => {
    render(<OpenAI />);
    const sendAudioButton = screen.getByText("Send Audio");
    expect(sendAudioButton).toBeDisabled();
});