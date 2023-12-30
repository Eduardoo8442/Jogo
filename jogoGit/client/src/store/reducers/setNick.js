
const initialState = {
    setNick: '',
  };
  
  const setNick = (state = initialState, action) => {
    switch (action.type) {
      case 'NICK':
        console.log(action.payload)
        return {
          ...state,
          setNick: action.payload,
        };
      default:
        return state;
    }
  };
  
  export default setNick;