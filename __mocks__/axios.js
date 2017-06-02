/* global jest */
const mockAxios = {
  get: jest.fn(() => {
    return Promise.resolve({})
  })
}

export default mockAxios
