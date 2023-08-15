import { View, Text } from "react-native";
import React from "react";

const TodoItem = ({ item }) => {

  const formattedDate = new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
  }).format(new Date(item.timestamp));


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
          <Text>{item.name}</Text>
          <Text>{item.Date}</Text>
          <Text>{formattedDate}</Text>
        </View>
      </View>
    </View>
  );
};

export default TodoItem;
