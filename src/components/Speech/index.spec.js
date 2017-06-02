/* global jest, describe, it, expect, beforeEach */

import React from 'react'
import { mount } from 'enzyme'
import toJSON from 'enzyme-to-json'
import Speech from './'
import speechChunker from '../../utility/speechUtteranceChunker'

jest.mock('../../utility/speechUtteranceChunker')

beforeEach(() => {
  speechChunker.mockClear()

  window.speechSynthesis = {
    speak: jest.fn(),
    resume: jest.fn(),
    pause: jest.fn(),
    cancel: jest.fn(),
    getVoices: jest.fn(() => {
      return [
        { name: 'Voice 1' },
        { name: 'Voice 2' },
        { name: 'Voice 3' },
        { name: 'Google US English' }
      ]
    })
  }
  window.SpeechSynthesisUtterance = jest.fn((text) => ({ text }))
})

const defaultProps = {
  onEnd: () => {}
}

describe('Speech', () => {
  describe('when mounting', () => {
    it('should create voicesMap when component mounts', () => {
      const wrapper = mount(
        <Speech {...defaultProps} />
      )
      window.speechSynthesis.onvoiceschanged()

      expect(wrapper.instance().voicesMap).toMatchSnapshot()
    })

    it('should set default voice when SpeechSynthesis voices loads', () => {
      const wrapper = mount(
        <Speech {...defaultProps} />
      )
      window.speechSynthesis.onvoiceschanged()

      expect(wrapper.state()).toMatchSnapshot()
    })
  })

  it('should render <select> and <options> correctly', () => {
    const wrapper = mount(
      <Speech {...defaultProps} />
    )
    window.speechSynthesis.onvoiceschanged()

    expect(toJSON(wrapper)).toMatchSnapshot()
  })

  it('should add new Utterance and clear out old ones when speaking', () => {
    const cb = jest.fn()
    const wrapper = mount(
      <Speech
        {...defaultProps}
        onEnd={cb}
      />
    )
    window.speechSynthesis.onvoiceschanged()
    const speech = 'Hello World'

    wrapper.instance().speak(speech)

    expect(window.speechSynthesis.cancel).toHaveBeenCalledTimes(1)
    expect(speechChunker).toHaveBeenCalledTimes(1)
    expect(speechChunker.mock.calls[0]).toMatchSnapshot()
    expect(speechChunker.mock.calls[0][2]).toEqual(cb)
  })

  describe('when playing', () => {
    it('should resume if it was previously paused', () => {
      const wrapper = mount(
        <Speech {...defaultProps} />
      )
      window.speechSynthesis.onvoiceschanged()
      window.speechSynthesis.paused = true

      wrapper.instance().play()

      expect(window.speechSynthesis.resume).toHaveBeenCalledTimes(1)
      expect(speechChunker).toHaveBeenCalledTimes(0)
    })

    it('should create new Utterance if it was not previously paused', () => {
      const wrapper = mount(
        <Speech {...defaultProps} />
      )
      window.speechSynthesis.onvoiceschanged()
      window.speechSynthesis.paused = false

      wrapper.instance().play()

      expect(window.speechSynthesis.resume).toHaveBeenCalledTimes(0)
      expect(speechChunker).toHaveBeenCalledTimes(1)
    })
  })

  it('should pause', () => {
    const wrapper = mount(
      <Speech {...defaultProps} />
    )
    window.speechSynthesis.onvoiceschanged()

    wrapper.instance().pause()

    expect(window.speechSynthesis.pause).toHaveBeenCalledTimes(1)
  })

  it('should update <select> when changing options', () => {
    const wrapper = mount(
      <Speech {...defaultProps} />
    )
    window.speechSynthesis.onvoiceschanged()
    const selectTag = wrapper.find('select')

    selectTag.simulate('change', { target: { value: 'Batman' } })
    expect(wrapper.state().selectedVoice).toMatchSnapshot()
  })
})
