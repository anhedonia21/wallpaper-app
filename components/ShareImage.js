import React from 'react';
import { Pressable, Share } from 'react-native';

import Ionicons from "react-native-vector-icons/Ionicons";
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'


const ShareImage = ({ itemSource }) => {
    const onShare = async () => {
      try {
        const result = await Share.share({
          title:"Image Link",
          message:`Hey, check out this image!\n${itemSource.cover_photo.urls.full}`
        });
        if (result.action === Share.sharedAction) {
          if (result.activityType) {
            console.log(result.activityType)
          } else {
            console.log("shared")
          }
        } else if (result.action === Share.dismissedAction) {
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    return (
        <Pressable onPress={onShare} style={{
          backgroundColor:"rgba(0, 0, 0, 0.0)",
          padding:10,
          borderRadius:100,
          marginRight:1,
          marginBottom:20,
        }}>
            <Ionicons name="share-outline" color='white' size={35}/>
        </Pressable>
    );
  };
  
export default ShareImage;