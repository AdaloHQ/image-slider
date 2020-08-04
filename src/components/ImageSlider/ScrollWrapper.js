import React, { Component } from 'react'

export default class ScrollWrapper extends Component {
  render() {
    let { children } = this.props

    return (
      <React.Fragment>
        {children}
      </React.Fragment>
    )
  }
}
