import {
  ADD_RATE_REQUEST,
  ADD_RATE_SUCCESS,
  ADD_RATE_FAIL,
  LOAD_ADD_RATE_FORM,
} from "../../../Actions/MarketDataActions/Rates/addRateActions";

const initialState = { addRateSuccess: false };

export default function (state = initialState, action) {
  switch (action.type) {
    case LOAD_ADD_RATE_FORM:
      return {
        ...state,
        addRateSuccess: false,
      };
    case ADD_RATE_REQUEST:
      return { ...state, addRateSuccess: false };
    case ADD_RATE_SUCCESS:
      return { ...state, addRateSuccess: true };
    case ADD_RATE_FAIL:
      return { ...state, addRateSuccess: false };
    default:
      return state;
  }
}
