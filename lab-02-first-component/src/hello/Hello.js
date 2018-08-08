import React, { Component } from 'react'

export default class Hello extends Component {
    constructor(props) {
        super(props);
        this.state = {
            greeting: "Yowza"
        }
    }
  render() {
    return (
      <div className="hello">
        <h1><marquee>{this.state.greeting}</marquee></h1>
        <h2>{this.props.friend}</h2>
        <p>Congrats on your (not even close to) first component</p>
      </div>
    )
  }
}

Hello.defaultProps = {
    friend: "Partner"
}
