import {
  CURRENCIES_UPDATE_REQUEST,
  CURRENCIES_UPDATE_SUCCESS,
  CURRENCIES_UPDATE_FAIL,
  RESET_CURRENCIES,
} from "../../../Actions/MarketDataActions/Currencies/getCurrenciesActions";

const initialState = {
  currencies: {},
  loadedCurrencies: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case CURRENCIES_UPDATE_REQUEST:
      return {};
    case CURRENCIES_UPDATE_SUCCESS:
      return {
        ...state,
        loadedCurrencies: true,
        currencies: { ...action.payload },
      };
    case CURRENCIES_UPDATE_FAIL:
      return { ...state, currencies: {}, loadedCurrencies: false };
    case RESET_CURRENCIES:
      return {
        ...state,
        currencies: { ...[] },
        loadedCurrencies: false,
      };
    default:
      return state;
  }
}
