
import { combineReducers } from 'redux';
import setNick from './setNick';
import setSocket from './setSocket';
import setParty from './setParty';
import setImagem from './setImagem';
const rootReducer = combineReducers({
  setNick: setNick,
  setSocket: setSocket,
  setParty: setParty,
  setImagem: setImagem
});

export default rootReducer;