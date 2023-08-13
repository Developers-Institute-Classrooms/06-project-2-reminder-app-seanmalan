import { View, Pressable } from "react-native";
import React from "react";
import { MaterialIcons, Ionicons } from "@expo/vector-icons";

const TodoItemButtons = (data, rowMap, deleteRow) => (
  <View style={{ flex: 1, flexDirection: "row", justifyContent: "flex-end" }}>
    <Pressable
      style={({ pressed }) => ({
        backgroundColor: pressed ? "blue" : "aqua",
        width: 50,
      })}
      onPress={() => deleteRow(rowMap, data.item.key)}
    >
      <MaterialIcons name="delete" />
    </Pressable>
  </View>
);

export default TodoItemButtons;
