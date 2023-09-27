import AsyncStorage from '@react-native-async-storage/async-storage';

export default function UpdateStorage(imageSource) {
    const storeData = async (itemIndex, value) => {
        try {
          await AsyncStorage.setItem(itemIndex, value);
        } catch (e) {
          // saving error
        }
      };

      const getData = async (itemIndex) => {
        try {
          const value = await AsyncStorage.getItem(itemIndex);
          if (value !== null) {
            console.log(value)
          }
        } catch (e) {
          // error reading value
        }
      };

    //storeData(imageSource.index, imageSource.source)
    //getData(imageSource.index)

    getAllKeys = async () => {
        let keys = []
        try {
          keys = await AsyncStorage.getAllKeys()
        } catch(e) {
          // read key error
        }
      
        console.log(keys)
    }
    getAllKeys()
} 