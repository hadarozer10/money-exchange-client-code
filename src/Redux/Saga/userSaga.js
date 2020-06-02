import { call, put } from "redux-saga/effects";
import {
  userLoginSuccess,
  userLoginFail,
  userLoadSuccess,
  userLoadFail,
  logoutSuccess,
  autoLogoutSuccess,
  checkLoggedInFail,
  checkLoggedInSuccess,
  checkIfAdminSuccess,
  checkIfAdminFail,
  setUserLanguageSuccess,
} from "../Actions/UserActions/userActions";
import {
  forgotPasswordFail,
  forgotPasswordSuccess,
} from "../Actions/UserActions/forgotPasswordActions";
import {
  login,
  logout,
  getUser,
  autoLogin,
  autoLogout,
  forgotPassword,
  setUserLanguage,
} from "../Services/userService";
import { resetCurrencies } from "../Actions/MarketDataActions/Currencies/getCurrenciesActions";

export function* loginUserSaga({ payload }) {
  try {
    yield call(login, payload);
    yield put(userLoginSuccess());
  } catch (error) {
    yield put(userLoginFail(error));
  }
}

export function* logoutUserSaga() {
  try {
    yield call(logout);
    yield put(logoutSuccess());
    yield put(resetCurrencies());
  } catch (error) {}
}

export function* loadUserSaga() {
  try {
    const { data } = yield call(getUser);
    yield put(userLoadSuccess(data));
  } catch (error) {
    yield put(userLoadFail(error));
  }
}

export function* initLoadUserSaga() {
  try {
    const { data } = yield call(getUser);
    yield put(checkIfAdminSuccess(data));
  } catch (error) {
    yield put(checkIfAdminFail(error));
  }
}

export function* autoLoginSaga() {
  try {
    const { data } = yield call(autoLogin);
    yield put(checkLoggedInSuccess(data));
  } catch (error) {
    yield put(checkLoggedInFail(error));
  }
}

export function* autoLogoutSaga({ payload }) {
  try {
    yield call(autoLogout, payload);
    yield put(autoLogoutSuccess());
    yield put(resetCurrencies());
  } catch (error) {}
}

export function* forgotPasswordSaga({ payload }) {
  try {
    yield call(forgotPassword, payload);
    yield put(forgotPasswordSuccess());
  } catch (error) {
    yield put(forgotPasswordFail(error));
  }
}

export function* setUserLanguageSaga({ payload }) {
  try {
    yield call(setUserLanguage, payload);
    yield put(setUserLanguageSuccess());
  } catch (error) {}
}
