import * as userAction from "../actions/users";
import Account from '../../helpers/Account';

const initialState = {
  requestStatus: '',
  allUsersStatus: '',
  user: {},
  users: [],
  myAccount: {},
  token: Account.getToken(),
  role: Account.getRole(),
  registerInfo: '',
  updateInfo: '',
  deleteInfo: '',
  errors: '',
  upErrors: '',
  delErrors: '',
  confirmResponse: [],
  confirmErrors: '',
  changePasswordInfo: [],
  changePasswordError: '',
}

export default function reducer(state = initialState, action) {

  switch ( action.type ) {
    case userAction.USER.REQUEST: {
      return {
        ...state,
        myAccount: {},
        // updateInfo: '',
        deleteInfo: '',
        requestStatus: 'request',
      }
    }
    case userAction.USER.SUCCESS: {
      const {user: myAccount} = action.payload.data;
      return {
        ...state,
        requestStatus: 'success',
        myAccount,
      }
    }
    case userAction.USER.FAIL: {
      return {
        ...state,
        requestStatus: 'fail',
      }
    }

    case userAction.ONE_USER.REQUEST: {
      return {
        ...state,
        user: {},
        requestStatus: 'request',
      }
    }
    case userAction.ONE_USER.SUCCESS: {
      const {user} = action.payload.data;
      return {
        ...state,
        requestStatus: 'success',
        user,
      }
    }
    case userAction.ONE_USER.FAIL: {
      return {
        ...state,
        requestStatus: 'fail',
      }
    }

    case userAction.ALL_USERS.REQUEST: {
      return {
        ...state,
        users: [],
        allUsersStatus: 'request',
      }
    }
    case userAction.ALL_USERS.SUCCESS: {
      const {users} = action.payload.data;
      return {
        ...state,
        allUsersStatus: 'success',
        users,
      }
    }
    case userAction.ALL_USERS.FAIL: {
      return {
        ...state,
        allUsersStatus: 'fail',
      }
    }

    case userAction.REGISTER.REQUEST: {
      return {
        ...state,
        registerInfo: '',
        requestStatus: 'request',
      }
    }
    case userAction.REGISTER.SUCCESS: {
      return {
        ...state,
        requestStatus: 'success',
        registerInfo: action.payload.data,
      }
    }
    case userAction.REGISTER.FAIL: {
      return {
        ...state,
        requestStatus: 'fail',
        errors: action.payload.data.errors,
      }
    }

    case userAction.USER_UPDATE.REQUEST: {
      return {
        ...state,
        updateInfo: '',
      }
    }
    case userAction.USER_UPDATE.SUCCESS: {
      return {
        ...state,
        upErrors: '',
        updateInfo: action.payload.data,
      }
    }
    case userAction.USER_UPDATE.FAIL: {
      return {
        ...state,
        upErrors: action.payload.data.errors,
      }
    }

    case userAction.USER_DELETE.SUCCESS: {
      return {
        ...state,
        requestStatus: 'success',
        deleteInfo: action.payload.data,
      }
    }
    case userAction.USER_DELETE.FAIL: {
      return {
        ...state,
        requestStatus: 'fail',
        delErrors: action.payload.data.errors,
      }
    }

    case userAction.LOGIN.REQUEST: {
      return {
        ...state,
        token: '',
        myAccount: {},
        requestStatus: 'request',
      }
    }
    case userAction.LOGIN.SUCCESS: {
      const {token, role, remember} = action.payload.data;
      Account.setToken(token, remember);
      Account.setRole(role, remember);
      return {
        ...state,
        requestStatus: 'success',
        token,
        role,
      }
    }
    case userAction.LOGIN.FAIL: {
      const {data} = action.payload;

      if (data.errors){
        return {
          ...state,
          requestStatus: 'fail',
          errors: data.errors,
        }
      } else{
        return {
          ...state,
          requestStatus: 'fail',
          errors: {
            password: data.message
          }
        }
      }
    }

    case userAction.RESET_PASSWORD.REQUEST: {
      return {
        ...state,
        confirmResponse: [],
        requestStatus: 'request',
      }
    }
    case userAction.RESET_PASSWORD.SUCCESS: {
      const {data} = action.payload;
      return {
        ...state,
        requestStatus: 'success',
        confirmResponse: data,
      }
    }
    case userAction.RESET_PASSWORD.FAIL: {
      const {data} = action.payload;
      return {
        ...state,
        requestStatus: 'fail',
        confirmErrors: data.errors,
      }
    }
    case userAction.CHANGE_PASSWORD.REQUEST: {
      return {
        ...state,
        changePasswordInfo: [],
        requestStatus: 'request',
      }
    }
    case userAction.CHANGE_PASSWORD.SUCCESS: {
      const {data} = action.payload;
      return {
        ...state,
        requestStatus: 'success',
        changePasswordInfo: data,
        changePasswordError: '',
      }
    }
    case userAction.CHANGE_PASSWORD.FAIL: {
      const {data} = action.payload;
      return {
        ...state,
        requestStatus: 'fail',
        changePasswordError: data.errors,
      }
    }

    case userAction.USER_TOKEN_DELETE: {
      Account.delete();
      return {
        ...state,
        token: '',
        myAccount: {},
        role: '',
      }
    }

    case userAction.USER_INFO_DELETE: {
      return {
        ...state,
        registerInfo: '',
        updateInfo: '',
        deleteInfo: '',
        errors: '',
        upErrors: '',
        delErrors: '',
      }
    }

    default: {
      return state;
    }
  }
}
