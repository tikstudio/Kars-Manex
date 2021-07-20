import { define } from "../../helpers/redux-request";
import Api from "../../Api";

export const LOGIN = define('LOGIN');

export function postLoginRequest(formData) {
  return LOGIN.request(() => Api.login(formData)).takeLatest();
}

export const REGISTER = define('REGISTER');

export function registerRequest(formData, uploadProcess, cb) {
  return REGISTER.request(() => Api.register(formData, uploadProcess, cb)).takeLatest();
}

export const USER = define('USER');

export function getUserRequest() {
  return USER.request(() => Api.getUsers()).takeLatest();
}

export const ONE_USER = define('ONE_USER');

export function getOneUser(id) {
  return ONE_USER.request(() => Api.getUser(id)).takeLatest();
}

export const ALL_USERS = define('ALL_USERS');

export function allUsers(s, sortKey, sortValue) {
  return ALL_USERS.request(() => Api.getAllUsers(s, sortKey, sortValue)).takeLatest();
}

export const RESET_PASSWORD = define('RESET_PASSWORD');

export function resetPassword(email) {
  return RESET_PASSWORD.request(() => Api.sendEmail(email)).takeLatest();
}

export const CHANGE_PASSWORD = define('CHANGE_PASSWORD');

export function changePassword(activationCode, password) {
  return CHANGE_PASSWORD.request(() => Api.changePasswordRequest(activationCode, password)).takeLatest();
}

export const USER_UPDATE = define('USER_UPDATE');

export function updateUser(formData, uploadProcess, cb) {
  return USER_UPDATE.request(() => Api.userUpdate(formData, uploadProcess, cb)).takeLatest();
}

export const USER_DELETE = define('USER_DELETE');

export function deleteUser(id) {
  return USER_DELETE.request(() => Api.userDelete(id)).takeLatest();
}

export const USER_TOKEN_DELETE = 'USER_TOKEN_DELETE';

export function deleteToken() {
  return {
    type: USER_TOKEN_DELETE,
    payload: {}
  }
}

export const USER_INFO_DELETE = 'USER_INFO_DELETE';

export function userInfoDelete() {
  return {
    type: USER_INFO_DELETE,
    payload: {}
  }
}
