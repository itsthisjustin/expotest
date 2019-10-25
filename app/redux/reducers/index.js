import { combineReducers } from 'redux';
import { reducer as network } from 'react-native-offline';

// Imports: Reducers
import signInReducer from './signInReducer';
import messageReducer from './messageReducer';

// Redux: Root Reducer
const rootReducer = combineReducers({
  signInReducer,
  messageReducer,
  network
});
// Exports
export default rootReducer;
