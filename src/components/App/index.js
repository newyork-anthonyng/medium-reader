/* global SpeechSynthesisUtterance */
import React, { Component } from 'react'
import axios from 'axios'

const ROOT_URL = process.env.PORT || 'http://localhost:3000'

class App extends Component {
  constructor () {
    super()

    this.state = {
      linkInputValue: '',
      articleContent: ''
    }

    this.handleLinkInputChange = this.handleLinkInputChange.bind(this)
    this.handleGetTextClick = this.handleGetTextClick.bind(this)
    this.handleSpeakClick = this.handleSpeakClick.bind(this)
  }

  handleLinkInputChange (e) {
    this.setState({
      linkInputValue: e.target.value
    })
  }

  handleGetTextClick () {
    if (!this.state.linkInputValue) return

    axios.get(`${ROOT_URL}/medium?mediumLink=${this.state.linkInputValue}`)
      .then((response) => {
        const articleContent = response.data && response.data.data
        if (articleContent) {
          this.setState({
            articleContent
          })
        }
      })
  }

  handleSpeakClick () {
    const msg = new SpeechSynthesisUtterance(this.state.articleContent)
    window.speechSynthesis.speak(msg)
  }

  render () {
    return (
      <div>
        <input
          type='text'
          value={this.state.linkInputValue}
          onChange={this.handleLinkInputChange}
        />
        <button onClick={this.handleGetTextClick}>Get Text</button>
        <button onClick={this.handleSpeakClick}>Read To Me</button>
        {
          this.state.articleContent &&
            <p>{this.state.articleContent}</p>
        }
      </div>
    )
  }
}

export default App
