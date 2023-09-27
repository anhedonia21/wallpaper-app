
/*
* THIS FILE IS NOT USED DUE REMOVING BOTTOM TABS
* EVEN THOUGH, IT STILL COULD BE IMPLEMENTED WITH NESTING OTHER NAVIGATION TABS
*/

import React, { useRef, useState, useContext } from "react"
import { Image, View } from "react-native";
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from "react-native-vector-icons/Ionicons";

import Home from "../screens/Home"
import RandomPage from "../screens/RandomPage";
import FavoritesPage from "../screens/FavoritesPage"
import { useScrollToTop } from "@react-navigation/native";

const Tab = createBottomTabNavigator();

function BottomTabsNavigator() {

    return (
      <Tab.Navigator
       screenOptions={{
        tabBarShowLabel:false,
        tabBarStyle:{
            //display:"none",
            backgroundColor:"white",
            position:"absolute",
            bottom:"5%",
            marginHorizontal:20,
            opacity:0.75,

            height:60,
            borderRadius:20,


            shadowColor:"#000",
            shadowOpacity: 0.3,
            shadowOffset: {
                width:10,
                height:10,
            }
        },
        tabBarShowIcon:true,
        headerShown:false,
        //tabBarInactiveBackgroundColor:"magenta",
      }}>


        <Tab.Screen 
        name="Home"
        component={Home}
        options={{
            tabBarIcon: ({focused}) => (
                <View style={{}}>
                    <Ionicons name="home" style={{fontSize: 24}}
                    color={focused ? "green" : "black"}
                    />
                </View>
            ),
        }}
        />
  
        <Tab.Screen 
        name="Favorites"
        component={FavoritesPage}
        options={{
            unmountOnBlur:true,
            tabBarIcon: ({focused}) => (
            <View style={{}}>
                <Ionicons name="heart" style={{fontSize: 24}}
                color={focused ? "green" : "black"}
                />
            </View>)}}
        />
  
        <Tab.Screen
        name="Random"
        component={RandomPage}
        options={{
        tabBarIcon: ({focused}) => (
            <View style={{}}>
                <Ionicons name="shuffle" style={{fontSize: 24}}
                color={focused ? "green" : "black"}
                />
            </View>
        ),}}
        />
  
      </Tab.Navigator>
    )
}

export default BottomTabsNavigator;