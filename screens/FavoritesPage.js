import React, { useEffect, useState } from "react"
import { View, Text, Image, Pressable, StyleSheet, Dimensions, FlatList, TouchableOpacity, Button } from "react-native"
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from "@react-navigation/native";
import FastImage from "react-native-fast-image";
import LinearGradient from "react-native-linear-gradient";



function FavoritesPage() {

    const navigation = useNavigation();

    const [imagesInitialized, setImagesInitialized] = useState(false)
    const [images, setImages] = useState([])

    useEffect(() => {
      AsyncStorage.getAllKeys()
      .then(data => {
        if (data) {     
          setImages(data)
        }
        setImagesInitialized(true)
      })
    }, [])


    const keyExtractor = (item) => item.share_key;

    const renderItem = ({ index, item }) => {
      var item_url = JSON.parse(item).cover_photo.urls.full
      return(
          <TouchableOpacity onPress={() => navigation.navigate("InspectImage", {itemSource: JSON.parse(item)})} style={{
            flexGrow:1,
            width:"20%",
            position:"relative",
            aspectRatio:0.5,
            marginRight: index % 2 !== 0 ? 0 : 10,
            }}> 
            <FastImage source={{uri: item_url}} style={{borderRadius:20, aspectRatio:0.5}} />
          </TouchableOpacity>
      );
    };

    return (

      images.length === 0 ?

      <View style={styles.nonAdded}>
        <Text style={{textAlign:"center", fontWeight:"bold", fontSize:20, color:"white", width:"70%", fontStyle:"italic"}}>You do not have any favorited images! If you would like to add, pick an image and click the bookmark button!</Text>
      </View>

      :
      <LinearGradient
      colors={["#f04393", "#3c4cad"]}
      start={{ x: 0.5, y: 0.3 }}
       style={{width:"100%"}}>
        <View style={styles.container}>
          <FlatList
            data={images}
            numColumns={2}
            style={styles.list}

            // OPTIMIZIATION
            keyExtractor={keyExtractor}

            renderItem={renderItem}
            columnWrapperStyle={{marginTop:10}}
            //ItemSeparatorComponent={() => <View style={{height: 10}} />}
          />

        </View>
      </LinearGradient>
    );

  }

const styles = StyleSheet.create({

    container: {
        width:"95%",
        height:"100%",
        //backgroundColor:"rgba(32,33,36,255)",
        backgroundColor:"transparent",
        alignItems:"center",
    },
    list: {
        width: '100%',
        marginLeft:21,
        //backgroundColor: 'rgba(32,33,36,255)',
        backgroundColor:"transparent",
    },

    nonAdded: {
      width:"100%",
      height:"100%",
      backgroundColor:"rgba(32,33,36,255)",
      position:"absolute",
      alignItems:"center",
      justifyContent:"center",
    },
    
})

export default FavoritesPage;