import React from 'react'
import SVG, { Path } from 'react-native-svg';

export const UndosSVG = () => {
  return (
    <SVG fill="#FFFFFF" width="20px" height="20px" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
        <Path d="M19 7v6c0 1.103-.896 2-2 2H3v-3h13V8H5v2L1 6.5 5 3v2h12a2 2 0 0 1 2 2z"/>
    </SVG>
  )
}
