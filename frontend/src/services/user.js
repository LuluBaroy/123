import axios from 'axios'
import auth from '../services/auth'
const url = 'https://groupo123456789.herokuapp.com/api/auth/'
import { useCookies } from "vue3-cookies";
const { cookies } = useCookies();

class UserRoutes {
  registerUser (formData) {
    return axios.post(url + 'signup', formData)
      .catch((err) => {
        throw err
      })
  }
  logUser (data) {
    return axios.post(url + 'login', data)
      .then(response => {
        cookies.get('user')
        if (cookies.get('user') === null || cookies.get('user').user_id !== response.data.user_id) {
          cookies.set('user', response.data, '1d')
        }
      }).catch((err) => {
        throw err
      })
  }
  updateUser (payload) {
    return axios.put(url + payload.userId, payload.formData, { headers: auth() })
      .catch((err) => {
        throw err
      })
  }
  deleteUser (id) {
    return axios.delete(url + id, { headers: auth() })
      .catch((err) => {
        throw err
      })
  }
  getAllUser () {
    return axios.get(url, { headers: auth() })
  }
  getOneUser (id) {
    return axios.get(url + id, { headers: auth() })
      .catch((err) => {
        throw err
      })
  }
  getCurrentUser () {
    let userId = cookies.get('user').user_id
    return axios.get(url + userId, { headers: auth() })
      .catch((err) => {
        throw err
      })
  }
  updatePrivilege (id) {
      return axios.put(url + id + '/update_privilege', '', { headers: auth() })
          .catch((err) => {
              throw err
          })
  }
}

export default new UserRoutes()
