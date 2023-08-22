import React from "react";
import { render, screen, waitFor } from "@testing-library/react-native";
import App from "./App";
import * as LocalAuthentication from 'expo-local-authentication';



// describe("App", () => {
//   test("that unauthenticated users are locked out", () => {
//     // Mock failed authentication
//     LocalAuthentication.authenticateAsync = jest.fn(() => Promise.resolve({ success: false }));
    
//     // Render the component
//     render(<App />);
    
//     // Check if the "Reminders" text is in the rendered component
//     const reminderApp = screen.queryByText("Reminders");
//     expect(reminderApp).toBeNull();

//     const unauthenticatedScreen = screen.getByText("Please authenticate yourself");
//     expect(unauthenticatedScreen).toBeTruthy();
//   }); // Add the closing parenthesis here
// })




describe('App', () => {
  test('should render successfully after successful authentication', async () => {
    // Render your component
    const { getByText } = render(<App />);
    
    // Wait for any asynchronous actions to complete (e.g., authentication)
    await waitFor(() => {});

    // Expect the component to render some content that confirms successful authentication
    expect(getByText('Reminders')).toBeTruthy();
  });

  test("should render the section where the user can enter a task name", async () => {
    // Render your component
    const { getByPlaceholderText } = render(<App />);
    
    // Wait for any asynchronous actions to complete (e.g., authentication)
    await waitFor(() => {});

    // Expect the component to render some content that confirms successful authentication
    expect(getByPlaceholderText("Enter task name...")).toBeTruthy();
  }
  );

  test("should render the section where the user can enter a task name but the button should not be showing", async () => {
    // Render your component
    const { getByPlaceholderText } = render(<App />);
    
    // Wait for any asynchronous actions to complete (e.g., authentication)
    await waitFor(() => {});

    // Expect the component to render some content that confirms successful authentication
    expect(getByPlaceholderText("Enter task name...")).toBeTruthy();
    expect()
  }
  );

  // test("should not render the Add button when no task has been entered", async () => {
  //   const { button } = render(<App />)

  //   await waitFor(() => {})

  //   expect(getByTestId(AddButton)).Not.toBeTruthy()
  // })
});


