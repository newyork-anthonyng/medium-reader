import React, { Component } from 'react'
import Speech from '../Speech'
import ArticleContent from '../ArticleContent'
import getMediumText from '../../utility/client'

class App extends Component {
  constructor () {
    super()

    this.state = {
      linkInputValue: '',
      articleContent: '',
      isFetchingArticleContent: false,
      isSpeaking: false
    }

    this.handleLinkInputChange = this.handleLinkInputChange.bind(this)
    this.handleGetTextClick = this.handleGetTextClick.bind(this)
    this.handleSpeakClick = this.handleSpeakClick.bind(this)
    this.handleResumeClick = this.handleResumeClick.bind(this)
    this.handlePauseClick = this.handlePauseClick.bind(this)

    this.renderMediaButton = this.renderMediaButton.bind(this)
  }

  handleLinkInputChange (e) {
    this.setState({
      linkInputValue: e.target.value
    })
  }

  handleGetTextClick () {
    if (!this.state.linkInputValue) return

    this.setState({ isFetchingArticleContent: true }, () => {
      getMediumText(this.state.linkInputValue)
        .then((articleContent) => {
          this.setState({
            articleContent,
            isFetchingArticleContent: false
          })
        })
    })
  }

  handleSpeakClick () {
    if (this.speech) {
      this.speech.speak(this.state.articleContent)
      this.setState({ isSpeaking: true })
    }
  }

  handlePauseClick () {
    if (this.speech) {
      this.setState({ isSpeaking: false })
      this.speech.pause()
    }
  }

  handleResumeClick () {
    if (this.speech) {
      this.setState({ isSpeaking: true })
      this.speech.play(this.state.articleContent)
    }
  }

  renderMediaButton () {
    if (!this.state.articleContent) return null

    const buttons = []
    buttons[0] = <button key={0} onClick={this.handleSpeakClick}>Start from Beginning</button>

    buttons[1] = this.state.isSpeaking
      ? <button key={1} onClick={this.handlePauseClick}>Pause</button>
      : <button key={1} onClick={this.handleResumeClick}>Resume</button>

    return buttons
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

        <Speech
          ref={(speech) => { this.speech = speech }}
          onEnd={() => {
            this.setState({ isSpeaking: false })
          }}
        />
        { this.renderMediaButton() }

        <ArticleContent
          isLoading={this.state.isFetchingArticleContent}
          text={this.state.articleContent}
        />
      </div>
    )
  }
}

export default App
