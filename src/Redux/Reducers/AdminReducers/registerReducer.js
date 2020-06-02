import { toast } from "react-toastify";
import {
  REGISTER_USER_SUCCESS,
  REGISTER_USER_FAIL,
  REGISTER_USER_REQUEST,
  LOAD_REGISTER_FORM,
} from "../../Actions/AdminActions/registerUserActions";

const initialState = { registerUserSuccess: false };

export default function (state = initialState, action) {
  switch (action.type) {
    case LOAD_REGISTER_FORM:
      return { ...state, registerUserSuccess: false };
    case REGISTER_USER_REQUEST:
      return { ...state, registerUserSuccess: false };
    case REGISTER_USER_SUCCESS:
      toast("user added successfully!");
      return { ...state, registerUserSuccess: true };
    case REGISTER_USER_FAIL:
      toast("failed to register user");
      return { ...state, registerUserSuccess: false };
    default:
      return state;
  }
}
