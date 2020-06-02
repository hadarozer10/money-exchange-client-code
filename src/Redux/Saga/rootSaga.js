import { takeEvery } from "redux-saga/effects";
import {
  addRateSaga,
  deleteRateSaga,
  updateRateSaga,
  updateFavoriteSaga,
  updateCurrenciesSaga,
  getCurrenciesSaga,
} from "./marketDataSaga";
import {
  loginUserSaga,
  autoLoginSaga,
  loadUserSaga,
  logoutUserSaga,
  autoLogoutSaga,
  forgotPasswordSaga,
  initLoadUserSaga,
  setUserLanguageSaga,
} from "./userSaga";
import {
  registerUserSaga,
  getUsersSaga,
  deleteUserSaga,
  updateUserSaga,
  forceLogoutSaga,
} from "./adminSaga";

function* rootSaga() {
  yield takeEvery("USER_LOGIN_REQUEST", loginUserSaga);
  yield takeEvery("REGISTER_USER_REQUEST", registerUserSaga);
  yield takeEvery("GET_USERS_REQUEST", getUsersSaga);
  yield takeEvery("DELETE_USER_REQUEST", deleteUserSaga);
  yield takeEvery("UPDATE_USER_REQUEST", updateUserSaga);
  yield takeEvery("USER_LOGOUT_REQUEST", logoutUserSaga);
  yield takeEvery("AUTO_LOGOUT_REQUEST", autoLogoutSaga);
  yield takeEvery("USER_LOAD_REQUEST", loadUserSaga);
  yield takeEvery("CHECK_IF_ADMIN", initLoadUserSaga);
  yield takeEvery("CHECK_LOGGED_IN", autoLoginSaga);

  yield takeEvery("SET_USER_LANGUAGE", setUserLanguageSaga);

  yield takeEvery("FORGOT_PASSWORD_REQUEST", forgotPasswordSaga);
  yield takeEvery("FORCE_LOGOUT_REQUEST", forceLogoutSaga);

  yield takeEvery("CURRENCIES_UPDATE_REQUEST", updateCurrenciesSaga);
  yield takeEvery("GET_CURRENCIES_REQUEST", getCurrenciesSaga);

  yield takeEvery("ADD_RATE_REQUEST", addRateSaga);
  yield takeEvery("DELETE_RATE_REQUEST", deleteRateSaga);
  yield takeEvery("UPDATE_RATE_REQUEST", updateRateSaga);
  yield takeEvery("UPDATE_FAVORITE_REQUEST", updateFavoriteSaga);
}

export default rootSaga;
