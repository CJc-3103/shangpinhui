const USER_ACCOUNT_KEY = 'UserAccount';
const USER_NAME_KEY = 'UserName';

const user = {
  get userAccount() {
    let account = localStorage.getItem(USER_ACCOUNT_KEY);
    if (account && account !== 'undefined') {
      return JSON.parse(account);
    }
    return undefined;
  },
  set userAccount(account) {
    localStorage.setItem(USER_ACCOUNT_KEY, JSON.stringify(account));
  },
  get userName() {
    let name = localStorage.getItem(USER_NAME_KEY);
    if (name && name !== 'undefined') {
      return JSON.parse(name);
    }
    return undefined;
  },
  set userName(name) {
    localStorage.setItem(USER_NAME_KEY, JSON.stringify(name));
  },
};

export default user;
