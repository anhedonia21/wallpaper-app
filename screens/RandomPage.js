import { useState, useEffect, useRef, useContext, useCallback } from "react";
import {
    View,
    StyleSheet,
    FlatList,
    Image,
    ActivityIndicator,
    RefreshControl,
    TouchableOpacity,
    Pressable,
    ScrollView,
    Dimensions
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import FastImage from "react-native-fast-image"

import axios from "axios";

const RandomPage = () => {

    const [isRefreshing, setIsRefreshing] = useState(false);
    const [currentFile, setCurrentFile] = useState(Math.floor(Math.random() * 10))
    const [images, setImages] = useState([])
    const navigation = useNavigation()

    const getImages = () => {

        axios.request({
          timeout:2000,
          method: "GET",
          url: `robots.txt`
        })
          .then(res => {
            const randomElement = res.data.contents[Math.floor(Math.random() * 10)];
            setImages([randomElement]);
          })
  
          .catch((error) => {
            console.log(error)
          }
          )
      };

    const wait = (timeout) => { // Defined the timeout function for testing purpose
        return new Promise(resolve => setTimeout(resolve, timeout));
    }
    const onRefresh = useCallback(() => {
        
        setIsRefreshing(true);
        setCurrentFile(Math.floor(Math.random() * 10))
        getImages()

        wait(2500).then(() => setIsRefreshing(false));
    }, []);

    useEffect(() => {
        getImages();
      }, [currentFile]);

    const renderItem = ({ item }) => {
        return(
            <TouchableOpacity onPress={() => navigation.navigate("InspectImage", {itemSource: item})} style={{flex:1, flexDirection:"column"}}> 
              <FastImage source={{uri: item.source}} style={{width:"100%", height:"100%", resizeMode:"contain", aspectRatio:1}} />
            </TouchableOpacity>
        );
    };
    const keyExtractor = (item) => item.index;


  return (
    <View style={styles.container}>
        <FlatList
          data={images}
          showsHorizontalScrollIndicator={false}

          // OPTIMIZIATION
          extraData={isRefreshing}
          maxToRenderPerBatch={10}
          keyExtractor={keyExtractor}

          renderItem={renderItem}

          refreshControl={
            <RefreshControl
            refreshing={isRefreshing} 
            onRefresh={onRefresh} />
          }
          windowSize={1}
        />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width:"100%",   
    height:"100%",
  },
  scrollView: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});



export default RandomPage;