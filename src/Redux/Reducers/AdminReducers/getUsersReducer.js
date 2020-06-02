import {
  GET_USERS_SUCCESS,
  GET_USERS_FAIL,
  GET_USERS_REQUEST,
} from "../../Actions/AdminActions/getUsersActions";
import { toast } from "react-toastify";

const initialState = { loadedUsers: false, isAdmin: false, users: [] };

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_USERS_REQUEST:
      return { ...state, users: [], loadedUsers: false, isAdmin: false };
    case GET_USERS_SUCCESS:
      return {
        ...state,
        users: [...action.payload],
        loadedUsers: true,
        isAdmin: true,
      };
    case GET_USERS_FAIL:
      toast("failed to upload users");
      return { ...state, users: [], loadedUsers: false, isAdmin: false };
    default:
      return state;
  }
}
