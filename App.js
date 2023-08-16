import { React, useState, useEffect } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { SwipeListView } from "react-native-swipe-list-view";
import TodoItem from "./components/TodoItem";
import TodoItemButtons from "./components/TodoItemButtons";
import AddTodo from "./components/AddTodo";
import { getStorage, updateStorage } from "./api/localStorage";
import DateTimePicker from "@react-native-community/datetimepicker";
import AsyncStorage from "@react-native-async-storage/async-storage";
import FingerprintScanner from "react-native-fingerprint-scanner";
import * as LocalAuthentication from "expo-local-authentication";

export default function App() {
  const [listData, setListData] = useState([]);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [dateTimePickerMode, setDateTimePickerMode] = useState("date");
  const [taskName, setTaskName] = useState("");
  const [date, setDate] = useState(new Date());
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);



  useEffect(() => {
    async function authenticate() {
      const result = LocalAuthentication.authenticateAsync()
      setIsAuthenticated(result.success)
  }
  authenticate();
}, []);



if (!isAuthenticated) {

  const handleFingerprintAuth = async () => {
    try {
      await FingerprintScanner.authenticate({
        title: 'Fingerprint Authentication',
        description: 'Place your finger on the sensor to authenticate.',
      });
      // Authentication successful
      setErrorMessage(null);
    } catch (error) {
      // Authentication failed
      setErrorMessage('Fingerprint authentication failed.');
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>It appears you have not been authenticated.</Text>

    <TouchableOpacity onPress={handleFingerprintAuth}>
        <Text>Authenticate with Fingerprint</Text>
      </TouchableOpacity>
    </View>
  );
}


  useEffect(() => {
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
  }, []);

  useEffect(() => {
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
  }, [listData]);

  const addTask = (dateTime) => {
    const newData = [...listData];
    newData.push({
      name: taskName,
      timestamp: dateTime.toString(),
      key: new Date().getTime().toString(),
    });

    setListData(newData);
    setDateTimePickerMode("date");
  };

  // let isMounted = false;

  // useEffect(() => {
  //   isMounted = true;
  //   // console.warn("app mounted");
  //   return () => {
  //     isMounted = false;
  //   };
  // }, []);


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
    </View>
  );
}
