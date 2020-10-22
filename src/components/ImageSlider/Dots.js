import React, { Component } from 'react'
import { View, TouchableOpacity } from 'react-native'
import styles from './Styles'

const HIT_SLOP = {
  top: 4,
  bottom: 4,
  left: 4,
  right: 4,
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
        {data.map(({ key, active }, index) => (
          <TouchableOpacity
            key={index}
            onPress={this.handlePress(key)}
            hitSlop={HIT_SLOP}
          >
            <View
              style={[
                styles.dot,
                { backgroundColor: active ? activeColor : inactiveColor },
              ]}
            />
          </TouchableOpacity>
        ))}
      </View>
    )
  }
}

export default Dots
