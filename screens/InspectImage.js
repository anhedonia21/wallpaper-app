import { useEffect, useState } from "react"
import {
    Text,
    View,
    StyleSheet,
    Image,
    Button,
    ImageBackground,
    Pressable,
    Share,
    PermissionsAndroid,
    Alert,
    Animated,

} from "react-native"
import AsyncStorage from '@react-native-async-storage/async-storage';
import Ionicons from "react-native-vector-icons/Ionicons";
import { faFlag } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { CameraRoll } from "@react-native-camera-roll/camera-roll";
import RNFetchBlob from "rn-fetch-blob"
import FastImage from "react-native-fast-image";

import ShareImage from "../components/ShareImage";
import AddToFavorites from "../components/AddToFavorites";



const getPermissionAndroid = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
        {
          title: 'Image Download Permission',
          message: 'Your permission is required to save images to your device',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        return true;
      }
      Alert.alert(
        'Save remote Image',
        'Grant Me Permission to save Image',
        [{text: 'OK', onPress: () => console.log('OK Pressed')}],
        {cancelable: false},
      );
    } catch (err) {
      Alert.alert(
        'Save remote Image',
        'Failed to save Image: ' + err.message,
        [{text: 'OK', onPress: () => console.log('OK Pressed')}],
        {cancelable: false},
      );
    }
  };

const handleDownload = async (imageURL) => {
    // if device is android you have to ensure you have permission
    if (Platform.OS === 'android') {
      const granted = await getPermissionAndroid();
      if (!granted) {
        return;
      }
    }
    RNFetchBlob.config({
      fileCache: true,
      appendExt: 'png',
    })
      .fetch('GET', imageURL)
      .then(res => {
        CameraRoll.save(res.data, 'photo')
          .then(() => {
            console.log("DONE!!!")
          })
          .catch(err => {
            Alert.alert(
              'Save remote Image',
              'Failed to save Image: ' + err.message,
              [{text: 'OK', onPress: () => console.log('OK Pressed')}],
              {cancelable: false},
            );
          })
      })
      .catch(error => {
        Alert.alert(
          'Save remote Image',
          'Failed to save Image: ' + error.message,
          [{text: 'OK', onPress: () => console.log('OK Pressed')}],
          {cancelable: false},
        );
      });
  };





export default function InspectImage({ route }) {
    
    const { itemSource } = route.params

    const [isClicked, setIsClicked] = useState(false)
    const [isFaded, setIsFaded] = useState(false)
    const [typeButton, setTypeButton] = useState()
    const Fopacity = useState(new Animated.Value(0))[0]

    function fadeInAnimation() {
      Animated.timing(Fopacity, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true
      }).start((({finished}) => {fadeOutAnimation()}))
    }

    function fadeOutAnimation () {
      Animated.timing(Fopacity, {
        toValue: 0,
        duration: 3000,
        useNativeDriver: true
      }).start()
    }

    return (
        <View style={styles.container}>

                <FastImage source={{uri: itemSource.cover_photo.urls.full}} style={styles.container}>
                    <View style={styles.button_box}>
                        
                        <View style={styles.button}> 
                            <Pressable onPress={() => {handleDownload(itemSource.cover_photo.urls.full);setIsClicked(true);setTypeButton("Download");
                            fadeInAnimation();}}
                            style={{
                              backgroundColor:"rgba(0, 0, 0, 0.0)",
                              padding:10,
                              borderRadius:100,
                            }}>
                                <Ionicons name={isClicked ? "arrow-down-circle" : "arrow-down-circle-outline"} size={40} color="white"/>
                            </Pressable>
                        </View>

                        <View style={styles.button}> 
                            <AddToFavorites imageSource={itemSource}/>
                        </View>

                        <View style={styles.button}>
                            <ShareImage itemSource={itemSource}/>
                        </View>
                        <View style={styles.button}>
                        <Pressable onPress={() => {setTypeButton("Report");fadeInAnimation()}}>
                            <FontAwesomeIcon icon={faFlag} size={28} style={{
                                color:"white",
                                paddingTop:20,
                                marginRight:1,
                            }} />
                        </Pressable>
                        </View>

                    </View>

                    <Animated.View style={{
                        alignSelf:"center",
                        marginBottom:60, 
                        marginTop:-80, 
                        width:200,
                        opacity:Fopacity,
                        backgroundColor:"rgba(0, 0, 0, 0.45)",
                        borderRadius:10,
                    }}>
                      {(typeButton === "Download") 
                      ? <Text style={{textAlign:"center", fontSize: 20, color:"white"}}>Image Downloaded Successfully!</Text>
                      : <Text style={{textAlign:"center", fontSize: 20, color:"white"}}>Image Reported Successfully!</Text>}
                    </Animated.View>

                </FastImage>

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex:1,
        width:"100%",   
        height:"100%",
        backgroundColor:"black",
        alignItems: "flex-end",
        justifyContent: "flex-end",
    },
    item: {
        justifyContent:"center",
        flex: 1,
    },
    button_box: {
        display:"flex",
        height:"40%",
        justifyContent:"space-between",
        alignItems:"center",
        borderRadius: 10,
        flexDirection:"column",
        //backgroundColor:"rgba(255, 255, 255, 0.48)",
        opacity: 1,
        marginRight:10,
    },
    button: {
        borderRadius: 50,
    }
})