const tokenKey = 'token';

export default {
  get token() {
    return JSON.parse(localStorage.getItem(tokenKey));
  },
  set token(token) {
    console.log('token', token)
    localStorage.setItem(tokenKey, JSON.stringify(token));
  },
};
