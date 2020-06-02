export const LOAD_UPDATE_RATE_FORM = "LOAD_UPDATE_RATE_FORM";
export const UPDATE_RATE_REQUEST = "UPDATE_RATE_REQUEST";
export const UPDATE_RATE_SUCCESS = "UPDATE_RATE_SUCCESS";
export const UPDATE_RATE_FAIL = "UPDATE_RATE_FAIL";
export const FINISH_UPDATE = "FINISH_UPDATE";
export const UPDATE_FAVORITE_REQUEST = "UPDATE_FAVORITE_REQUEST";
export const UPDATE_FAVORITE_SUCCESS = "UPDATE_FAVORITE_SUCCESS";
export const UPDATE_FAVORITE_FAIL = "UPDATE_FAVORITE_FAIL";
export const RESET_UPDATE_FAVORITE = "RESET_UPDATE_FAVORITE";

export const loadUpdateRateForm = (rate) => ({
  type: LOAD_UPDATE_RATE_FORM,
  payload: { rate },
});

export const updateRateRequest = (rate) => ({
  type: UPDATE_RATE_REQUEST,
  payload: rate,
});

export const updateRateSuccess = () => ({
  type: UPDATE_RATE_SUCCESS,
});

export const updateRateFail = (error) => ({
  type: UPDATE_RATE_FAIL,
  payload: error,
});

export const updateFavoriteRequest = (rate) => ({
  type: UPDATE_FAVORITE_REQUEST,
  payload: rate,
});

export const updateFavoriteSuccess = () => ({
  type: UPDATE_FAVORITE_SUCCESS,
});

export const updateFavoriteFail = (error) => ({
  type: UPDATE_FAVORITE_FAIL,
  payload: error,
});

export const resetUpdateFavorite = () => ({
  type: RESET_UPDATE_FAVORITE,
});

export const finishUpdate = () => ({
  type: FINISH_UPDATE,
});
