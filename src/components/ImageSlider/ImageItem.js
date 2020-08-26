import React, { Component } from 'react'
import { Image } from 'react-native'
import styles from './Styles'

class ImageItem extends Component {
  render() {
    let { image } = this.props

    return <Image style={styles.image} resizeMode="cover" source={image} />
  }
}

export default ImageItem
