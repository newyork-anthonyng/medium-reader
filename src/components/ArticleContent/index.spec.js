/* global describe, it, expect */

import React from 'react'
import { shallow } from 'enzyme'
import toJSON from 'enzyme-to-json'
import ArticleContent from './'

describe('ArticleContent', () => {
  const defaultProps = {
    isLoading: false,
    text: 'This is my awesome article'
  }

  it('should render correctly when loading', () => {
    const wrapper = shallow(
      <ArticleContent
        {...defaultProps}
        isLoading
      />
    )

    expect(toJSON(wrapper)).toMatchSnapshot()
  })

  it('should render correctly when there is text', () => {
    const wrapper = shallow(
      <ArticleContent {...defaultProps} />
    )

    expect(toJSON(wrapper)).toMatchSnapshot()
  })

  it('should render correctly when not loading and no text', () => {
    const wrapper = shallow(
      <ArticleContent
        {...defaultProps}
        isLoading={false}
        text=''
      />
    )

    expect(toJSON(wrapper)).toMatchSnapshot()
  })
})
