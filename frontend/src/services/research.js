import axios from 'axios'
import auth from './auth'
const url = 'https://groupo123456789.herokuapp.com/api/research'

class ResearchRoute {
  researchUser (data) {
    return axios.post(url, data, { headers: auth() })
      .catch(error => {
        throw error
      })
  }
}
export default new ResearchRoute()
