import { toast } from "react-toastify";
import {
  DELETE_USER_SUCCESS,
  DELETE_USER_FAIL,
  DELETE_USER_REQUEST,
  SET_DELETE_PROPS
} from "../../Actions/AdminActions/deleteUserActions";

const initialState = { deleteUserSuccess: false };

export default function(state = initialState, action) {
  switch (action.type) {
    case SET_DELETE_PROPS:
      return { ...state, deleteUserSuccess: false };
    case DELETE_USER_REQUEST:
      return { ...state, deleteUserSuccess: false };
    case DELETE_USER_SUCCESS:
      return { ...state, deleteUserSuccess: true };
    case DELETE_USER_FAIL:
      toast("failed to delete user");
      return { ...state, deleteUserSuccess: false };
    default:
      return state;
  }
}
