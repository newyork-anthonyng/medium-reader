import React, { Component } from 'react';
import T from 'prop-types';

class Speech extends Component {
  constructor() {
    super();

    this.state = {
      speechSupported: false,
    };
  }

  componentDidMount() {
    this.setState({
      speechSupported: 'speechSynthesis' in window,
    });
  }

  speak() {
    console.log('hello world');
  }

  render() {
    return null;
  }
}

Speech.propTypes = {
  text: T.string,
}

export default Speech;
