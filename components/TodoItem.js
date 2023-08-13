import { View, Text } from "react-native";
import React from "react";

const TodoItem = ({ item }) => {
  return (
    <View
      style={{
        backgroundColor: "white",
        height: 50,
        flex: 1,
        justifyContent: "center",
      }}
    >
      <View style={{ width: "100%", flex: 1 }}>
        <View style={{ alignItems: "center", flex: 1, flexDirection: "row" }}>
          <Text>{item.timestamp}</Text>
          <Text>{item.name}</Text>
        </View>
      </View>
    </View>
  );
};

export default TodoItem;
