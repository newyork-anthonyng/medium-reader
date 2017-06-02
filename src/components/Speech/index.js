/* global SpeechSynthesisUtterance */

/*
 * https://developer.mozilla.org/en-US/docs/Web/API/SpeechSynthesis
 */
import React, { Component } from 'react'
import T from 'prop-types'
import speechChunker from '../../utility/speechUtteranceChunker'

class Speech extends Component {
  constructor () {
    super()

    this.state = {
      voices: [],
      selectedVoice: ''
    }

    this.speak = this.speak.bind(this)
    this.pause = this.pause.bind(this)
    this.play = this.play.bind(this)
    this.handleVoiceChange = this.handleVoiceChange.bind(this)
  }

  componentDidMount () {
    /*
     * The SpeechSynthesis voices gets loaded async
     * https://developer.mozilla.org/en-US/docs/Web/API/SpeechSynthesis/onvoiceschanged
     */
    window.speechSynthesis.onvoiceschanged = () => {
      const voices = window.speechSynthesis.getVoices()
      /*
       * Store all voices in an Object, with each key being the voices name
       */
      this.voicesMap = {}
      voices.forEach((voice) => {
        this.voicesMap[voice.name] = voice
      })

      this.setState({
        voices,
        selectedVoice: 'Google US English'
      })
    }
  }

  speak (text) {
    window.speechSynthesis.cancel()

    /*
     * Create a new utterance with the selected voice, and at 0.8 playback speed
     */
    const msg = new SpeechSynthesisUtterance(text)
    msg.voice = this.voicesMap[this.state.selectedVoice]
    msg.rate = 0.8

    speechChunker(msg, {
      chunkLength: 120
    }, this.props.onEnd)
  }

  play (text) {
    if (window.speechSynthesis.paused) {
      window.speechSynthesis.resume()
    } else {
      this.speak(text)
    }
  }

  pause () {
    window.speechSynthesis.pause()
  }

  handleVoiceChange (e) {
    this.setState({
      selectedVoice: e.target.value
    })
  }

  render () {
    return (
      <div>
        <select value={this.state.selectedVoice} onChange={this.handleVoiceChange}>
          {this.state.voices.map((voice) =>
            <option key={voice.name} value={voice.name}>{voice.name}</option>
          )}
        </select>
      </div>
    )
  }
}

Speech.propTypes = {
  onEnd: T.func
}

export default Speech
