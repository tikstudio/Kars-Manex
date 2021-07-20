import _ from 'lodash';

class Account {
    static get() {
        try {
            return JSON.parse(localStorage.getItem('account')) || {};
        } catch (e) {
            return {};
        }
    }

    static set(account) {
        localStorage.setItem('account', JSON.stringify(account));
    }

    static getToken() {
        if (!_.isEmpty(localStorage.getItem('token'))) {
            return localStorage.getItem('token')
        } else {
            return sessionStorage.getItem('token');
        }

    }

    static setToken(token, remember) {
        if (remember) {
            localStorage.setItem('token', token);
        } else {
            sessionStorage.setItem('token', token);
        }
    }

    static getRole() {
        if (!_.isEmpty(localStorage.getItem('role'))) {
            return localStorage.getItem('role');
        } else {
            return sessionStorage.getItem('role');
        }

    }

    static setRole(role, remember) {
        if (remember) {
            localStorage.setItem('role', role);
        } else {
            sessionStorage.setItem('role', role);
        }
    }

    static delete() {
        localStorage.removeItem('account');
        localStorage.removeItem('token');
        localStorage.removeItem('role');
        sessionStorage.removeItem('account');
        sessionStorage.removeItem('token');
        sessionStorage.removeItem('role');
    }
}

export default Account
