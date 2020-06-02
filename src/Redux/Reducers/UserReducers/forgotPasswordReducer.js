import {
  FORGOT_PASSWORD_SUCCESS,
  FORGOT_PASSWORD_FAIL,
  FORGOT_PASSWORD_REQUEST
} from "../../Actions/UserActions/forgotPasswordActions";

const initialState = {};

export default function(state = initialState, action) {
  switch (action.type) {
    case FORGOT_PASSWORD_REQUEST:
      return {};
    case FORGOT_PASSWORD_SUCCESS:
      return {};
    case FORGOT_PASSWORD_FAIL:
      return {};
    default:
      return state;
  }
}
