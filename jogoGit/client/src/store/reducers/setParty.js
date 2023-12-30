
const initialState = {
    setParty: {},
  };
  
  const setParty = (state = initialState, action) => {
    switch (action.type) {
      case 'PARTY':
        return {
          ...state,
          setParty: action.payload,
        };
      default:
        return state;
    }
  };
  
  export default setParty;