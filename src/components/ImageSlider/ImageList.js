import React, { Component } from 'react'
import { View, Platform } from 'react-native'
import styles from './Styles'
import Dots from './Dots'
import Arrow from './Arrow'
import ImageScrollViewWeb from './ImageScrollView.web.js'
import ImageScrollViewMobile from './ImageScrollView.js'
import Numbers from './Numbers'

class ImageList extends Component {
  state = {
    activeIndex: 0,
  }

  componentDidMount() {
    const {
      autoplay: { enabled: enableAutoplay, autoplayTime },
      editor,
    } = this.props
    if (!editor && enableAutoplay) {
      this.startAutoplay(autoplayTime)
    }
  }

  componentWillUnmount() {
    clearInterval(this.autoplay)
  }

  clearAutoplay = () => {
    clearInterval(this.autoplay)
    const {
      autoplay: { enabled: enableAutoplay, autoplayTime },
    } = this.props
    if (enableAutoplay) this.startAutoplay(autoplayTime)
  }

  startAutoplay = time => {
    if (!time) return
    this.autoplay = setInterval(() => {
      const { activeIndex } = this.state
      const { images } = this.props
      if (activeIndex === images.length - 1) {
        this.handleChange(0, true)
      } else {
        this.handleChange(activeIndex + 1, true)
      }
    }, time * 1000)
  }

  isMobileDevice = () => {
    if (
      Platform.OS === 'ios' ||
      Platform.OS === 'android' ||
      /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        navigator.userAgent
      )
    ) {
      return true
    } else {
      return false
    }
  }

  calculateIndex = offsetX => {
    let { containerWidth } = this.props
    let index = Math.round(offsetX / containerWidth)

    return index
  }

  // Only used on mobile. Most of the scrolling logic is handled by handleSnap
  // and scrollTo on web.
  handleScroll = ({ nativeEvent }) => {
    let { activeIndex } = this.state
    let { x } = nativeEvent.contentOffset
    this.currentOffset = x
    let index = this.calculateIndex(x)

    if (index !== activeIndex) {
      this.setState({ activeIndex: index })
      this.clearAutoplay()
    }
  }

  // Callback on web when the drag scroll finishes the scroll event.
  // Checks where the scroll currently is, and snaps to closest image.
  handleSnap = (x, y, width, height) => {
    const { images } = this.props

    const imageWidth = width / images.length
    const activeImage = Math.round(x / imageWidth)
    const position = activeImage * imageWidth

    this.scrollTo(position, activeImage)
  }

  scrollTo = (position, index, autoplay = false) => {
    this.scrollView.scrollTo({ x: position, animated: true })
    const {
      images,
      autoplay: { enabled: enableAutoplay },
    } = this.props
    const { scrollAction } = images[index]
    if (scrollAction) scrollAction(index)

    this.setState({ activeIndex: index })

    if (!autoplay && enableAutoplay) this.clearAutoplay()
  }

  handleChange = (index, autoplay = false) => {
    let { containerWidth, images } = this.props
    let offset = Math.min(images.length - 1, index) * containerWidth

    this.scrollTo(offset, index, autoplay)
  }

  handleRightArrow = () => {
    this.clearAutoplay()
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
    this.clearAutoplay()
    const { activeIndex } = this.state
    if (activeIndex === 0) return
    this.handleChange(activeIndex - 1)
  }

  handlePress = i => () => {
    this.clearAutoplay()
    let { images } = this.props

    images[i] && images[i].action && images[i].action()
  }

  onClickWeb = () => {
    const { activeIndex } = this.state
    this.handlePress(activeIndex)()
  }

  scrollViewRef = el => {
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

    if (!images || typeof navigator.userAgent === undefined || !images[0]) {
      return <View></View>
    }

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

    const disableLeft = activeIndex === 0 && !editor
    const disableRight = activeIndex === images.length - 1

    const indicatorType = dots.showDots === undefined ? true : dots.showDots

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
        disabled={disableLeft}
      />
    )

    const imageScrollView = this.isMobileDevice() ? (
      <ImageScrollViewMobile
        handleScroll={this.handleScroll}
        handlePress={this.handlePress}
        handleSnap={this.handleSnap}
        editor={editor}
        wrapperStyles={wrapperStyles}
        innerWrapper={innerWrapper}
        images={images}
        ref={this.scrollViewRef}
        clearAutoplay={this.clearAutoplay}
      />
    ) : (
      <ImageScrollViewWeb
        handleScroll={this.handleScroll}
        handlePress={this.handlePress}
        handleSnap={this.handleSnap}
        editor={editor}
        wrapperStyles={wrapperStyles}
        innerWrapper={innerWrapper}
        images={images}
        ref={this.scrollViewRef}
        clearAutoplay={this.clearAutoplay}
        onClickWeb={this.onClickWeb}
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
        disabled={disableRight}
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
          {dots.enabled && indicatorType && (
            <Dots
              count={images.length}
              activeIndex={activeIndex}
              activeColor={activeColor}
              inactiveColor={inactiveColor}
              onChange={this.handleChange}
            />
          )}
          {dots.enabled && !indicatorType && (
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
