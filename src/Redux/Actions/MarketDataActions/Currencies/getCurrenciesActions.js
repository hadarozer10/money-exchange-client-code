export const CURRENCIES_UPDATE_REQUEST = "CURRENCIES_UPDATE_REQUEST";
export const CURRENCIES_UPDATE_SUCCESS = "CURRENCIES_UPDATE_SUCCESS";
export const CURRENCIES_UPDATE_FAIL = "CURRENCIES_LOAD_FAIL";

export const GET_CURRENCIES_REQUEST = "GET_CURRENCIES_REQUEST";

export const RESET_CURRENCIES = "RESET_CURRENCIES";

export const currenciesUpdateRequest = (currencies) => ({
  type: CURRENCIES_UPDATE_REQUEST,
  payload: currencies,
});

export const currenciesUpdateSuccess = (currencies) => ({
  type: CURRENCIES_UPDATE_SUCCESS,
  payload: currencies,
});

export const currenciesUpdateFail = (error) => ({
  type: CURRENCIES_UPDATE_FAIL,
  payload: error,
});

export const getCurrenciesRequest = () => ({
  type: GET_CURRENCIES_REQUEST,
});

export const getCurrenciesSuccess = (currencies) => ({
  type: CURRENCIES_UPDATE_SUCCESS,
  payload: currencies,
});

export const getCurrenciesFail = (error) => ({
  type: CURRENCIES_UPDATE_FAIL,
  payload: error,
});

export const resetCurrencies = () => ({
  type: RESET_CURRENCIES,
});
