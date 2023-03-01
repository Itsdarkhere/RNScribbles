import React, { useState } from 'react'
import { View, StyleSheet, Image, ActivityIndicator, TouchableOpacity, Alert } from 'react-native'
import { DownloadSVG } from './SVG/DonwloadSVG';
import * as MediaLibrary from 'expo-media-library';


export const Render = ({imageURL}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [imgSaved, setImgSaved] = useState(false);
  const imageLoad = () => {
    setIsLoaded(true)
  }

  const saveToGalleryIOS = async () => {
    try {
        await MediaLibrary.saveToLibraryAsync(imageURL);
        setImgSaved(true);
    } catch (error) {
        Alert.alert('Error', 'Could not save image...');
    }
  }
  return (
    <View style={styles.render}>
        {imageURL !== null && <Image 
            source={{uri: imageURL}} 
            onLoad={imageLoad}
            style={{width: '100%', height: '100%'}} 
        /> }
        <View style={isLoaded ? styles.dnone : styles.spinnerContainer}>
            <ActivityIndicator size={'large'} color={'white'} />
        </View>
        <TouchableOpacity style={styles.downloadButton} onPress={saveToGalleryIOS}>
            <DownloadSVG />
        </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
    render: {
        backgroundColor: '#000000',
        height: '100%',
        width: '100%',
        borderRadius: 22,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
        overflow: 'hidden',
    },
    downloadButton: {
        width: 75,
        height: 40,
        borderRadius: 10,
        backgroundColor: 'rgba(240,240,240,0.75)',
        position: 'absolute',
        right: 20,
        top: 20,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    spinnerContainer: {
        position: 'absolute',
        top: 0,
        left: 0,
        height: '100%',
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#000000',
    },
    dnone: {
        display: 'none',
        opacity: 0,
    }
})