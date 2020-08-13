import React from 'react'
import { View, TouchableWithoutFeedback } from 'react-native'
import ImageItem from './ImageItem'
import styles from './Styles'
import ScrollContainer from 'react-indiana-drag-scroll'
import ImageScrollViewMobile from './ImageScrollView.js'

const ImageScrollView = React.forwardRef((props, ref) => {
  const {
    handleScrollWeb,
    handlePress,
    editor,
    wrapperStyles,
    innerWrapper,
    images,
    handleSnap,
  } = props

  if (isMobileDevice()) {
    return <ImageScrollViewMobile {...props} />
  }

  return (
    <ScrollContainer
      horizontal={true}
      vertical={false}
      ref={ref}
      onScroll={handleScrollWeb}
      onEndScroll={handleSnap}
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
    </ScrollContainer>
  )
})

const isMobileDevice = () => {
  return (
    typeof window.orientation !== 'undefined' ||
    navigator.userAgent.indexOf('IEMobile') !== -1
  )
}

export default ImageScrollView
