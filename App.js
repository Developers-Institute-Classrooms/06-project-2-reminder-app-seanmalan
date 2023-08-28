import { React, useState, useEffect } from "react";
import { View, Text, SafeAreaView, Dimensions } from "react-native";
import { SwipeListView } from "react-native-swipe-list-view";
import TodoItem from "./components/TodoItem";
import TodoItemButtons from "./components/TodoItemButtons";
import AddTodo from "./components/AddTodo";
import { getStorage, updateStorage } from "./api/localStorage";
import DateTimePicker from "@react-native-community/datetimepicker";
import FingerprintScanner from "react-native-fingerprint-scanner";
import * as LocalAuthentication from "expo-local-authentication";
import * as Notifications from "expo-notifications";
import {
  registerForPushNotificationsAsync,
  schedulePushNotification,
} from "./api/notification";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

export default function App() {
  const [listData, setListData] = useState([]);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [dateTimePickerMode, setDateTimePickerMode] = useState("date");
  const [taskName, setTaskName] = useState("");
  const [date, setDate] = useState(new Date());
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [deviceHeight, setDeviceHeight] = useState(0);
  const [deviceWidth, setDeviceWidth] = useState(0);
  

  useEffect(() => {
    registerForPushNotificationsAsync();
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
      getStorage(setListData);
    }
  }, [isAuthenticated]);

  useEffect(() => {
    if (isAuthenticated) {
      updateStorage(listData);
    }
  }, [listData, isAuthenticated]);


  useEffect(() => {
    const newDeviceHeight = () => Dimensions.get("window").height;
    const newDeviceWidth = () => Dimensions.get("window").width;

    setDeviceHeight(newDeviceHeight);
    setDeviceWidth(newDeviceWidth);

    Dimensions.addEventListener("change", () => {
      setDeviceHeight(newDeviceHeight);
      setDeviceWidth(newDeviceWidth);
    }
    );

    return () => {
      Dimensions.removeEventListener("change", () => {
        setDeviceHeight(newDeviceHeight);
        setDeviceWidth(newDeviceWidth);
      });
    }
  }, []);

  console.log(deviceHeight, deviceWidth)

  const addTask = (dateTime) => {
    try {

      const newData = [...listData];
      newData.push({
        name: taskName,
        timestamp: dateTime.toString(),
        key: new Date().getTime().toString(),
      });
      
      setListData(newData);
      setDateTimePickerMode("date");
      schedulePushNotification(taskName, dateTime);
    } catch (error) {
      console.log("Error adding task", error);
    }
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
    try {

      if (task === null || task === "") {
        return;
      }
      setTaskName(task);
      setDate(new Date());
      setShowDatePicker(true);
    } catch (error) {
      console.log("Error adding task", error);
    }
  };

  const deleteTask = (key) => {
    const newData = [...listData];
    const i = newData.findIndex((item) => item.key === key);
    newData.splice(i, 1);
    setListData(newData);
  };

  useEffect(() => {
    return () => {
      FingerprintScanner.release();
    };
  }, []);

  return (
    <SafeAreaView style={{ height: deviceHeight, width: deviceWidth }}>
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
                  deleteTask(data.item.key);
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
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
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
      ) : null}
    </SafeAreaView>
  );
}
