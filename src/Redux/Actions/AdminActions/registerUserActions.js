export const REGISTER_USER_REQUEST = "REGISTER_USER_REQUEST";
export const REGISTER_USER_SUCCESS = "REGISTER_USER_SUCCESS";
export const REGISTER_USER_FAIL = "REGISTER_USER_FAIL";
export const LOAD_REGISTER_FORM = "LOAD_REGISTER_FORM";

export const loadRegisterForm = () => ({
  type: LOAD_REGISTER_FORM
});

export const registerUserRequest = user => ({
  type: REGISTER_USER_REQUEST,
  payload: user
});

export const registerUserSuccess = user => ({
  type: REGISTER_USER_SUCCESS,
  payload: { user }
});

export const registerUserFail = error => ({
  type: REGISTER_USER_FAIL,
  payload: error
});
