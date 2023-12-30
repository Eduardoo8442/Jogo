import React, { useEffect } from "react"
import { PageStyles } from "./GlobalStyles"
import { useSelector } from "react-redux";
function App() {
  const socket = useSelector(state => state.setSocket.setSocket);

  useEffect(() => {
    const handleBeforeUnload = () => {
      if (socket) {
        // Usando disconnect em vez de disconnecting
        socket.emit('disconnect', 'Usuário atualizou a página');
      }
    };

    const handleUnload = () => {
      if (socket) {
        socket.disconnect();
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    window.addEventListener('unload', handleUnload);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
      window.removeEventListener('unload', handleUnload);
    };
  }, [socket]);
  return (
    <div>
      <PageStyles />
    </div>
  )
}

export default App
