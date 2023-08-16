import React, { useState } from "react";
import { TextInput, View, Button, StyleSheet, TouchableOpacity, Text } from "react-native";

// TIP: this component has bad naming that creates confusion
const AddTodo = ({ AddTodo }) => {
  const [name, setName] = useState("");

  console.log(`AddTodo name: ${name}`);

  const newAddName = (e) => {
    setName(e);
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

      {name.length > 0 && (
      <TouchableOpacity title="Add" onPress={() => AddTodo(name.toString())} style={styles.button}><Text>Add Task</Text></TouchableOpacity>
      )}
    </View>
  );
};

export default AddTodo;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: 40,
    flexDirection: "row",
    marginBottom: 15,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: "#808080",
    height: 60,
    width: "96%",
    alignSelf: "center",
  },
  newContainer: { flexGrow: 1 },
  text: { 
    width: "100%", 
    height: "100%",
    padding: 10,
    fontStyle: "italic",
    fontSize: 16,
    fontWeight: "bold",

   },

   button: {
      width: "25%",
      height: "100%",
      alignSelf: "center",
      justifyContent: "center",
      alignItems: "center",
      padding: 10,
      
      backgroundColor: "#99ccff",
      borderRadius: 5,
      borderColor: "#808080",
      borderWidth: 1,
   }
});
