import React from "react"
import { View, Text, ImageBackground, Image, Pressable, Linking, Alert, useColorScheme, StyleSheet } from "react-native"

import { DrawerContentScrollView, DrawerItemList, DrawerItem } from "@react-navigation/drawer"
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faMoon } from "@fortawesome/free-solid-svg-icons"
import { faImage, faCircleQuestion } from "@fortawesome/free-regular-svg-icons"
import Ionicons from "react-native-vector-icons/Ionicons";
import { Switch } from "react-native-gesture-handler";



const CustomDrawer = (props) => {

    const colorScheme = useColorScheme();


    return (

        <View style={{flex:1, backgroundColor:"rgba(32,33,36,255)"}}>


            <View style={{flexDirection:"row", width:280.5, height:150, textAlign:"center", justifyContent:"center"}}>
                <View>
                    <Image source={require("./real.png")} style={{
                        height: 90,
                        width:90,
                        borderRadius:100,
                        marginLeft:15,
                        marginTop:38,
                    }}/>
                </View>
                <View style={{
                    marginTop:48,
                    marginLeft:10,
                    width:150,
                }}>
                    <Text style={{color:"red", textAlign:"center", fontSize:20, paddingTop:12, fontFamily:"monospace", fontWeight:"bold", fontStyle:"italic" }}>Wallpaper App</Text>
                </View>
            </View>


            <DrawerContentScrollView {...props} 
            scrollEnabled={true}
            contentContainerStyle={{}}
            >
                <DrawerItemList {...props} />

                <View>

                <DrawerItem style={{

                    borderWidth:1.5,
                    borderColor:"gray",
                    borderRadius:10,
                    }}
                    label="Other Wallpaper Apps" labelStyle={{color:"white"}} onPress = {() => {
                    //Linking.openURL("")
                }}
                    icon={(focused) => (
                    <View style={{position:"absolute", paddingLeft:5}}>
                        <Ionicons name="image-outline" size={24} color="white"
                        />
                    </View>
                    )}
                    />

                    <DrawerItem style={{

                        borderWidth:1.5,
                        borderColor:"gray",
                        borderRadius:10,
                    }}
                    label="Support" labelStyle={{color:"white"}} onPress = {() => {
                        //Linking.openURL("")
                    }}
                    icon={(focused) => (
                        <View style={{position:"absolute", paddingLeft:3}}>
                            <Ionicons name="help-circle-outline" size={28} color="white"
                            />
                        </View>
                    )}
                    />

                    <DrawerItem 
                    style={{

                        borderWidth:1.5,
                        borderColor:"gray",
                        borderRadius:10,
                    }}label="Rate Our App" labelStyle={{color:"white"}} onPress = {() => {}} 
                    icon={(focused) => (
                        <View style={{position:"absolute", paddingLeft:5, }}>
                            <Ionicons name="star-outline" style={{fontSize: 22, color:"white"}}
                            color={"black"}
                            />
                        </View>
                    )}/>

                    <DrawerItem style={{

                    borderWidth:1.5,
                    borderColor:"gray",
                    borderRadius:10,
                    }}
                    label="Privacy" labelStyle={{color:"white"}} onPress = {() => {
                    //Linking.openURL("")
                    }}
                    icon={(focused) => (
                    <View style={{position:"absolute", paddingLeft:5}}>
                        <Ionicons name="information-circle-outline" size={25} color="white" />
                    </View>
                    )}
                    />

                </View>


            </DrawerContentScrollView>

            <View  style={{padding: 30, borderTopWidth:1, borderTopColor:"#ccc"}}>
                <Pressable onPress = {() => {Linking.openURL("https://github.com/anhedonia21")}}>
                    <Text style={styles.baseText}> Anything useful?</Text>
                </Pressable>
            </View>


       </View>
    )
}

const styles = StyleSheet.create({
    baseText: {
      fontFamily: 'arial',
      fontSize: 20,
      fontStyle:"italic",
      textAlign:"center",
      color:"red"
    },
  });
  

export default CustomDrawer;