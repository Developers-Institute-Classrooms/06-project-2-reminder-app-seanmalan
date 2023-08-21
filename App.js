import { React, useState, useEffect } from "react";
import { View, Text, TouchableOpacity, Alert, SafeAreaView } from "react-native";
import { SwipeListView } from "react-native-swipe-list-view";
import TodoItem from "./components/TodoItem";
import TodoItemButtons from "./components/TodoItemButtons";
import AddTodo from "./components/AddTodo";
import { getStorage, updateStorage } from "./api/LocalStorage";
import DateTimePicker from "@react-native-community/datetimepicker";
import AsyncStorage from "@react-native-async-storage/async-storage";
import FingerprintScanner from "react-native-fingerprint-scanner";
import * as LocalAuthentication from "expo-local-authentication";
import { setNotification } from "./api/notification";



export default function App() {
  const [listData, setListData] = useState([]);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [dateTimePickerMode, setDateTimePickerMode] = useState("date");
  const [taskName, setTaskName] = useState("");
  const [date, setDate] = useState(new Date());
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    registerForPushNotificationsAsync()
  }, []);


  useEffect(() => {
    async function authenticate() {
      try {
        const result = await LocalAuthentication.authenticateAsync();
        if (result.success) {
          setIsAuthenticated(true);
        } else {
          setIsAuthenticated(false);
        }
      } catch (error) {
        console.error("Error during authentication:", error);
        setIsAuthenticated(false);
      }
    }
  
    authenticate();
  }, []);
  




  useEffect(() => {
    if (isAuthenticated) {
    const getData = async () => {
      try {
        const jsonValue = await AsyncStorage.getItem("reminder-list");
        if (jsonValue !== null) {
          setListData(JSON.parse(jsonValue));
        }
      } catch (error) {
        console.log(error);
      }
    };
    getData();
  }
  }, [isAuthenticated]);



  useEffect(() => {
    if (isAuthenticated) {
    const storeData = async (array) => {
      if (array.length > 0) {
        try {
          const jsonValue = JSON.stringify(array);
          await AsyncStorage.setItem("reminder-list", jsonValue);
          console.log("Data saved successfully");
        } catch (error) {
          console.log(error);
        }
      }
    };
    storeData(listData);
  }
  }, [listData, isAuthenticated]);


  
  const addTask = (dateTime) => {
    const newData = [...listData];
    newData.push({
      name: taskName,
      timestamp: dateTime.toString(),
      key: new Date().getTime().toString(),
    });

    setListData(newData);
    setDateTimePickerMode("date");
    setNotification({
      timestamp: date,
      title: taskName,
      body: "Reminder",
    });
  };



  const closeRow = (rowMap, key) => {
    if (rowMap[key]) {
      rowMap[key].closeRow();
    }
  };

  const onRowDidOpen = (rowKey) => {
    console.log("This row opened", rowKey);
  };

  const add = (task) => {
    if (task === null || task === "") {
      return;
    }
    setTaskName(task);
    setDate(new Date());
    setShowDatePicker(true);
  };

  

  useEffect(() => {
    return () => {
      FingerprintScanner.release();
    };
  }, []);

  return (

    <View style={{ height: "100%" }}>
    {isAuthenticated ? (
      <View
        style={{
          flex: 1,
          flexDirection: "column",
          justifyContent: "space-around",
          marginTop: 50,
          height: "100%",
        }}
      >
        <Text
          style={{
            textAlign: "center",
            fontSize: 26,
            marginBottom: 20,
          }}
        >
          Reminders
        </Text>
        <View
          style={{
            backgroundColor: "white",
            flex: 1,
          }}
        >
          
          <SwipeListView
            data={listData}
            renderItem={({ item }) => <TodoItem item={item} />}
            renderHiddenItem={(data, rowMap) =>
              TodoItemButtons(data, rowMap, (rowMap, deleteThis) => {
                // TIP: deletes a task/row
                closeRow(rowMap, deleteThis);
                const newData = [...listData];
                const i = newData.findIndex((rowItem) => rowItem.key === 0);
                newData.splice(i, 1);
                setListData(newData);
              })
            }
            rightOpenValue={-100}
            previewRowKey={"0"}
            previewOpenValue={-40}
            previewOpenDelay={3000}
            onRowDidOpen={onRowDidOpen}
          />

          <View>
            <AddTodo AddTodo={add} />
          </View>
        </View>
      </View>
      ) : (
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
    <Text>Please authenticate yourself</Text>
  </View>
      )}

      {showDatePicker ? (
        <DateTimePicker
          testID="dateTimePicker"
          value={date}
          // @ts-ignore
          mode={dateTimePickerMode}
          onChange={(event, dateString) => {
            setShowDatePicker(false);
            if (event.type === "dismissed") {
              return;
            }

            if (dateString) {
              if (dateTimePickerMode === "date") {
                const date = new Date(dateString) || new Date();
                setDate(date);
                setDateTimePickerMode("time");
                setShowDatePicker(true);
              } else if (dateTimePickerMode === "time") {
                const time = new Date(dateString) || new Date();
                const hours = time.getHours();
                const minutes = time.getMinutes();
                const seconds = 0;
                const updatedDate = new Date(date);
                updatedDate.setHours(hours, minutes, seconds);
                setDate(updatedDate);
                addTask(updatedDate);
              }
            } else {
              setDateTimePickerMode("date");
            }
          }}
          />
          ) : null
        }
            
    </View>


  );
}
