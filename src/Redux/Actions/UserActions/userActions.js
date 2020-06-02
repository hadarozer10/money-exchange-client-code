export const USER_LOGIN_REQUEST = "USER_LOGIN_REQUEST";
export const USER_LOGIN_SUCCESS = "USER_LOGIN_SUCCESS";
export const USER_LOGIN_FAIL = "USER_LOGIN_FAIL";

export const USER_LOGOUT_REQUEST = "USER_LOGOUT_REQUEST";
export const USER_LOGOUT_SUCCESS = "USER_LOGOUT_SUCCESS";

export const AUTO_LOGOUT_REQUEST = "AUTO_LOGOUT_REQUEST";
export const AUTO_LOGOUT_SUCCESS = "AUTO_LOGOUT_SUCCESS";

export const USER_LOAD_FAIL = "USER_LOAD_FAIL";
export const USER_LOAD_REQUEST = "USER_LOAD_REQUEST";
export const USER_LOAD_SUCCESS = "USER_LOAD_SUCCESS";

export const CHECK_IF_ADMIN_FAIL = "CHECK_IF_ADMIN_FAIL";
export const CHECK_IF_ADMIN = "CHECK_IF_ADMIN";
export const CHECK_IF_ADMIN_SUCCESS = "CHECK_IF_ADMIN_SUCCESS";

export const CHECK_LOGGED_IN = "CHECK_LOGGED_IN";
export const CHECK_LOGGED_IN_SUCCESS = "CHECK_LOGGED_IN_SUCCESS";
export const CHECK_LOGGED_IN_FAIL = "CHECK_LOGGED_IN_FAIL";
export const RESET_LOAD_USER = "RESET_LOAD_USER";

export const SET_USER_LANGUAGE = "SET_USER_LANGUAGE";
export const SET_USER_LANGUAGE_SUCCESS = "SET_USER_LANGUAGE_SUCCESS";
export const RESET_LANGUAGE_PROPS = "RESET_LANGUAGE_PROPS";

export const checkLoggedIn = () => ({
  type: CHECK_LOGGED_IN,
});

export const checkLoggedInSuccess = (data) => ({
  type: CHECK_LOGGED_IN_SUCCESS,
  payload: data,
});

export const checkLoggedInFail = (error) => ({
  type: CHECK_LOGGED_IN_FAIL,
  payload: error,
});

export const userLoginRequest = (user) => ({
  type: USER_LOGIN_REQUEST,
  payload: user,
});

export const userLoginSuccess = (user) => ({
  type: USER_LOGIN_SUCCESS,
  payload: user,
});

export const userLoginFail = (error) => ({
  type: USER_LOGIN_FAIL,
  payload: error,
});

export const userLoadRequest = () => ({
  type: USER_LOAD_REQUEST,
});

export const userLoadSuccess = (user) => ({
  type: USER_LOAD_SUCCESS,
  payload: user,
});

export const userLoadFail = (error) => ({
  type: USER_LOAD_FAIL,
  payload: error,
});

export const checkIfAdmin = () => ({
  type: CHECK_IF_ADMIN,
});

export const checkIfAdminSuccess = (user) => ({
  type: CHECK_IF_ADMIN_SUCCESS,
  payload: user,
});

export const checkIfAdminFail = (error) => ({
  type: CHECK_IF_ADMIN_FAIL,
  payload: error,
});

export const logoutRequest = () => ({
  type: USER_LOGOUT_REQUEST,
});

export const logoutSuccess = () => ({
  type: USER_LOGOUT_SUCCESS,
});

export const autoLogoutRequest = (email) => ({
  type: AUTO_LOGOUT_REQUEST,
  payload: email,
});

export const autoLogoutSuccess = () => ({
  type: AUTO_LOGOUT_SUCCESS,
});

export const setUserLanguage = (language) => ({
  type: SET_USER_LANGUAGE,
  payload: language,
});

export const setUserLanguageSuccess = () => ({
  type: SET_USER_LANGUAGE_SUCCESS,
});

export const resetLanguageProps = () => ({
  type: RESET_LANGUAGE_PROPS,
});

export const resetLoadUser = () => ({
  type: RESET_LOAD_USER,
});
