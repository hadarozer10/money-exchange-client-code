export const ADD_RATE_REQUEST = "ADD_RATE_REQUEST";
export const ADD_RATE_SUCCESS = "ADD_RATE_SUCCESS";
export const ADD_RATE_FAIL = "ADD_RATE_FAIL";
export const LOAD_ADD_RATE_FORM = "LOAD_ADD_RATE_FORM";

export const loadAddRateForm = () => ({
  type: LOAD_ADD_RATE_FORM
});

export const addRateRequest = rate => ({
  type: ADD_RATE_REQUEST,
  payload: rate
});

export const addRateSuccess = () => ({
  type: ADD_RATE_SUCCESS
});

export const addRateFail = () => ({
  type: ADD_RATE_FAIL
});
