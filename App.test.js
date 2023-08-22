import React from "react";
import { render, screen, waitFor, fireEvent } from "@testing-library/react-native";
import App from "./App";
import * as LocalAuthentication from 'expo-local-authentication';
import DateTimePicker from 'react-native-modal-datetime-picker';



describe("App", () => {
  test("that unauthenticated users are locked out", () => {
    // Mock failed authentication
    LocalAuthentication.authenticateAsync = jest.fn(() => Promise.resolve({ success: false }));
    
    // Render the component
    render(<App />);
    
    // Check if the "Reminders" text is in the rendered component
    const reminderApp = screen.queryByText("Reminders");
    expect(reminderApp).toBeNull();

    const unauthenticatedScreen = screen.getByText("Please authenticate yourself");
    expect(unauthenticatedScreen).toBeTruthy();
  }); // Add the closing parenthesis here
})




describe('App', () => {
  test('should render successfully after successful authentication', async () => {
    LocalAuthentication.authenticateAsync = jest.fn(() => Promise.resolve({ success: true }));
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
  });


  test("should render the section where the user can enter a task name but the add button should not be showing.", async () => {
    // Render your component
    const { queryByTestId, getByText, getByPlaceholderText } = render(<App />);
    
    // Wait for any asynchronous actions to complete (e.g., authentication)
    await waitFor(() => {});

    // Expect the component to render some content that confirms successful authentication

    expect(getByText("Reminders")).toBeTruthy();
    expect(getByPlaceholderText("Enter task name...")).toBeTruthy();

    // expect the button to be showing
    expect(queryByTestId("AddButton")).not.toBeTruthy();
  });


  test("should render the section where the user can enter a task name and after characters have been entered the button appears.", async () => {
    // Render your component
    const { getByTestId, getByText, getByPlaceholderText } = render(<App />);
    
    // Wait for any asynchronous actions to complete (e.g., authentication)
    await waitFor(() => {});

    // Expect the component to render some content that confirms successful authentication

    expect(getByText("Reminders")).toBeTruthy();
    expect(getByPlaceholderText("Enter task name...")).toBeTruthy();
    
    // have the user click on the text input and enter a task name

    const textInput = getByPlaceholderText("Enter task name...");
    
    fireEvent.changeText(textInput, "test task");

    // expect the button to be showing
    expect(getByTestId("AddButton")).toBeTruthy();
  });

  // test('Deleting a task', async () => {
  //   const initialListData = [
  //     {
  //       name: 'Reminder 1',
  //       timestamp: new Date().toString(),
  //       key: '1',
  //     },
  //     {
  //       name: 'Reminder 2',
  //       timestamp: new Date().toString(),
  //       key: '2',
  //     },
  //     {
  //       name: 'Reminder 3',
  //       timestamp: new Date().toString(),
  //       key: '3',
  //     },
  //   ];
  
  //   const { getByTestId, queryByText } = render(<App />, {
  //     initialState: { listData: initialListData },
  //   });

  //   await waitFor(() => {});
  
  //   // test the items are being displayed

  //   expect(queryByText('Reminder 1')).toBeTruthy();
  //   expect(queryByText('Reminder 2')).toBeTruthy();
  //   expect(queryByText('Reminder 3')).toBeTruthy();

  //   // test that the user has swiped the second item and clicked the delete button

  //   // Swipe the second reminder (Reminder 2)
  //   fireEvent(getByTestId('2'), 'onSwipeableRightOpen');
  
  //   // Click the "Delete" button for the second reminder (Reminder 2)
  //   fireEvent(getByTestId('delete'), 'onPress');
  
  //   // Check if the reminder was deleted
  //   expect(queryByText('Reminder 2')).toBeNull();
  //   expect(queryByText('Reminder 1')).toBeTruthy();
  //   expect(queryByText('Reminder 3')).toBeTruthy();
  // });

  // test('Adding a task with specific date and time', async () => {
  //   const initialListData = [
  //     {
  //       name: 'Reminder 1',
  //       timestamp: new Date().toString(),
  //       key: '1',
  //     },
  //     {
  //       name: 'Reminder 2',
  //       timestamp: new Date().toString(),
  //       key: '2',
  //     },
  //     {
  //       name: 'Reminder 3',
  //       timestamp: new Date().toString(),
  //       key: '3',
  //     },
  //   ];
  
  //   const { getByPlaceholderText, getByTestId, getByText } = render(
  //     <App />,
  //     { initialState: { listData: initialListData } }
  //   );
  
  //   // Authenticate the user
  //   await waitFor(() => expect(getByText('Please authenticate yourself')).toBeTruthy());
  
  
  //   // Add a task
  //   fireEvent(getByPlaceholderText('Enter task name...'), 'onChangeText', 'My New Task');
  
  //   // Open the date and time picker
  //   fireEvent(getByTestId('AddButton'), 'onSubmitEditing');

  //   // mock the date and time picker


    
  
  //   // Select date (August 30)
  //   fireEvent(getByTestId('dateTimePicker'), 'onChange', {}, new Date(2023, 7, 30));
  
  //   // Select time (1:30 PM)
  //   fireEvent(getByTestId('dateTimePicker'), 'onChange', {}, new Date(2023, 7, 30, 13, 30));
  
  //   // Click the "OK" button to confirm the date and time
  //   fireEvent(getByText('OK'), 'onPress');
  
  //   // Click the "Add Task" button
  //   fireEvent(getByText('Add Task'), 'onPress');
  
  //   // You can now add assertions here to check if the task was added with the specific date and time
  // });

  test('Adding a task with specific date and time', async () => {
    const { getByPlaceholderText, getByText, queryByTestId } = render(<App />);
  
    
    await waitFor(() => {});
  

    // Add a task
    fireEvent(getByPlaceholderText('Enter task'), 'onChangeText', 'My New Task');
  
    // Open the date and time picker
    fireEvent(getByPlaceholderText('Enter task'), 'onSubmitEditing');
  
    // Select date (August 30) and time (1:30 PM)
    const datePicker = getByTestId('date-picker'); // Adjust this to your actual date picker's test ID
    const timePicker = getByTestId('time-picker'); // Adjust this to your actual time picker's test ID
  
    fireEvent(datePicker, 'onConfirm', new Date(2023, 7, 30));
    fireEvent(timePicker, 'onConfirm', new Date(2023, 7, 30, 13, 30));
  
    // Click the "Add Task" button
    fireEvent(getByText('Add Task'), 'onPress');
  
    // You can now add assertions here to check if the task was added with the specific date and time
  });
  
});


