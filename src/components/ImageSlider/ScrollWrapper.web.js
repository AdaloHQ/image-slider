import React, { Component } from 'react'

export default class ScrollWrapper extends Component {
  handleWheel = e => {
    console.log('SCROLLING', e)
    e.stopPropagation()
  }

  componentDidMount() {
    this.el.addEventListener('wheel', this.handleWheel)
  }

  componentWillUnmount() {
    this.el.removeEventListener('wheel', this.handleWheel)
  }

  divRef = el => {
    this.el = el
  }

  render() {
    const { children } = this.props

    const styles = {
      width: '100%',
      height: '100%',
      display: 'flex',
    }

    return (
      <div style={styles} ref={this.divRef}>
        {children}
      </div>
    )
  }
}
