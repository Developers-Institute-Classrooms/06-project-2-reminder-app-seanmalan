import { View, Pressable } from "react-native";
import React from "react";
// import { MaterialIcons } from "@expo/vector-icons";

const TodoItemButtons = (data, rowMap, deleteRow) => (
  <View style={{ flex: 1, flexDirection: "row", justifyContent: "flex-end" }}>
    <Pressable
      style={({ pressed }) => ({
        backgroundColor: pressed ? "red" : "tomato",
        width: 100,
      })}
      onPress={() => deleteRow(rowMap, data.item.key)}
    >
      {/* <View style={{ alignContent: "center", alignSelf: "center"}}>

      <MaterialIcons name="delete" size={40} />
      </View> */}
    </Pressable>
  </View>
);

export default TodoItemButtons;
