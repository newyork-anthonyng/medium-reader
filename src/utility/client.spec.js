/* global jest, describe, it, expect */
import getMediumText from './client'
import axios from 'axios'

describe('getMediumText', () => {
  it('should call correct link', () => {
    const mediumLink = 'someMediumLink.com'

    return getMediumText(mediumLink).then(() => {
      expect(axios.get).toHaveBeenCalledTimes(1)
      expect(axios.get.mock.calls[0][0]).toMatchSnapshot()
    })
  })

  it('should return Promise', () => {
    const mediumLink = 'someMediumLink.com'

    const result = getMediumText(mediumLink)
    expect(typeof result.then).toEqual('function')
    return result
  })

  it('should return correct response information', () => {
    const mediumLink = 'someMediumLink.com'
    axios.get = jest.fn(() => {
      return Promise.resolve({
        data: {
          data: 'This is some text from medium.com'
        }
      })
    })

    return getMediumText(mediumLink).then((data) => {
      expect(data).toMatchSnapshot()
    })
  })

  it('should handle rejection gracefully', () => {
    const mediumLink = 'someMediumLink.com'
    axios.get = jest.fn(() => {
      return Promise.reject(new Error('Uh oh, something happened'))
    })

    const result = getMediumText(mediumLink)
    expect(typeof result.then).toEqual('function')
  })
})
