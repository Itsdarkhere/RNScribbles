import React from 'react'
import { View, StyleSheet } from 'react-native'
import { SafeAreaView } from 'react-native'
import Swiper from 'react-native-swiper'
import { useSelector } from 'react-redux'
import { selectLoading } from '../slices/renderSlice'
import { selectRenders } from '../slices/renderSlice'
import { Render } from './Render'

const ResultScreen = () => {

  const loading = useSelector(selectLoading);
  const renders = useSelector(selectRenders);

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
      <View style={styles.container}>
        <View style={styles.swiperContainer}>
          <Swiper height={375} horizontal={false} showsPagination={false} showsButtons={false} loop={false}>
            {loading && <Render imageURL={null} /> }
            {renders.map((image, index) => {
              return (
                <Render imageURL={image} key={index} />
              )
            })}
          </Swiper>
        </View>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    height: '100%',
    backgroundColor: '#FFFFFF',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 10,
  },
  swiperContainer: {
    height: 375,
    width: '100%',
    shadowColor: "#000",
    shadowOffset: {
        width: 0,
        height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
});

export default ResultScreen;