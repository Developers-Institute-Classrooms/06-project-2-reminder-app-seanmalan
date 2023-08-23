import AsyncStorageMock from '@react-native-async-storage/async-storage/jest/async-storage-mock';

// have the set task mock have 2 fake reminders in it with names and date and time

AsyncStorageMock.setItem = jest.fn((key, value) => {
  return;
});
  

AsyncStorageMock.getItem = jest.fn((key) => {
  '[{“key”: “1692177106926", “name”: “Eat a big meal”, “timestamp”: “Thu Aug 24 2023 18:11:00 GMT+1200"}, {“key”: “1692568358531", “name”: “Test me”, “timestamp”: “Wed Aug 30 2023 02:52:00 GMT+1200"}, {“key”: “1692569261482", “name”: “Test 3", “timestamp”: “Wed Aug 16 2023 05:07:00 GMT+1200"}]'
});
