import React, { Component } from 'react'
import { View } from 'react-native'
import styles from './Styles'
import Dots from './Dots'
import Arrow from './Arrow'
import ImageScrollView from './ImageScrollView'
import Numbers from './Numbers'

class ImageList extends Component {
  state = {
    activeIndex: 0,
  }

  calculateIndex = (offsetX) => {
    let { containerWidth } = this.props
    let index = Math.round(offsetX / containerWidth)

    return index
  }

  handleScroll = ({ nativeEvent }) => {
    let { activeIndex } = this.state
    let { x } = nativeEvent.contentOffset
    this.currentOffset = x
    let index = this.calculateIndex(x)

    if (index !== activeIndex) {
      this.setState({ activeIndex: index })
    }
  }

  handleScrollWeb = (offset) => {
    let { activeIndex } = this.state
    this.currentOffset = offset
    let index = this.calculateIndex(offset)

    if (index !== activeIndex) {
      this.setState({ activeIndex: index })
    }
  }

  handleSnap = (x, y, width, height) => {
    const { images } = this.props

    const imageWidth = width / images.length
    const activeImage = Math.round(x / imageWidth)
    const position = activeImage * imageWidth

    this.scrollTo(position, activeImage)
  }

  scrollTo = (position, index) => {
    this.scrollView.scrollTo({ x: position, animated: true })
    const { images } = this.props
    const { scrollAction } = images[index]
    if (scrollAction) scrollAction(index)

    this.setState({ activeIndex: index })
  }

  handleChange = (index) => {
    let { containerWidth, images } = this.props
    let offset = Math.min(images.length - 1, index) * containerWidth

    this.scrollTo(offset, index)
  }

  handleRightArrow = () => {
    const { activeIndex } = this.state
    const {
      arrows: { endScrollAction },
    } = this.props
    const { images } = this.props
    if (activeIndex === images.length - 1 && endScrollAction) endScrollAction()
    if (activeIndex > images.length - 2) return
    this.handleChange(activeIndex + 1)
  }

  handleLeftArrow = () => {
    const { activeIndex } = this.state
    if (activeIndex === 0) return
    this.handleChange(activeIndex - 1)
  }

  handlePress = (i) => () => {
    let { images } = this.props

    images[i] && images[i].action && images[i].action()
  }

  scrollViewRef = (el) => {
    this.scrollView = el
  }

  render() {
    let {
      images,
      containerWidth,
      containerHeight,
      activeColor,
      inactiveColor,
      editor,
      paddingBottom,
      dots,
      arrows,
    } = this.props

    let { activeIndex } = this.state

    let wrapperStyles = {
      width: images.length * containerWidth,
      zIndex: -1,
      position: 'relative',
    }

    let innerWrapper = {
      height: containerHeight,
    }

    let scrollViewStyles = { paddingBottom }

    const {
      enabled: enableArrows,
      leftIcon,
      rightIcon,
      iconColor,
      enableBackground,
      backgroundColor,
      backgroundRounding,
      enableBorder,
      borderSize,
      borderColor,
      iconSize,
    } = arrows
    const centerArrows = true
    const arrowsInScroll = centerArrows || paddingBottom === 0
    const leftArrow = (
      <Arrow
        name={leftIcon}
        color={iconColor}
        enableBackground={enableBackground}
        backgroundColor={backgroundColor}
        backgroundRounding={backgroundRounding}
        enableBorder={enableBorder}
        borderSize={borderSize}
        borderColor={borderColor}
        size={iconSize}
        onPress={this.handleLeftArrow}
        style={{ left: 8 }}
      />
    )
    const imageScrollView = (
      <ImageScrollView
        handleScroll={this.handleScroll}
        handlePress={this.handlePress}
        handleSnap={this.handleSnap}
        editor={editor}
        wrapperStyles={wrapperStyles}
        innerWrapper={innerWrapper}
        images={images}
        ref={this.scrollViewRef}
        handleScrollWeb={this.handleScrollWeb}
      />
    )
    const rightArrow = (
      <Arrow
        name={rightIcon}
        color={iconColor}
        enableBackground={enableBackground}
        backgroundColor={backgroundColor}
        backgroundRounding={backgroundRounding}
        enableBorder={enableBorder}
        borderSize={borderSize}
        borderColor={borderColor}
        size={iconSize}
        onPress={this.handleRightArrow}
        style={{ right: 8 }}
      />
    )
    const placeholder = <View style={styles.placeholder} />
    return (
      <View style={[styles.scrollViewWrapper]}>
        <View
          style={[
            styles.arrowScrollWrapper,
            scrollViewStyles,
            styles.scrollViewWrapper,
          ]}
        >
          {enableArrows && arrowsInScroll && leftArrow}
          {editor ? placeholder : imageScrollView}
          {enableArrows && arrowsInScroll && rightArrow}
        </View>
        <View style={styles.arrowDotsWrapper}>
          {dots.enabled && dots.showDots && (
            <Dots
              count={images.length}
              activeIndex={activeIndex}
              activeColor={activeColor}
              inactiveColor={inactiveColor}
              onChange={this.handleChange}
            />
          )}
          {dots.enabled && !dots.showDots && (
            <Numbers
              count={images.length}
              activeIndex={activeIndex}
              backgroundColor={dots.backgroundColor}
              rounding={dots.rounding}
              textColor={dots.textColor}
            />
          )}
        </View>
      </View>
    )
  }
}

export default ImageList
