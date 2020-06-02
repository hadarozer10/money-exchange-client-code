import { createStore, applyMiddleware } from "redux";
import createSagaMiddleware from "redux-saga";
import rootReducer from "../Reducers/rootReducer";
import rootSaga from "../Saga/rootSaga";
import { composeWithDevTools } from "redux-devtools-extension/logOnlyInProduction";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import createEncryptor from "redux-persist-transform-encrypt";

const configureStore = () => {
  const sagaMiddleware = createSagaMiddleware();

  const encryptor = createEncryptor({
    secretKey: "some key for demonstration purpose",
  });

  const persistConfig = {
    key: "some key for demonstration purpose",
    storage: storage,
    whitelist: ["getCurrenciesReducer"],
    transforms: [encryptor],
  };
  const pReducer = persistReducer(persistConfig, rootReducer);

  const composeEnhancers = composeWithDevTools({
    realtime: true,
    name: "some name for demonstration purpose",
    hostname: "https://www.moneyexchangeco.com/",
    port: unavaible - demonstration only,
  });

  const store = createStore(
    pReducer,
    composeEnhancers(applyMiddleware(sagaMiddleware))
  );

  sagaMiddleware.run(rootSaga);
  const persistor = persistStore(store);

  return { store, persistor };
};

export default configureStore;
