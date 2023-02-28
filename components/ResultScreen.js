import React from 'react'
import { View, StyleSheet, Animated } from 'react-native'
import { SafeAreaView } from 'react-native'
import { SpinnerSVG } from './SVG/SpinnerSVG'
// import { Keyframe } from 'react-native-reanimated';

const ResultScreen = () => {
  // const keyframe = new Keyframe({
  //   from: {
  //     transform: [{ rotate: '0deg' }],
  //   },
  //   to: {
  //     transform: [{ rotate: '360deg' }],
  //   },
  // })

  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={styles.container}>
        <View style={styles.render}>
          {/* <Animated.View>
            <SpinnerSVG />
          </Animated.View> */}
        </View>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 10,
  },
  render: {
    backgroundColor: '#000000',
    height: 375,
    width: '100%',
    borderRadius: 22,
  }
});

export default ResultScreen;