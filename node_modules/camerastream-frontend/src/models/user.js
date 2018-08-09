import JwtDecode from 'jwt-decode'

export default class User {
  static from (token) {
    try {
      let obj = JwtDecode(token)
      return new User(obj)
    } catch (_) {
      return null
    }
  }
  // eslint-disable-next-line
  constructor ({ user_id, admin }) {
    // eslint-disable-next-line
    this.id = user_id
    this.admin = admin
  }

  get isAdmin () {
    return this.admin
  }
}
