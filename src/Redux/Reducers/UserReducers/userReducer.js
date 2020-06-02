import {
  USER_LOGIN_SUCCESS,
  USER_LOGIN_FAIL,
  USER_LOGIN_REQUEST,
  USER_LOGOUT_REQUEST,
  USER_LOGOUT_SUCCESS,
  USER_LOAD_FAIL,
  USER_LOAD_REQUEST,
  USER_LOAD_SUCCESS,
  CHECK_LOGGED_IN,
  CHECK_LOGGED_IN_SUCCESS,
  CHECK_LOGGED_IN_FAIL,
  AUTO_LOGOUT_REQUEST,
  AUTO_LOGOUT_SUCCESS,
  RESET_LOAD_USER,
  CHECK_IF_ADMIN_FAIL,
  CHECK_IF_ADMIN,
  CHECK_IF_ADMIN_SUCCESS,
  SET_USER_LANGUAGE,
  SET_USER_LANGUAGE_SUCCESS,
  RESET_LANGUAGE_PROPS,
} from "../../Actions/UserActions/userActions";
import storage from "redux-persist/lib/storage";
import { persistReducer } from "redux-persist";

const initialState = {
  session: "",
  lex: "",
  user: {},
  loadLogin: false,
  loadedUser: false,
  LoggedIn: false,
  autoDisconnect: false,
  initialLogin: false,
  initLoadUser: false,
  changeLanguageSuccess: false,
};

function userReducer(state = initialState, action) {
  switch (action.type) {
    case CHECK_LOGGED_IN:
      return {
        ...state,
        autoDisconnect: false,
        loadLogin: false,
      };
    case CHECK_LOGGED_IN_SUCCESS:
      if (action.payload === true) {
        return {
          ...state,
          loadLogin: false,
          session: document.cookie.match("connect.sid").input,
          LoggedIn: true,
        };
      } else {
        return {
          ...state,
          autoDisconnect: true,
          loadLogin: true,
          session: "",
          lex: "",
          LoggedIn: false,
        };
      }
    case CHECK_LOGGED_IN_FAIL:
      return {
        ...state,
        loadLogin: true,
        LoggedIn: false,
      };
    case USER_LOGIN_REQUEST:
      return {
        loadLogin: true,
      };
    case USER_LOGIN_SUCCESS:
      return {
        ...state,
        session: document.cookie.match("connect.sid").input,
        loadLogin: false,
        LoggedIn: true,
      };
    case USER_LOGIN_FAIL:
      return {
        ...state,
        loadLogin: true,
        LoggedIn: false,
      };
    case USER_LOGOUT_REQUEST:
      return {};
    case USER_LOGOUT_SUCCESS:
      return {
        ...state,
        lex: "",
        session: "",
        loadLogin: true,
        LoggedIn: false,
        loadedUser: false,
        user: {},
      };
    case AUTO_LOGOUT_REQUEST:
      return {};
    case AUTO_LOGOUT_SUCCESS:
      return {
        ...state,
        lex: "",
        session: "",
        loadLogin: true,
        LoggedIn: false,
        loadedUser: false,
        user: {},
      };
    case USER_LOAD_REQUEST:
      return {
        ...state,
        LoggedIn: true,
      };
    case USER_LOAD_SUCCESS:
      return {
        ...state,
        LoggedIn: true,
        loadedUser: true,
        lex: action.payload._id,
        user: { ...action.payload },
      };
    case USER_LOAD_FAIL:
      return {
        ...state,
        user: {},
        session: "",
        autoDisconnect: true,
        loadedUser: false,
        LoggedIn: false,
      };
    case CHECK_IF_ADMIN:
      return {
        ...state,
      };
    case CHECK_IF_ADMIN_SUCCESS:
      return {
        ...state,
        initLoadUser: true,
        user: { ...action.payload },
      };
    case CHECK_IF_ADMIN_FAIL:
      return {
        ...state,
        user: {},
        initLoadUser: false,
      };
    case SET_USER_LANGUAGE:
      return {
        ...state,
        changeLanguageSuccess: false,
      };
    case SET_USER_LANGUAGE_SUCCESS:
      return {
        ...state,
        changeLanguageSuccess: true,
      };
    case RESET_LANGUAGE_PROPS:
      return {
        ...state,
        changeLanguageSuccess: false,
      };
    case RESET_LOAD_USER:
      return {
        ...state,
        loadedUser: false,
      };
    default:
      return state;
  }
}

const persistConfig = {
  key: "lex",
  storage: storage,
  blacklist: [
    "user",
    "loadLogin",
    "loadedUser",
    "LoggedIn",
    "LoggedInRequest",
    "initialLogin",
  ],
};

export default persistReducer(persistConfig, userReducer);
