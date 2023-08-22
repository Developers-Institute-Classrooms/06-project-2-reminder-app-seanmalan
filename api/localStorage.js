import AsyncStorage from "@react-native-async-storage/async-storage";

const STORAGE_KEY = "reminder-list";

export const updateStorage = async (array) => {
  if (array.length > 0) {
    try {
      const jsonValue = JSON.stringify(array);
      await AsyncStorage.setItem("reminder-list", jsonValue);
      console.log("Data saved successfully");
    } catch (error) {
      console.log(error);
    }
  }
};

export const getStorage = async (setListData) => {
  try {
    const jsonValue = await AsyncStorage.getItem(STORAGE_KEY);
    if (jsonValue !== null) {
      setListData(JSON.parse(jsonValue));
    }
  } catch (error) {
    console.log(error);
  }
};
