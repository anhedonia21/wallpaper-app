import { Pressable, TouchableHighlight } from "react-native"
import AsyncStorage from '@react-native-async-storage/async-storage';
import Ionicons from "react-native-vector-icons/Ionicons";
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faHeart as farHeart} from "@fortawesome/free-regular-svg-icons"
import { faHeart as fasHeart } from "@fortawesome/free-solid-svg-icons"
import { useState } from "react";


const storeData = async (itemIndex, value) => {
    try {
      const jsonValue = JSON.stringify(value)  
      const jsonKey = JSON.stringify(itemIndex)
      await AsyncStorage.setItem(jsonKey, jsonValue);
      console.log("Stored!")
    } catch (e) {
      console.log(e)
    }
};

const removeValue = async (itemIndex) => {
    try {
      await AsyncStorage.removeItem(JSON.stringify(itemIndex))
    } catch(e) {console.log(e)}
    console.log('Removed!')
}

const getData = async (itemIndex) => {
    try {
      const value = await AsyncStorage.getItem(JSON.stringify(itemIndex));
      if (value !== null) {
        return true
      }
      else {return false}
    } catch (e) {
      console.log(e)
    }
};


const getAllKeys = async () => {
    let keys = []
    try {
      keys = await AsyncStorage.getAllKeys()
    } catch(e) {
      // read key error
    }
    console.log(keys)
    return keys
}

const clearAll = async () => {
    try {
      await AsyncStorage.clear()
    } catch(e) {
      // clear error
    }
  
    console.log('Done.')
  }
  

export default function AddToFavorites({ imageSource }) {

    const [iconName, setIconName] = useState()
    const [iconColor, setIconColor] = useState()

    function executorFunction() {
        return getData(imageSource)
      }
      
    async function getVal() {
        const val = await executorFunction();
        if (val === true) {setIconName(fasHeart);setIconColor("red")}
        else {setIconName(farHeart);setIconColor("white")}
    }; getVal()

    const onTouched = async () => {
        var all_keys = await getAllKeys()
        if (all_keys.includes(JSON.stringify(imageSource))) {
            removeValue(imageSource)
            setIconName(farHeart)
            setIconColor("white")
        }
        else {
            storeData(imageSource, imageSource)
            setIconName(fasHeart)
            setIconColor("red")
        }
    }

    return (
        <TouchableHighlight onPress={onTouched} activeOpacity={0.9}
        underlayColor="rgba(0, 0, 0, 0.50)"
        style={{
          marginRight:1,
          padding:10,
          borderRadius:100,
          color:"#ff2937",
        }}>
            <FontAwesomeIcon icon={iconName} size={30} color={iconColor} />
        </TouchableHighlight>
    )

}