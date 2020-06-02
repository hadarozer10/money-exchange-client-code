import React from "react";
import { toast } from "react-toastify";
import {
  UPDATE_USER_SUCCESS,
  UPDATE_USER_FAIL,
  UPDATE_USER_REQUEST,
  LOAD_UPDATE_FORM,
  RESET_UPDATE_USER_PROPS,
} from "../../Actions/AdminActions/updateUserActions";
import Check from "@material-ui/icons/Check";

const initialState = {
  desiredUser: {},
  loadedUpdateUser: false,
  updateSuccess: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case LOAD_UPDATE_FORM:
      return {
        ...state,
        loadedUpdateUser: true,
        desiredUser: action.payload.user,
      };
    case UPDATE_USER_REQUEST:
      return { ...state, updateSuccess: false };
    case UPDATE_USER_SUCCESS:
      toast(<Check />, {
        // autoclose: 1000,
      });
      return { ...state, updateSuccess: true, loadedUpdateUser: false };
    case UPDATE_USER_FAIL:
      return { ...state, updateSuccess: false, loadedUpdateUser: false };
    case RESET_UPDATE_USER_PROPS:
      return {
        ...state,
        desiredUser: {},
        updateSuccess: false,
        loadedUpdateUser: false,
      };
    default:
      return state;
  }
}
