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
    } = this.props
    const viewHeight =
      size + (enableBackground && enableBorder ? borderSize : 0)
    const viewStyle = {
      backgroundColor: enableBackground ? backgroundColor : null,
      borderRadius: enableBackground ? backgroundRounding : null,
      borderColor: enableBorder && enableBackground ? borderColor : null,
      borderWidth: enableBorder && enableBackground ? borderSize : null,
      height: viewHeight,
      alignSelf: 'center',
      justifyContent: 'center',
      alignItems: 'center',
    }
    return (
      <View style={viewStyle}>
        <Icon name={name} color={color} size={size} onPress={onPress} />
      </View>
    )
  }
}

export default Arrow
