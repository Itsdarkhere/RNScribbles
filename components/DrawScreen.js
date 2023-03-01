import { useNavigation } from '@react-navigation/native'
import React, { useRef, useState } from 'react'
import { SafeAreaView, View, StyleSheet, TouchableOpacity, Text } from 'react-native'
import { SketchCanvas } from 'rn-perfect-sketch-canvas';
import {Slider} from '@miblanchard/react-native-slider';
import { TrashSVG } from './SVG/TrashSVG';
import { UndosSVG } from './SVG/UndoSVG';
import { IllustrateSVG } from './SVG/IllustrateSVG';
import { useDispatch } from 'react-redux';
import { setLoading, setRenders } from "../slices/renderSlice";
import { captureRef } from "react-native-view-shot";

const DrawScreen = () => {
  const navigation = useNavigation();
  const canvasRef = useRef(null);
  const shotRef = useRef(null);
  const [brushSize, setBrushSize] = React.useState(8);
  const [prediction, setPrediction] = useState(null);
  const [b64, setB] = useState(null);
  const dispatch = useDispatch();
  const API1 = 'https://6pman6sdvi.execute-api.eu-north-1.amazonaws.com/default/control';
  const API2 = 'https://o9b5hqxi0f.execute-api.eu-north-1.amazonaws.com/default/scribbleTwo?id=';

  const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

  const getImage = async () => {
    const uri = captureRef(shotRef, {
        format: 'png',
        quality: 1,
        result: 'base64',
    })
    return uri;
  }

  const illustrate = async () => {
    dispatch(setLoading(true));
    // Finally navigate to new result screen
    navigation.navigate('Result');
    // Add image to this request
    const image = await getImage();
    const response = await fetch(API1, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            image: `data:image/png;base64,${image}`,
        }),
    });
    
    let prediction = await response.json();
    if (response.status !== 201) {
      console.log("Error:", prediction.detail);
      dispatch(setLoading(false));
      return;
    }
    setPrediction(prediction);

    while (
      prediction.status !== 'succeeded' &&
      prediction.status !== 'failed'
    ) {
      // Check status every second
      await sleep(1000);
      const response = await fetch(API2 + prediction.id);
      prediction = await response.json();
      console.log(prediction);
      if (response.status !== 200) {
        console.log("Error:", prediction.detail);
        dispatch(setLoading(false));
        return;
      }
      setPrediction(prediction);
    }
    // After completion, set the image
    dispatch(setRenders(prediction.output[1]));
    dispatch(setLoading(false));
  }
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
        <View style={styles.container}>
            <View ref={shotRef} style={{width: '100%', height: 'auto'}}>
                <SketchCanvas
                    ref={canvasRef}
                    strokeColor={'white'}
                    strokeWidth={brushSize}
                    containerStyle={styles.canvas}
                />
            </View>
            <View style={styles.sketchActions}>
                <Slider
                    value={brushSize}
                    onValueChange={value => setBrushSize(value)}
                    maximumTrackTintColor='white'
                    minimumTrackTintColor='white'
                    thumbTintColor='white'
                    containerStyle={styles.slider}
                    maximumValue={50}
                    minimumValue={1}
                />
                <TouchableOpacity style={styles.actionButton} onPress={canvasRef.current?.undo}>
                    <UndosSVG />
                </TouchableOpacity>
                <TouchableOpacity style={styles.actionButton} onPress={canvasRef.current?.reset}>
                    <TrashSVG />
                </TouchableOpacity>
            </View>
            <TouchableOpacity style={styles.button} onPress={illustrate}>
                <IllustrateSVG />
                <Text style={styles.buttonText}>Illustrate</Text>
            </TouchableOpacity>
        </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 10,
        backgroundColor: '#FFFFFF',
        alignItems: 'center',
        justifyContent: 'center',
    },
    sketchActions: {
        marginTop: 10,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-evenly',
        backgroundColor: '#000000',
        borderRadius: 13,
        width: '100%',
        height: 60,
        padding: 10,
        paddingLeft: 20,
    },
    slider: {
        flex: 1,
        width: 200,
    },
    canvas: {
        backgroundColor: 'black',
        height: 375,
        width: '100%',
        borderRadius: 22,
    },
    button:  {
        marginTop: 20,
        backgroundColor: '#000000',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 100,
        fontWeight: 'bold',
        height: 50,
        width: 268,
    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold',
        marginLeft: 5,
    },
    actionButton: {
        backgroundColor: '#000000',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 14,
        fontWeight: 'bold',
        height: 40,
        width: 50,
    }
});

export default DrawScreen;
