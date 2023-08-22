import React from "react";
import { render, screen, fireEvent } from "@testing-library/react-native";
import App from "./App";


describe("App", () => {
  test("renders App component", () => {
    render(<App />);


    const reminderApp = screen.getByText("Reminders");
    expect(reminderApp).toBeTruthy();
  }
  );
}
);


