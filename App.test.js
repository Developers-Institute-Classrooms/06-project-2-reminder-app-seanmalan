import React from "react";
import { render, screen, waitFor, fireEvent } from "@testing-library/react-native";
import App from "./App";
import "@testing-library/jest-native/extend-expect";
import * as LocalAuthentication from 'expo-local-authentication';
import AsyncStorage from '@react-native-async-storage/async-storage';
import DateTimePicker from "@react-native-community/datetimepicker";


jest.mock('@react-native-async-storage/async-storage');
// jest.mock('@react-native-community/datetimepicker', () => jest.fn());
// DateTimePicker.mockImplementation((props) => (
//   <Input testID={props.testID} onFocus={() => props.onChange} />
// ));

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

  test('Deleting a task', async () => {
    
    // Mock the AsyncStorage functions and get the initial list data

    const initialListData = [
      {
        name: 'Reminder 1',
        timestamp: new Date().toString(),
        key: '1',
      },
      {
        name: 'Reminder 2',
        timestamp: new Date().toString(),
        key: '2',
      },
      {
        name: 'Reminder 3',
        timestamp: new Date().toString(),
        key: '3',
      },
    ];
  
    const { getByTestId, queryByText } = render(<App />);

    AsyncStorage.getItem = jest.fn(() => JSON.stringify(initialListData));


    await waitFor(() => {});
  
    // test the items are being displayed

    expect(queryByText('Reminder 1')).toBeTruthy();
    expect(queryByText('Reminder 2')).toBeTruthy();
    expect(queryByText('Reminder 3')).toBeTruthy();

 
    // test that the user has swiped the second item and clicked the delete button

    // Swipe the second reminder (Reminder 2)
    fireEvent(getByTestId('delete2'), 'onSwipeableRightOpen');
  
    // Click the "Delete" button for the second reminder (Reminder 2)
    fireEvent.press(getByTestId('delete2'));
  
    // Check if the reminder was deleted
    expect(queryByText('Reminder 2')).toBeNull();
    expect(queryByText('Reminder 1')).toBeTruthy();
    expect(queryByText('Reminder 3')).toBeTruthy();
  });


  const createDateTimeSetEvtParams = (date) => {
    return [
      {
        type: "set",
        nativeEvent: {
          timestamp: date.getTime(),
        },
      },
      date,
    ];
  };


  

  test('Adding a task with specific date and time', async () => {
    const initialListData = [
      {
        name: 'Reminder 1',
        timestamp: new Date().toString(),
        key: '1',
      },
      {
        name: 'Reminder 2',
        timestamp: new Date().toString(),
        key: '2',
      },
      {
        name: 'Reminder 3',
        timestamp: new Date().toString(),
        key: '3',
      },
    ];

    
  
    const { getByPlaceholderText, getByTestId, queryByText, UNSAFE_getByType, queryAllByTestId } = render(<App />)
  
    AsyncStorage.getItem = jest.fn(() => JSON.stringify(initialListData));

    await waitFor(() => {});

    expect(queryByText('Reminder 1')).toBeTruthy();
    expect(queryByText('Reminder 2')).toBeTruthy();
    expect(queryByText('Reminder 3')).toBeTruthy();


    // Add a task
    fireEvent(getByPlaceholderText('Enter task name...'), 'onChangeText', 'My New Task');
  
    // Open the date and time picker
    const addTaskButton = getByTestId('AddButton');
    fireEvent.press(addTaskButton);

    

    const dateTimePicker = UNSAFE_getByType(DateTimePicker);
  expect(dateTimePicker).toBeOnTheScreen();


  const date = new Date(2023, 7, 30);
  const time = new Date(2023, 7, 30, 13, 30);



  fireEvent(dateTimePicker, 'onChange', ...createDateTimeSetEvtParams(date));
  fireEvent(dateTimePicker, 'onChange', ...createDateTimeSetEvtParams(time));


  const finalListData = [
    {
      name: 'Reminder 1',
      timestamp: new Date().toString(),
      key: '1',
    },
    {
      name: 'Reminder 2',
      timestamp: new Date().toString(),
      key: '2',
    },
    {
      name: 'Reminder 3',
      timestamp: new Date().toString(),
      key: '3',
    },
    {
      name: 'My New Task',
      timestamp: time.toString(),
      key: '4',
    }
  ]

    // Expect the new task to be on the screen
    expect(queryByText('Reminder 1')).toBeTruthy();
    expect(queryByText('Reminder 2')).toBeTruthy();
    expect(queryByText('Reminder 3')).toBeTruthy();
    expect(queryByText('My New Task')).toBeTruthy();
    expect(queryAllByTestId('taskDate')).toBeTruthy();
    expect(queryAllByTestId('taskDate')).toHaveLength(4);
    expect(queryAllByTestId('taskDate')[3]).toHaveTextContent('30 Aug, 1:30:00 pm');
    


    // expect(finalListData).toEqual(expect.arrayContaining(initialListData));


  });


  test("selected due date should be correct", async () => {
    
    const { getByPlaceholderText, getByTestId, queryByText, UNSAFE_getByType, queryByTestId } = render(<App />)
  
    AsyncStorage.getItem = jest.fn(() => JSON.stringify(initialListData));

    await waitFor(() => {});



    // Add a task
    fireEvent(getByPlaceholderText('Enter task name...'), 'onChangeText', 'Due Date Test');
  
    // Open the date and time picker
    const addTaskButton = getByTestId('AddButton');
    fireEvent.press(addTaskButton);

    

    const dateTimePicker = UNSAFE_getByType(DateTimePicker);
  expect(dateTimePicker).toBeOnTheScreen();


  // for some reason the date picker is one month out. I suspect its 0 indexed. Having tried it on the 12th month it says Jan and any other month is one behind. If I chooose 8th month which is Aug I get September.  0 gets Jan.
  const date = new Date(2023, 7, 30);
  const time = new Date(2023, 7, 30, 13, 30);



  fireEvent(dateTimePicker, 'onChange', ...createDateTimeSetEvtParams(date));
  fireEvent(dateTimePicker, 'onChange', ...createDateTimeSetEvtParams(time));


    // Expect the new task to be on the screen
    expect(queryByText('Due Date Test')).toBeTruthy();
    expect(queryByTestId('taskDate')).toBeTruthy();
    expect(queryByTestId('taskDate')).toHaveTextContent('30 Aug, 1:30:00 pm');

    // I will leave a console.log with time in so you can see that it does show the correct date I want just one month out.

    console.log(time)
  });
});


