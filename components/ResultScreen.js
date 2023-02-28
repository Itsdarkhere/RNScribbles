import React from 'react'
import { View, StyleSheet } from 'react-native'
import { SafeAreaView } from 'react-native'
import LottieView from 'lottie-react-native';
import lottie from ".././assets/spinner.json";

const ResultScreen = () => {


  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={styles.container}>
        <View style={styles.render}>
          <LottieView
            autoPlay
            style={{
              width: 60,
              height: 60,
              backgroundColor: 'transparent',
            }}
            // Find more Lottie files at https://lottiefiles.com/featured
            source={lottie}
          />
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
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  }
});

export default ResultScreen;