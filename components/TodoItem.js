import { View, Text } from "react-native";
import React from "react";

const TodoItem = ({ item }) => {
  const formattedDate = new Intl.DateTimeFormat("en-NZ", {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
  }).format(new Date(item.timestamp));

  return (
    <View
      style={{
        backgroundColor: "white",
        padding: 5,
        height: "20%",
        flex: 1,
        justifyContent: "center",
      }}
    >
      <View style={{ width: "100%", flex: 1 }}>
        <View
          style={{
            alignItems: "center",
            flex: 1,
            flexDirection: "column",
            justifyContent: "space-between",
            alignSelf: "center",
            margin: 2,
            padding: 2,
            backgroundColor: "#A0EBCF",
            borderWidth: 1,
            borderRadius: 5,
            borderColor: "#808080",
            width: "96%",
          }}
        >
          <Text
            style={{
              justifyContent: "center",
              alignContent: "flex-start",
              padding: 2,
              fontSize: 18,
              fontWeight: "bold",
            }}
          >
            {item.name}
          </Text>
          <Text
            testID="taskDate"
            style={{
              justifyContent: "center",
              padding: 3,
              margin: 2,
            }}
          >
            {formattedDate}
          </Text>
        </View>
      </View>
    </View>
  );
};

export default TodoItem;
