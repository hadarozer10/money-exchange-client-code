export const FORCE_LOGOUT_REQUEST = "FORCE_LOGOUT_REQUEST";
export const FORCE_LOGOUT_SUCCESS = "FORCE_LOGOUT_SUCCESS";
export const FORCE_LOGOUT_FAIL = "FORCE_LOGOUT_FAIL";

export const forceLogoutRequest = (id) => ({
  type: FORCE_LOGOUT_REQUEST,
  payload: id,
});

export const forceLogoutSuccess = () => ({
  type: FORCE_LOGOUT_SUCCESS,
});

export const forceLogoutFail = (error) => ({
  type: FORCE_LOGOUT_FAIL,
  payload: error,
});
