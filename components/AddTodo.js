
import DateTimePicker from "@react-native-community/datetimepicker";
import React, { useState } from "react";
import { TextInput, View, Button, StyleSheet, Text, TouchableOpacity } from "react-native";

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: 40,
    flexDirection: "row",
  },
  newContainer: { flexGrow: 1 },
  text: { width: "100%", height: "100%" },
});

// TIP: this component has bad naming that creates confusion
const AddTodo = ({ AddTodo, text, onChange, show, datePickerMode, date }) => {
  const [name, setName] = useState("");

  console.log(`AddTodo name: ${name}`);

  // const newAdd = (n) => {
  //   newName(n.name);
  // };

  const newAddName = (e) => {
    setName(e);
  };

  const newName = (a) => {
    newAddName(a);
  };

  // const test = () => {
  //   console.log(name);
  //   add(name);
  // };

  return (
    <View style={styles.container}>
      <View style={styles.newContainer}>
        <TextInput
          placeholder="Enter task name..."
          style={styles.text}
          value={name}
          onChangeText={(e) => newAddName(e)}
        ></TextInput>
      </View>

      <View>
        <Text>{text}</Text>
      </View>

    <TouchableOpacity title="DatePicker" onPress={() => datePickerMode("date")}>
      <Text>Date:</Text>
    </TouchableOpacity>
    <TouchableOpacity title="TimePicker" onPress={() => datePickerMode("time")}>
      <Text>Time:</Text>
    </TouchableOpacity>

    {show && (<DateTimePicker value={date} mode={datePickerMode} is24Hour={true} display="default" onChange={onChange} />)}

      {/* <Button title="Add" onPress={newAdd}></Button> */}
      <Button title="Add" onPress={() => AddTodo(name.toString())}></Button>
    </View>
  );
};

export default AddTodo;
