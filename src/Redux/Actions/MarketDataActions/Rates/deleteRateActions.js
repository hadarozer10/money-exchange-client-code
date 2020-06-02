export const DELETE_RATE_REQUEST = "DELETE_RATE_REQUEST";
export const DELETE_RATE_SUCCESS = "DELETE_RATE_SUCCESS";
export const DELETE_RATE_FAIL = "DELETE_RATE_FAIL";
export const SET_DELETE_RATE_PROPS = "SET_DELETE_RATE_PROPS";

export const deleteRateRequest = id => ({
  type: DELETE_RATE_REQUEST,
  payload: id
});

export const deleteRateSuccess = () => ({
  type: DELETE_RATE_SUCCESS
});

export const deleteRateFail = error => ({
  type: DELETE_RATE_FAIL,
  payload: error
});

export const setDeleteRateProps = () => ({
  type: SET_DELETE_RATE_PROPS
});
