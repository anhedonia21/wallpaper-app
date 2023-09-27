import { useState, useEffect, useRef, useContext, useCallback } from "react";
import {
    View,
    StyleSheet,
    TouchableOpacity,
    FlatList,
    Image,
    ActivityIndicator,
    Animated,
    Dimensions,
    RefreshControl,
    ScrollView,
    Text,
    ImageBackground,
} from "react-native";
import axios from "axios";

import FastImage from 'react-native-fast-image'
import LinearGradient from 'react-native-linear-gradient'
import { NavigationContainer, useNavigation, useScrollToTop } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createDrawerNavigator } from "@react-navigation/drawer"


import InspectImage from "./InspectImage"


//---------------------------------------------------------------

const {width, height} = Dimensions.get("screen")


export default function Home() {
  
  const navigation = useNavigation();


  const shuffle = (array) => {
    let currentIndex = array.length, randomIndex;
  
    while (currentIndex != 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--; 
  
      [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]] 
    }
    return array;
  }

    var temp_arr = []
    for(var a = 0; a <= 1000; a++)
    { 
      temp_arr.push(a)
    }
    const [shuffledArray, setShuffledArray] = useState(shuffle(temp_arr))
    const [shuffledArrayIndex, setShuffledArrayIndex] = useState(0)
    const [images, setImages] = useState([]);
    const [currentFile, setCurrentFile] = useState(shuffledArray[0])
    const [isLoading, setIsLoading] = useState(false);
    const [isRefreshing, setIsRefreshing] = useState(false);
    const [arrayFinished, setArrayFinished] = useState(false)
    
    const wait = (timeout) => { // Defined the timeout function for testing purpose
      return new Promise(resolve => setTimeout(resolve, timeout));
    }
    const onRefresh = useCallback(() => {
            setIsRefreshing(true);
            setShuffledArray(shuffle(temp_arr))
            setCurrentFile(shuffledArray[0])
            setImages([])
            setIsLoading(false)
            getImages();
            wait(2500).then(() => setIsRefreshing(false));
    }, []);

    var onEndReachedCalledDuringMomentum = true;
    const keyExtractor = (item) => item.share_key;



   const getRandNum = (min, max) => {
    return Math.floor(Math.random() * (max - min) + min);
   }

   
    const getItemLayout = (data, index) => (
      {length: 1024, offset: 1024 * index, index}
    )

    const ACCESS_KEY = "JyISjr1vjUHq2uyAH5QfKUQZ0RrSrmxekN_bS6vKzfs"


    const getImages = () => {
      setIsLoading(true);
      axios.request({
        timeout:2000,
        method: "GET",
        url: `https://api.unsplash.com/search/collections?page=${currentFile}&query=japan&client_id=${ACCESS_KEY}`
      })
        .then(res => {
          const shuffled_array = shuffle(res.data.results)
          setImages([...images, ...shuffled_array]);
          setIsLoading(false);
        })

        .catch((error) => {
          console.log
        }
        )
    };

    const renderItem = ({ index, item }) => {
      return(
          <TouchableOpacity onPress={() => navigation.navigate("InspectImage", {itemSource: item})} style={{
            flexGrow:1,
            width:"20%",
            position:"relative",
            aspectRatio:0.5,
            marginRight: index % 2 !== 0 ? 0 : 10,
            }}> 
            <FastImage source={{uri: item.cover_photo.urls.full}} style={{borderRadius:20, aspectRatio:0.5}} />
          </TouchableOpacity>
      );
    };


    const renderLoader = () => {

      if(arrayFinished) {
        return (
          <View style={{justifyContent:"center", padding:20, alignItems:"center"}}>
            <Text style={{color:"white", fontSize:20}}>You are all caught up!</Text>
          </View>
        )
      }

      return (
        isLoading ?
        <View style={styles.loaderStyle}>
            <ActivityIndicator size="large" color="white" />
          </View> : null
      );
    };

    const loadMoreItem = () => {

      if (!onEndReachedCalledDuringMomentum) {

          if (String(shuffledArray[shuffledArrayIndex + 1]) == "undefined") {
            setArrayFinished(true)
          }
          setCurrentFile(shuffledArray[shuffledArrayIndex + 1])
          setShuffledArrayIndex(shuffledArrayIndex + 1)
          onEndReachedCalledDuringMomentum = true;
      } 
    };

    
    useEffect(() => {
      getImages();
    }, [currentFile]);



    return (
      <ImageBackground source={require("./img.jpg")} blurRadius={3} style={{}}>
        <View style={styles.container}>
          <FlatList
            data={images}
            numColumns={2}
            style={styles.list}
            showsHorizontalScrollIndicator={false}

            // OPTIMIZIATION
            initialNumToRender={10}
            extraData={isRefreshing}
            maxToRenderPerBatch={10}
            removeClippedSubviews = {true}
            keyExtractor={keyExtractor}

            onEndReached={loadMoreItem}
            renderItem={renderItem}
            ListFooterComponent={renderLoader}

            onEndReachedThreshold={0.2}
            onMomentumScrollBegin={() => { onEndReachedCalledDuringMomentum = false; }}

            refreshing={isRefreshing} 
            onRefresh={onRefresh}

            bounces={true}
            windowSize={3000}
            updateCellsBatchingPeriod={1000}
            columnWrapperStyle={{marginTop:10}}

            //ItemSeparatorComponent={() => <View style={{height: 10}} />}
          />

        </View>
    </ImageBackground>
    );
};

const styles = StyleSheet.create({
    container: {
        width:"95%",
        height:"100%",
        //backgroundColor:"rgba(128, 166, 255, 1)",
        backgroundColor:"transparent",
        alignItems:"center",
    },
    list: {
        width: '100%',
        marginLeft:21,
        //backgroundColor: 'rgba(128, 166, 255, 1)',
      },
    loaderStyle: {
      marginVertical: 16,
      alignItems: "center",
    },
});
