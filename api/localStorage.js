import AsyncStorage from "@react-native-async-storage/async-storage";

const STORAGE_KEY = "reminder-list";

export const updateStorage = (item) => {
  console.warn(`saving ${item}`);
};

export const getStorage = () => {
  return [
    { name: "hard coded task 1", dueDateTimestamp: "12341234", key: "1" },
    { name: "hard coded task 2", dueDateTimestamp: "35234234", key: "2" },
  ];
};
