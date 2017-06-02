import axios from 'axios'

const ROOT_URL = process.env.PORT || 'http://localhost:3000'

const getMediumText = (mediumLink) => {
  return axios.get(`${ROOT_URL}/medium?mediumLink=${mediumLink}`)
    .then((response) => {
      return response.data && response.data.data
    })
    .catch((err) => {
      console.error(err.stack || err)
      return Promise.resolve()
    })
}

export default getMediumText
