import { call, put } from "redux-saga/effects";
import {
  updateRateSuccess,
  updateRateFail,
  updateFavoriteSuccess,
  updateFavoriteFail,
} from "../Actions/MarketDataActions/Rates/updateRateActions";

import {
  currenciesUpdateSuccess,
  currenciesUpdateFail,
  getCurrenciesSuccess,
  getCurrenciesFail,
} from "../Actions/MarketDataActions/Currencies/getCurrenciesActions";
import {
  addRateSuccess,
  addRateFail,
} from "../Actions/MarketDataActions/Rates/addRateActions";
import {
  deleteRateSuccess,
  deleteRateFail,
} from "../Actions/MarketDataActions/Rates/deleteRateActions";
import {
  addRate,
  updateRate,
  deleteRate,
  getCurrencies,
} from "../Services/marketService";

export function* updateCurrenciesSaga({ payload }) {
  try {
    yield put(currenciesUpdateSuccess(payload));
  } catch (error) {
    yield put(currenciesUpdateFail(error));
  }
}

export function* getCurrenciesSaga() {
  try {
    const { data } = yield call(getCurrencies);
    yield put(getCurrenciesSuccess(data));
  } catch (error) {
    yield put(getCurrenciesFail(error));
  }
}

export function* addRateSaga({ payload }) {
  try {
    yield call(addRate, payload);
    yield put(addRateSuccess());
  } catch (error) {
    yield put(addRateFail(error));
  }
}

export function* deleteRateSaga({ payload }) {
  try {
    yield call(deleteRate, payload);
    yield put(deleteRateSuccess());
  } catch (error) {
    yield put(deleteRateFail(error));
  }
}

export function* updateRateSaga({ payload }) {
  try {
    yield call(updateRate, payload);
    yield put(updateRateSuccess());
  } catch (error) {
    yield put(updateRateFail(error));
  }
}

export function* updateFavoriteSaga({ payload }) {
  try {
    yield call(updateRate, payload);
    yield put(updateFavoriteSuccess());
  } catch (error) {
    yield put(updateFavoriteFail(error));
  }
}
