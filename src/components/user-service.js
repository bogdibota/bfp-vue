/* eslint-disable class-methods-use-this */
const accessTokenKey = 'tokenKey';
const loggedInKey = 'loggedInToken';
class UserService {
  isLoggedIn() {
    return localStorage.getItem(loggedInKey);
  }

  getAccessToken() {
    return localStorage.getItem(accessTokenKey);
  }

  setAccessToken(accessToken) {
    localStorage.setItem(accessTokenKey, accessToken);
  }

  login(accessToken) {
    this.setAccessToken(accessToken);
    localStorage.setItem(loggedInKey, true);
  }

  logout() {
    localStorage.clear();
  }
}
export default new UserService();
