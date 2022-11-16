const USER_NAME_KEY = 'UserName';

export default {
    get userName() {
        return JSON.parse(localStorage.getItem(USER_NAME_KEY))
    },
    set userName(name) {
        console.log('name', name)
        localStorage.setItem(USER_NAME_KEY, JSON.stringify(name))
    },
}