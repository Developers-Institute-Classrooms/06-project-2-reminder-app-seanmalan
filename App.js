import React, { useState } from "react";
import { View, Text } from "react-native";
import { SwipeListView } from "react-native-swipe-list-view";
import { useEffect } from "react";
import TodoItem from "./components/TodoItem";
import TodoItemButtons from "./components/TodoItemButtons";
import AddTodo from "./components/AddTodo";
import { getStorage, updateStorage } from "./api/localStorage";
import DateTimePicker from "@react-native-community/datetimepicker";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function App() {
  const [listData, setListData] = useState([]);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [dateTimePickerMode, setDateTimePickerMode] = useState("date");
  const [taskName, setTaskName] = useState("");
  const [selectedDate, setSelectedDate] = useState(new Date());




  useEffect(() => {
    const fetchData = async () => {
      const storedData = await getStorage();
      setListData(storedData);
    };
    fetchData();
  }, []);



  // This is the AsyncStorage directly in the useEffect
  // useEffect(() => {
  //   const fetchData = async () => {
  //   try {
  //     const storedData = await AsyncStorage.getItem("reminder-list");
  //     if (storedData != null) {
  //       setListData(JSON.parse(storedData));
  //     }
  // } catch (error) {
  //     console.log(error);
  // }
  //   };
  //   fetchData();
  // }, []);



  useEffect(() => {
    const storeData = async (array) => {
      if (array.length > 0) {
        try {
          const jsonValue = JSON.stringify(array);
          await AsyncStorage.setItem("reminder-list", jsonValue);
          console.log("Data saved successfully")
        } catch (error) {
          console.log(error);
        }
      }
    };
    storeData(listData);
  }, [listData]);

// useEffect (() => {
//   const storeData = async (array) => {
//     if (array.length > 0) {
//       try {
//         //const jsonValue = JSON.stringify(array);
//         await updateStorage(array);
//         console.log("Data saved successfully")
//       } catch (error) {
//         console.log(error);
//       }
//     }
//   };
//   storeData(listData);
// }, [listData]);
  



  console.log("List Data:");
listData.forEach(item => {
  console.log("Name:", item.name);
  console.log("Timestamp:", item.timestamp);
  console.log("Key:", item.key);
});


  const addTask = (dateTime) => {
    const newData = [...listData];
    newData.push({
      name: taskName,
      timestamp: dateTime,
      key: new Date().getTime().toString(),
    });
    
    setListData(newData);
    setDateTimePickerMode("date");
  };

  // const datePickerMode = (currentMode) => {
  //   setShowDatePicker(true);
  //   setDateTimePickerMode(currentMode);
  // };

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
    console.log(`Im inside setTask: ${task.toString()}`)
    setTaskName(task);
    setSelectedDate(new Date());
    setShowDatePicker(true);
  };




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
            fontSize: 20,
          }}
        >
          Reminders
        </Text>
        <AddTodo
          AddTodo={add}
        />
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
            rightOpenValue={-130}
            previewRowKey={"0"}
            previewOpenValue={-40}
            previewOpenDelay={3000}
            onRowDidOpen={onRowDidOpen}
          />
        </View>
      </View>

      {showDatePicker ? (
  <DateTimePicker
    testID="dateTimePicker"
    value={selectedDate} // Use selectedDate here
    mode={dateTimePickerMode}
    onChange={(event, selectedDate) => {
      setShowDatePicker(false);
      if (selectedDate) {
        if (dateTimePickerMode === "date") {
          setSelectedDate(selectedDate);
          setDateTimePickerMode("time");
          setShowDatePicker(true);
        } else if (dateTimePickerMode === "time") {
          const newDate = new Date(parseInt(selectedDate));
          addTask(newDate); // Pass the selectedDate directly
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
