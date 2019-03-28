import { combineReducers } from 'redux';

import steps from './ducks/steps';

const rootReducer = combineReducers<any>({
  steps,
});

export default rootReducer;