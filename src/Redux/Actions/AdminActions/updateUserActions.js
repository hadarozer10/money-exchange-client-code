export const UPDATE_USER_REQUEST = "UPDATE_USER_REQUEST";
export const UPDATE_USER_SUCCESS = "UPDATE_USER_SUCCESS";
export const UPDATE_USER_FAIL = "UPDATE_USER_FAIL";
export const LOAD_UPDATE_FORM = "LOAD_UPDATE_FORM";
export const RESET_UPDATE_USER_PROPS = "RESET_UPDATE_USER_PROPS";

export const updateUserRequest = user => ({
  type: UPDATE_USER_REQUEST,
  payload: user
});

export const updateUserSuccess = () => ({
  type: UPDATE_USER_SUCCESS
});

export const updateUserFail = error => ({
  type: UPDATE_USER_FAIL,
  payload: error
});

export const loadUpdateForm = user => ({
  type: LOAD_UPDATE_FORM,
  payload: { user }
});

export const resetUpdateUserProps = () => ({
  type: RESET_UPDATE_USER_PROPS
});
