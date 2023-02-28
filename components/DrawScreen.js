import { useNavigation } from '@react-navigation/native'
import React, { useRef } from 'react'
import { SafeAreaView, View, StyleSheet, TouchableOpacity, Text } from 'react-native'
// import { SketchCanvas } from '@terrylinla/react-native-sketch-canvas';
import { SketchCanvas } from 'rn-perfect-sketch-canvas';
import {Slider} from '@miblanchard/react-native-slider';
import { TrashSVG } from './SVG/TrashSVG';
import { UndosSVG } from './SVG/UndoSVG';
import { IllustrateSVG } from './SVG/IllustrateSVG';

const DrawScreen = () => {
  const navigation = useNavigation();
  const canvasRef = useRef(null);
  const [brushSize, setBrushSize] = React.useState(8);
  return (
    <SafeAreaView style={{flex: 1}}>
        <View style={styles.container}>
            <SketchCanvas
                ref={canvasRef}
                strokeColor={'white'}
                strokeWidth={brushSize}
                containerStyle={styles.canvas}
            />
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
            <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Result')}>
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
        backgroundColor: '#000000',
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
