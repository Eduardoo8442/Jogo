export const nick = (novoDado) => {
    return {
      type: 'NICK',
      payload: novoDado,
    };
  };
  export const socket = (novoDado) => {
      return {
        type: 'SOCKET',
        payload: novoDado,
      };
    };
    export const party = (novoDado) => {
        return {
          type: 'PARTY',
          payload: novoDado,
        };
      };