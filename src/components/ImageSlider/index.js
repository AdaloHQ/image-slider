import React, { Component } from 'react'
import { Platform, Image, ScrollView, Text, View, TouchableOpacity, TouchableWithoutFeedback, StyleSheet } from 'react-native'

class ImageItem extends Component {
  render() {
    let { image } = this.props

    return (
      <Image style={styles.image} resizeMode="cover" source={image} />
    )
  }
}

class Images extends Component {
  state = {
    activeIndex: 0,
  }

  calculateIndex = offsetX => {
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

  handleChange = index => {
    let { containerWidth, images } = this.props
    let offset = Math.min(images.length - 1, index) * containerWidth

    this.scrollView.scrollTo({ x: offset, animated: true })

    this.setState({ activeIndex: index })
  }

  handlePress = i => () => {
    let { images } = this.props

    images[i] && images[i].action && images[i].action()
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
    } = this.props

    let { activeIndex } = this.state

    let wrapperStyles = {
      width: images.length * containerWidth,
    }

    let innerWrapper = {
      height: containerHeight,
    }

    let scrollViewStyles = { paddingBottom }

    return (
      <View style={[styles.scrollViewWrapper, scrollViewStyles]}>
        {editor ? (
          <View style={styles.placeholder} />
        ) : (
          <ScrollView
            horizontal
            pagingEnabled
            style={[styles.scrollView]}
            ref={this.scrollViewRef}
            onScroll={this.handleScroll}
            scrollEventThrottle={0}
            showsHorizontalScrollIndicator={false}
          >
            <View style={[styles.imageContainer, wrapperStyles]}>
              {!editor && images.map(({ id, image }, i) => (
                <TouchableWithoutFeedback onPress={this.handlePress(i)}>
                  <View style={[styles.imageWrapper, innerWrapper]}>
                    <ImageItem
                      key={id}
                      image={image}
                    />
                  </View>
                </TouchableWithoutFeedback>
              ))}
            </View>
          </ScrollView>
        )}
        <Dots
          count={images.length}
          activeIndex={activeIndex}
          activeColor={activeColor}
          inactiveColor={inactiveColor}
          onChange={this.handleChange}
        />
      </View>
    )
  }
}

class Dots extends Component {
  getData = () => {
    let { count, activeIndex } = this.props
    let data = []

    for (let i = 0; i < count; i += 1) {
      data.push({ key: i, active: i === activeIndex })
    }

    return data
  }

  handlePress = index => () => {
    let { onChange } = this.props

    onChange(index)
  }

  render() {
    let { activeColor, inactiveColor } = this.props
    let data = this.getData()

    return (
      <View style={styles.dotsWrapper}>
        {data.map(({ key, active }) => (
          <TouchableOpacity onPress={this.handlePress(key)}>
            <View
              style={[
                styles.dot,
                { backgroundColor: active ? activeColor : inactiveColor }
              ]}
            />
          </TouchableOpacity>
        ))}
      </View>
    )
  }
}

class ImageSlider extends Component {
  static defaultProps = {
    images: [],
    dots: {},
  }

  state = {
    width: null,
    height: null,
  }

  handleLayout = ({ nativeEvent }) => {
    const { editor } = this.props

    if (editor) return

    const { width, height } = (nativeEvent && nativeEvent.layout) || {}
    const { width: prevWidth, height: prevHeight } = this.state

    if (width !== prevWidth || height !== prevHeight) {
      this.setState({ width, height })
    }   
  }

  getDimensions() {
    let { editor, _width, _height } = this.props

    if (editor) {
      return { width: _width, height: _height }
    }

    return this.state
  }

  render() {
    const { width, height } = this.getDimensions()
    const { images, dots, editor } = this.props
    const { activeColor, inactiveColor, position: dotPosition } = dots

    if (width === null || height === null) {
      return <View style={styles.wrapper} onLayout={this.handleLayout} />
    }

    return (
      <View style={styles.wrapper} onLayout={this.handleLayout}>
        <Images
          editor={editor}
          images={images}
          containerWidth={width}
          containerHeight={height}
          paddingBottom={dotPosition === 'inside' ? 0 : 40}
          activeColor={activeColor}
          inactiveColor={inactiveColor}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    height: '100%',
  },
  dotsWrapper: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginLeft: 4,
    marginRight: 4,
    backgroundColor: '#eee',
  },
  scrollViewWrapper: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
    ...Platform.select({
      web: {
        scrollSnapType: 'x mandatory'
      }
    }),
  },
  imageContainer: {
    flexDirection: 'row',
    flex: 1,
    height: '100%',
  },
  imageWrapper: {
    flex: 1,
    scrollSnapAlign: 'start',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  placeholder: {
    flex: 1,
    backgroundColor: '#eee',
  },
})

export default ImageSlider
