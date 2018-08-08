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

  set setName (name) {
    this._name = name
  }

  get getName () {
    return this._name
  }

  set setUsername (username) {
    this._username = username
  }

  get getUsername () {
    return this._username
  }

  set setEmail (email) {
    this._email = email
  }

  get getEmail () {
    return this._email
  }

  get isAdmin () {
    return this.admin
  }
}
