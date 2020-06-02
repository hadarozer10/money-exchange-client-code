export const DELETE_USER_REQUEST = "DELETE_USER_REQUEST";
export const DELETE_USER_SUCCESS = "DELETE_USER_SUCCESS";
export const DELETE_USER_FAIL = "DELETE_USER_FAIL";
export const SET_DELETE_PROPS = "SET_DELETE_PROPS";

export const deleteUserRequest = name => ({
  type: DELETE_USER_REQUEST,
  payload: name
});

export const deleteUserSuccess = () => ({
  type: DELETE_USER_SUCCESS
});

export const deleteUserFail = error => ({
  type: DELETE_USER_FAIL,
  payload: error
});

export const setDeleteProps = () => ({
  type: SET_DELETE_PROPS
});
