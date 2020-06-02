import { call, put } from "redux-saga/effects";
import {
  registerUserSuccess,
  registerUserFail,
} from "../Actions/AdminActions/registerUserActions";
import {
  getUsersSuccess,
  getUsersFail,
} from "../Actions/AdminActions/getUsersActions";
import {
  deleteUserSuccess,
  deleteUserFail,
} from "../Actions/AdminActions/deleteUserActions";
import {
  updateUserSuccess,
  updateUserFail,
} from "../Actions/AdminActions/updateUserActions";
import {
  forceLogoutSuccess,
  forceLogoutFail,
} from "../Actions/AdminActions/forceLogoutActions";
import {
  register,
  getUsers,
  deleteUser,
  update,
  autoLogout,
} from "../Services/userService";

export function* registerUserSaga({ payload }) {
  try {
    yield call(register, payload);
    yield put(registerUserSuccess());
  } catch (error) {
    yield put(registerUserFail(error));
  }
}

export function* getUsersSaga() {
  try {
    const { data } = yield call(getUsers);
    yield put(getUsersSuccess(data));
  } catch (error) {
    yield put(getUsersFail(error));
  }
}

export function* deleteUserSaga({ payload }) {
  try {
    yield call(deleteUser, payload);
    yield put(deleteUserSuccess());
  } catch (error) {
    yield put(deleteUserFail(error));
  }
}

export function* updateUserSaga({ payload }) {
  try {
    yield call(update, payload);
    yield put(updateUserSuccess());
  } catch (error) {
    yield put(updateUserFail(error));
  }
}

export function* forceLogoutSaga({ payload }) {
  try {
    yield call(autoLogout, payload);
    yield put(forceLogoutSuccess());
  } catch (error) {
    yield put(forceLogoutFail(error));
  }
}
