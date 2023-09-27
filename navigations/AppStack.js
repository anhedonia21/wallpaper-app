import React from "react";
import { View, Linking, Text, Image, BackHandler, Button, Pressable, TouchableHighlight } from "react-native"
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { DrawerItem, createDrawerNavigator} from "@react-navigation/drawer"
import { getFocusedRouteNameFromRoute } from '@react-navigation/native';
import "react-native-gesture-handler"
import Ionicons from "react-native-vector-icons/Ionicons";
import Icon from "react-native-vector-icons/dist/FontAwesome6"



import Home from "../screens/Home"
import FavoritesPage from "../screens/FavoritesPage";
import RandomPage from "../screens/RandomPage";
import InspectImage from "../screens/InspectImage"

import CustomDrawer from "../components/CustomDrawer"
import { useNavigation } from '@react-navigation/native';
import { opacity, rgbaColor } from "react-native-reanimated";


const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();


/*
function getHeaderTitle(route) {
  const routeName = getFocusedRouteNameFromRoute(route) ?? "Home";

  switch(routeName) {
    case "Home":
      return "Home";
    case "Favorites":
      return "Favorites";
    case "Random":
      return "Random";
  }
}
*/

const Root = () => {
    return (
        <Drawer.Navigator
        screenOptions={{headerShown : true, drawerLabelStyle:{}}}
        drawerContent={props => <CustomDrawer {...props}/>}>

            <Drawer.Screen name="Home" component={Home}
            options={({ route }) => ({
                headerStyle: {
                  backgroundColor:"",
                  height: 45,
                },
                
                headerTintColor:"white",
                headerTitleStyle: {
                },
                headerTitleAlign: "center",
                headerTitle:"Home",

                drawerActiveTintColor:"red",
                drawerLabel:"Home",
                drawerLabelStyle: {color:"white"},
                headerBackgroundContainerStyle:{backgroundColor:"rgba(32,33,36,255)", opacity:0.6},
                headerTransparent:true,
                drawerItemStyle:{height:48, justifyContent:"center"},
                drawerIcon: config => <View style={{position:"absolute"}}><Ionicons name="chevron-forward-outline" style={{fontSize:30, color:"white"}}/></View>,
            })}/>

            <Drawer.Screen name="Favorites" component={FavoritesPage}
            options={({ route }) => ({
                headerStyle: {
                  backgroundColor:"#296137",
                  height: 45,
                },
                headerTintColor:"white",
                headerTitleStyle: {
                },
                headerTitleAlign: "center",
                headerTitle:"Favorites",
                unmountOnBlur:true,
                title:"Favorites",
                drawerLabel:"Favorites",
                drawerLabelStyle: {color:"white"},
                drawerActiveTintColor:"red",
                headerBackgroundContainerStyle:{backgroundColor:"rgba(32,33,36,255)", opacity:0.6},
                headerTransparent:true,
                drawerItemStyle:{height:48, justifyContent:"center"},
                drawerIcon: config => <View style={{position:"absolute"}}><Ionicons name="chevron-forward-outline" style={{fontSize:30, color:"white"}}/></View>,
            })}/>

        </Drawer.Navigator>
    )
}

const AppStack = () => {

  const navigation = useNavigation();

  return (
      <Stack.Navigator>

        <Stack.Screen name="Drawer" component={Root}
        options={{ headerShown: false }} />

        <Stack.Screen options={{
          title: '',
          headerStyle: {
            height: 80,
          },
          headerTintColor:"white",
          headerTitleStyle: {
          },
          headerTitleAlign: "center",
          headerBackVisible:false,
          headerTransparent:true,
          headerLeft: () => (
            <TouchableHighlight onPress={() => {navigation.goBack()}} 
            activeOpacity={0.9}
            underlayColor="rgba(0, 0, 0, 0.50)"
            style={{
              marginLeft:3,
              marginTop:10,
              padding:5,
              borderRadius:100,
              color:"#ff2937",
            }}>
              <Icon name="arrow-left-long" size={36} color="white" solid/>
            </TouchableHighlight>
          )}} name="InspectImage" component={InspectImage}/>

      </Stack.Navigator>
  );
}

export default AppStack
