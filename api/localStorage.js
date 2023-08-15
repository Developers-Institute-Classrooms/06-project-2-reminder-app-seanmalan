import AsyncStorage from "@react-native-async-storage/async-storage";

const STORAGE_KEY = "reminder-list";

export const updateStorage = (item) => {
    AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(item));
  console.warn(`saving ${item}`);
};

export const getStorage = () => {
  return (
    AsyncStorage.getItem(STORAGE_KEY)
      .then((data) => {
        if (data != null) {
          return JSON.parse(data);
        } else {
          return [];
        }
      })
      .catch((err) => {
        console.log(err);
      })
    
  )
};
