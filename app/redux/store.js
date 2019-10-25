import { compose,createStore, applyMiddleware } from 'redux';
import ReduxThunk from 'redux-thunk';
import { AsyncStorage } from 'react-native';
import reducers from './reducers';
import { persistStore, persistReducer } from 'redux-persist';
import { createNetworkMiddleware } from 'react-native-offline';

// Middleware: Redux Persist Config
const persistConfig = {
  // Root
  key: 'root',
  // Storage Method (React Native)
  storage: AsyncStorage,
  // Whitelist (Save Specific Reducers)
  whitelist: [
    'signInReducer'
  ],
  // Blacklist (Don't Save Specific Reducers)
  blacklist: [
    
  ]
};
  


const persistedReducer = persistReducer(persistConfig, reducers);

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const networkMiddleware = createNetworkMiddleware({
  queueReleaseThrottle: 200
});

// Middleware: Redux Persist Persisted Reducer
const middleware = [networkMiddleware];
middleware.push(ReduxThunk);
// Redux: Store
const store = createStore(
  persistedReducer,
  composeEnhancers(applyMiddleware(...middleware))
);

// Middleware: Redux Persist Persister
let persistor = persistStore(store);
  
export { store,persistor };
