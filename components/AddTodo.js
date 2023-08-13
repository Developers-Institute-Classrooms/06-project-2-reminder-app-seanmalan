import React, { useState } from "react";
import { TextInput, View, Button, StyleSheet } from "react-native";

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
const AddTodo = ({ add }) => {
  const [name, setName] = useState("");
  const newAdd = (n) => {
    newName(n.name);
  };
  const newAddName = (e) => {
    setName(e);
  };
  const newName = (a) => {
    newAddName(a);
  };
  const test = () => {
    console.log(name);
    add(name);
  };
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
      <Button title="Add" onPress={newAdd}></Button>
    </View>
  );
};

export default AddTodo;
