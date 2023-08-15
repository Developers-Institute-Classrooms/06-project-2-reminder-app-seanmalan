import React, { useState } from "react";

import { View, Text } from "react-native";
import { SwipeListView } from "react-native-swipe-list-view";
import { useEffect } from "react";
import TodoItem from "./components/TodoItem";
import TodoItemButtons from "./components/TodoItemButtons";
import AddTodo from "./components/AddTodo";
import { getStorage, updateStorage } from "./api/localStorage";
import DateTimePicker from "@react-native-community/datetimepicker";

export default function App() {
  const [listData, setListData] = useState([]);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [dateTimePickerMode, setDateTimePickerMode] = useState("date");
  const [taskName, setTaskName] = useState("");
  const [date, setDate] = useState(new Date());
  const [isEnabled, setIsEnabled] = useState(false);
  const [text, setText] = useState('Empty')
  
  
  

  console.log(`This is the ListData: ${listData}`)
  console.log(`This is the TaskName: ${taskName}`)
  console.log('taskName: ', taskName)

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
      timestamp: dateTime.toString(),
      key: new Date().getTime().toString(),
    });
    
    setListData(newData);
    // setDateTimePickerMode("date");
  };


const onChange = (event, selectedDate) => {
  const currentDate = selectedDate || date;
  setDate(currentDate);
  
  let tempDate = new Date(currentDate);
  let formattedDate = tempDate.getDate() + "/" + (tempDate.getMonth() + 1) + "/" + tempDate.getFullYear();
  let formattedTime = tempDate.getHours() + ":" + tempDate.getMinutes();

  setText(formattedDate + '\n' + formattedTime);
  console.log(formattedDate + '\n' + formattedTime);
  console.log(`Text: ${text}`)


}
  const datePickerMode = (currentMode) => {
    //setShowDatePicker(true);
    setIsEnabled(true);
    setDateTimePickerMode(currentMode);
  };

  // let isMounted = false;

  // useEffect(() => {
  //   isMounted = true;
  //   // console.warn("app mounted");
  //   return () => {
  //     isMounted = false;
  //   };
  // }, []);

  // const closeRow = (rowMap, key) => {
  //   if (rowMap[key]) {
  //     rowMap[key].closeRow();
  //   }
  // };

  const onRowDidOpen = (rowKey) => {
    console.log("This row opened", rowKey);
  };



  const add = (task) => {
    console.log(`Im inside setTask: ${task.toString()}`)
    setTaskName(task);
    setDate(new Date());
    setShowDatePicker(true);
  
    if (isEnabled) {
      setDateTimePickerMode("date");
    } else {
      setDateTimePickerMode("time");
    }
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
          text={text}
          onChange={onChange}
          show={isEnabled}
          date={date}
          mode={dateTimePickerMode}
          datePickerMode={datePickerMode}
        />

        <Text>{text}</Text>

        

        {/* <View>
        <Text>All Day</Text>
        <Switch
        trackColor={{false: '#767577', true: '#81b0ff'}}
        thumbColor={isEnabled ? '#f5dd4b' : '#f4f3f4'}
        ios_backgroundColor="#3e3e3e"
        onValueChange={toggleSwitch}
        value={isEnabled}
      />
        </View> */}





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
          value={new Date()}
          // @ts-ignore
          mode={dateTimePickerMode}
          onChange={(event, dateString) => {
            setShowDatePicker(false);
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
                const newDate = new Date(date);
                newDate.setHours(hours, minutes, seconds);
                setDate(newDate);
                addTask(new Date());
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
