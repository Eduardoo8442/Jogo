import React from 'react';
import { Container, EmbedBack, LogoOff } from './styled';
import { ImExit } from 'react-icons/im';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
export default function Back() {
    const navigate = useNavigate();
    const party = useSelector(state => state.setParty.setParty);
    const socket = useSelector(state => state.setSocket.setSocket);
    const nick = useSelector(state => state.setNick.setNick);
    function retornarMain() {
        socket.emit('exitButton', {nick: nick });
        return navigate('/');
     }
    return(
        <Container>
        <EmbedBack>
             <LogoOff onClick={retornarMain}>Voltar</LogoOff> 
             <ImExit />
            </EmbedBack>
        </Container>
    )
}