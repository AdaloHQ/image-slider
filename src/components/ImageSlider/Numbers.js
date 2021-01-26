import React from 'react'
import { View, Text } from 'react-native'
import styles from './Styles'

export default function Numbers(props) {
  const {
    count,
    activeIndex,
    backgroundColor,
    rounding,
    textColor,
    bodyFont,
  } = props
  const viewStyle = {
    backgroundColor,
    borderRadius: rounding,
    padding: 4,
    paddingLeft: 8,
    paddingRight: 8,
  }
  const textStyle = {
    color: textColor,
    ...bodyFont,
  }
  return (
    <View style={styles.dotsWrapper}>
      <View style={viewStyle}>
        <Text style={textStyle}>
          {activeIndex + 1}/{count}
        </Text>
      </View>
    </View>
  )
}
