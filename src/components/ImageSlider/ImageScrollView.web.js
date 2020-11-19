import React from 'react'
import { View, TouchableWithoutFeedback } from 'react-native'
import ImageItem from './ImageItem'
import styles from './Styles'
import ScrollContainer from '@adalo/react-indiana-drag-scroll'
import ImageScrollViewMobile from './ImageScrollView.js'

const ImageScrollView = React.forwardRef((props, ref) => {
  const {
    editor,
    wrapperStyles,
    innerWrapper,
    images,
    handleSnap,
    clearAutoplay,
    onClickWeb,
  } = props

  return (
    <ScrollContainer
      horizontal={true}
      vertical={false}
      ref={ref}
      onEndScroll={handleSnap}
      onStartScroll={clearAutoplay}
      onClick={onClickWeb}
    >
      <View style={[styles.imageContainer, wrapperStyles]}>
        {!editor &&
          images.map(({ image }, i) => (
            <TouchableWithoutFeedback key={i}>
              <View style={[styles.imageWrapper, innerWrapper]}>
                <ImageItem image={image} />
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
