/* global describe, it, expect */
const myModule = require('./utility')
const {
  verifyMediumLink
} = myModule

describe('verifyMediumLink', () => {
  it('should return link if valid', () => {
    const link = 'https://medium.com'

    expect(verifyMediumLink(link)).toEqual(link)
  })

  it('should prepend with https', () => {
    const invalidLink = 'medium.com'

    expect(verifyMediumLink(invalidLink)).toMatchSnapshot()
  })

  it('should work with malformed links', () => {
    const invalidLink = 'uhohsomethinghappenedmedium.com/foobar'

    expect(verifyMediumLink(invalidLink)).toMatchSnapshot()
  })
})
