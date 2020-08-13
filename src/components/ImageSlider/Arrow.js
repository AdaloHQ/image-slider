import React, { Component } from 'react'
import { View } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialIcons'

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
      display: 'flex',
      alignSelf: 'center',
      alignItems: 'center',
      justifyContent: 'center',
      position: 'absolute',
      zIndex: 2,
    }
    return (
      <View style={{ ...viewStyle, ...style }}>
        <Icon name={name} color={color} size={size} onPress={onPress} />
      </View>
    )
  }
}

Arrow.defaultProps = {
  style: {},
}

export default Arrow
