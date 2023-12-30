
import { combineReducers } from 'redux';
import setNick from './setNick';
import setSocket from './setSocket';
import setParty from './setParty';
const rootReducer = combineReducers({
  setNick: setNick,
  setSocket: setSocket,
  setParty: setParty,
});

export default rootReducer;