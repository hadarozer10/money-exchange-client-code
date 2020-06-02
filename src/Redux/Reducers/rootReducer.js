import { combineReducers } from "redux";
import getCurrenciesReducer from "./MarketDataReducers/CurrenciesReducers/getCurrenciesReducer";

import addRateReducer from "./MarketDataReducers/RatesReducers/addRateReducer";
import deleteRateReducer from "./MarketDataReducers/RatesReducers/deleteRateReducer";
import updateRateReducer from "./MarketDataReducers/RatesReducers/updateRateReducer";

import userReducer from "./UserReducers/userReducer";
import forgotPasswordReducer from "./UserReducers/forgotPasswordReducer";
import registerReducer from "./AdminReducers/registerReducer";
import getUsersReducer from "./AdminReducers/getUsersReducer";
import deleteUserReducer from "./AdminReducers/deleteUserReducer";
import updateUserReducer from "./AdminReducers/updateUserReducer";

const rootReducer = combineReducers({
  deleteRateReducer,
  updateRateReducer,
  getCurrenciesReducer,
  addRateReducer,
  userReducer,
  registerReducer,
  getUsersReducer,
  deleteUserReducer,
  updateUserReducer,
  forgotPasswordReducer
});

export default rootReducer;
