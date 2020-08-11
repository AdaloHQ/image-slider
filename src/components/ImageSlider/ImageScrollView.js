import React, { Component } from 'react'
import { View, ScrollView, TouchableWithoutFeedback } from 'react-native'
import ImageItem from './ImageItem'
import styles from './Styles'

const ImageScrollView = React.forwardRef((props, ref) => {
  const {
    handleScroll,
    handlePress,
    editor,
    wrapperStyles,
    innerWrapper,
    images,
  } = props
  return (
    <ScrollView
      horizontal
      pagingEnabled
      style={[styles.scrollView]}
      ref={ref}
      onScroll={handleScroll}
      scrollEventThrottle={0}
      showsHorizontalScrollIndicator={false}
    >
      <View style={[styles.imageContainer, wrapperStyles]}>
        {!editor &&
          images.map(({ id, image }, i) => (
            <TouchableWithoutFeedback onPress={handlePress(i)}>
              <View style={[styles.imageWrapper, innerWrapper]}>
                <ImageItem key={id} image={image} />
              </View>
            </TouchableWithoutFeedback>
          ))}
      </View>
    </ScrollView>
  )
})

export default ImageScrollView
