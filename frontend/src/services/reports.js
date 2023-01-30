import axios from 'axios'
import auth from '../services/auth'

const url1 = 'https://groupo123456789.herokuapp.com/api/report'
const url2 = 'https://groupo123456789.herokuapp.com/api/report/comment/'

class Reports {
  updatePostReport (id) {
    return axios.put(url1 + '/post/' + id, '', { headers: auth() })
      .catch(err => { throw err })
  }
  readAllReports () {
    return axios.get(url1, { headers: auth() })
      .catch(err => { throw err })
  }
  deleteOnePostReport (id) {
    return axios.delete(url1 + '/post/' + id, { headers: auth() })
      .catch(err => { throw err })
  }
  updateCommentReport (id) {
    return axios.put(url2 + id, '', { headers: auth() })
        .then(response => { console.log(response)})
      .catch(err => { throw err })
  }
  deleteOneCommentReport (id) {
    return axios.delete(url2 + id, { headers: auth() })
      .catch(err => { throw err })
  }
}

export default new Reports()
