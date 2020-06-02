import {
  DELETE_RATE_SUCCESS,
  DELETE_RATE_FAIL,
  DELETE_RATE_REQUEST,
  SET_DELETE_RATE_PROPS,
} from "../../../Actions/MarketDataActions/Rates/deleteRateActions";

const initialState = { deleteRateSuccess: false };

export default function (state = initialState, action) {
  switch (action.type) {
    case SET_DELETE_RATE_PROPS:
      return { ...state, deleteRateSuccess: false };
    case DELETE_RATE_REQUEST:
      return { ...state, deleteRateSuccess: false };
    case DELETE_RATE_SUCCESS:
      return { ...state, deleteRateSuccess: true };
    case DELETE_RATE_FAIL:
      return { ...state, deleteRateSuccess: false };
    default:
      return state;
  }
}
