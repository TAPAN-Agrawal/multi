import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { rootReducer } from './RootReducer';
import rootSaga from './RootSaga';
import { persistStore,persistReducer} from 'redux-persist';
import  storage  from 'redux-persist/lib/storage';

// Create saga middleware
const sagaMiddleware = createSagaMiddleware();

// Define the compose function
const composeEnhancers: typeof compose =
  (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;


const persistConfig = {
  key: 'persist-key',
  storage
}

const persistedReducer = persistReducer(persistConfig,rootReducer); 

  // Create the store
export const store = createStore(
  persistedReducer,
  composeEnhancers(applyMiddleware(sagaMiddleware))
);
export const persistor=persistStore(store)
// Run the root saga
sagaMiddleware.run(rootSaga);
