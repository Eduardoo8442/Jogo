
const initialState = {
    imagem: '/image/perfil.png',
  };
  
  const setImagem = (state = initialState, action) => {
    switch (action.type) {
      case 'IMAGEM':
        console.log('chegou no reducer')
        return {
          ...state,
          imagem: action.payload,
        };
      default:
        return state;
    }
  };
  
  export default setImagem;