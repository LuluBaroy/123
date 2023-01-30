import { useCookies } from "vue3-cookies";
const { cookies } = useCookies();

export default function auth () {
  let user =  cookies.get('user')
  if (user && user.token) {
    return {'Authorization': 'Bearer ' + user.token}
  } else {
    return undefined
  }
}
