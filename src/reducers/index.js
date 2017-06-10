import { combineReducers } from 'redux';

import TestReducer from '../reducers/testReducer';

export default combineReducers({
  testObj: TestReducer
});
