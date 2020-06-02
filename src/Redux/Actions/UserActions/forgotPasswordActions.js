export const FORGOT_PASSWORD_REQUEST = "FORGOT_PASSWORD_REQUEST";
export const FORGOT_PASSWORD_FAIL = "FORGOT_PASSWORD_FAIL";
export const FORGOT_PASSWORD_SUCCESS = "FORGOT_PASSWORD_SUCCESS";

export const forgotPasswordRequest = email => ({
  type: FORGOT_PASSWORD_REQUEST,
  payload: email
});

export const forgotPasswordSuccess = () => ({
  type: FORGOT_PASSWORD_SUCCESS
});

export const forgotPasswordFail = error => ({
  type: FORGOT_PASSWORD_FAIL,
  payload: error
});
