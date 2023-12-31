import "@testing-library/jest-dom";
import React from "react";

import {
  fireEvent,
  render,
  screen,
  waitFor,
  act,
} from "@testing-library/react";
import Analytics from "@/pages/analytics";
import mockRouter from "next-router-mock";

// Mock the retrieveAnalytics function
const mockRetrieveAnalytics = jest.fn();

jest.mock("next/router", () => jest.requireActual("next-router-mock"));

const TestAnalyticsComponent = () => {
  return <Analytics retrieveAnalytics={mockRetrieveAnalytics} />;
};

jest.mock('../context/AuthContext', () => ({
  useAuth: () => ({
    retrieveAnalytics: jest.fn(),
  }),
}));

describe("Render Analytics Page", () => {
  test("Correctly render analytics page", () => {
    mockRouter.push("/analytics");
    jest.spyOn(React, "useEffect").mockImplementation((f) => f());
    render(<TestAnalyticsComponent />);
    const confidenceLabel = screen.getByText("Word Count");
    const coherenceLabel = screen.getByText("Estimated Speaking Time");
    const professionalismLabel = screen.getByText("Response Length");


    expect(confidenceLabel).toBeInTheDocument();
    expect(coherenceLabel).toBeInTheDocument();
    expect(professionalismLabel).toBeInTheDocument();
    
  });
});