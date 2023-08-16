import { View, Text } from "react-native";
import React from "react";

const TodoItem = ({ item }) => {
  const formattedDate = new Intl.DateTimeFormat("en-NZ", {
    day: "numeric",
    month: "short",
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
        <View
          style={{
            alignItems: "center",
            flex: 1,
            flexDirection: "row",
            justifyContent: "space-between",
            alignSelf: "center",
            padding: 10,
            margin: 2,
            backgroundColor: "#e6e6e6",
            borderWidth: 1,
            borderRadius: 5,
            borderColor: "#808080",
            height: 160,
            width: "96%",

          }}
        >
          <Text
            style={{
              justifyContent: "flex-start",
              alignContent: "flex-start",
              padding: 2,
              fontSize: 18,
              fontWeight: "bold",
            }}
          >
            {item.name}
          </Text>
          <Text
            style={{
              justifyContent: "flex-end",
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
