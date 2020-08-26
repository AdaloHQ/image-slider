import React, { Component } from 'react'
import { View, TouchableOpacity } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialIcons'
import styles from './Styles'

const HIT_SLOP = {
  top: 4,
  bottom: 4,
  left: 4,
  right: 4,
}

class Arrow extends Component {
  render() {
    const {
      name,
      color,
      enableBackground,
      backgroundColor,
      backgroundRounding,
      enableBorder,
      borderSize,
      borderColor,
      size,
      onPress,
      style,
      disabled,
    } = this.props

    const viewHeight =
      size + (enableBackground && enableBorder ? borderSize : 0)

    const viewStyle = {
      backgroundColor: enableBackground ? backgroundColor : null,
      borderRadius: enableBackground ? backgroundRounding : null,
      borderColor: enableBorder && enableBackground ? borderColor : null,
      borderWidth: enableBorder && enableBackground ? borderSize : null,
      height: viewHeight,
      width: viewHeight,
      opacity: disabled ? 0.5 : 1,
    }
    return (
      <TouchableOpacity
        onPress={disabled ? null : onPress}
        style={[viewStyle, style, styles.arrowView]}
        hitSlop={HIT_SLOP}
        disabled={disabled}
      >
        <Icon name={name} color={color} size={size} />
      </TouchableOpacity>
    )
  }
}

Arrow.defaultProps = {
  style: {},
}

export default Arrow
