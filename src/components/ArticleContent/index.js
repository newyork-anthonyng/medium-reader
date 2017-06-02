import React, { PureComponent } from 'react'
import T from 'prop-types'

class ArticleContent extends PureComponent {
  render () {
    if (this.props.isLoading) {
      return <h1>Fetching medium content</h1>
    }

    if (this.props.text) {
      return <p>{this.props.text}</p>
    }

    return null
  }
}

ArticleContent.propTypes = {
  isLoading: T.bool,
  text: T.string
}

export default ArticleContent
