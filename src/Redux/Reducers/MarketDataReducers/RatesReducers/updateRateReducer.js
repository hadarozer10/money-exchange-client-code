import {
  UPDATE_RATE_SUCCESS,
  UPDATE_RATE_FAIL,
  UPDATE_RATE_REQUEST,
  LOAD_UPDATE_RATE_FORM,
  UPDATE_FAVORITE_SUCCESS,
  UPDATE_FAVORITE_FAIL,
  UPDATE_FAVORITE_REQUEST,
  RESET_UPDATE_FAVORITE,
} from "../../../Actions/MarketDataActions/Rates/updateRateActions";

const initialState = {
  desiredRate: {},
  loadedUpdateRate: false,
  updateRateSuccess: false,
  updateFavoriteSuccess: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case LOAD_UPDATE_RATE_FORM:
      return {
        ...state,
        loadedUpdateRate: true,
        updateRateSuccess: false,
        updateFavoriteSuccess: false,
        desiredRate: action.payload.rate,
      };
    case UPDATE_RATE_REQUEST:
      return {
        ...state,
        updateRateSuccess: false,
        loadedUpdateRate: false,
        updateFavoriteSuccess: false,
      };
    case UPDATE_RATE_SUCCESS:
      return {
        ...state,
        updateRateSuccess: true,
        loadedUpdateRate: false,
        updateFavoriteSuccess: false,
      };
    case UPDATE_RATE_FAIL:
      return {
        ...state,
        updateRateSuccess: false,
        loadedUpdateRate: false,
        updateFavoriteSuccess: false,
      };
    case UPDATE_FAVORITE_REQUEST:
      return { ...state, updateFavoriteSuccess: false };
    case UPDATE_FAVORITE_SUCCESS:
      return { ...state, updateFavoriteSuccess: true };
    case UPDATE_FAVORITE_FAIL:
      return {};
    case RESET_UPDATE_FAVORITE:
      return { ...state, updateFavoriteSuccess: false };
    default:
      return state;
  }
}
