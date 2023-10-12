import "@testing-library/jest-dom";
import {
    fireEvent,
    render,
    screen,
} from "@testing-library/react";
import OpenAI from "@/pages/openai";

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