import React, { useEffect, useRef } from "react";
import { Container, Embed, Titulo, Input, Button, Paragrafo } from './styled';
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { party } from '../../store/actions/index';
import { getRandomNumber } from "../../functions/random";
export default function CreateServer() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const nick = useSelector(state => state.setNick.setNick);
    const socket = useSelector(state => state.setSocket.setSocket);
    const inputRef = useRef();
    useEffect(() => {
        if (!nick) {
            navigate('/');
        }
    }, []);
   
    function handleLobby() {
    const value = inputRef.current.value;
    const data = new Date;
    console.log(data.getMilliseconds()+data.getSeconds(), socket.connected);
    if(!value) return;
    const id = getRandomNumber(1, 1000000);
    const dados = {
     idServer: id,
     host: true,
    }
    dispatch(party(dados));
    socket.emit('CreateServer', {
    name: nick,
    serverName: value,
    idServer: id,
    usuario: dados,
    online: 0,
    });
    navigate('/lobby');
    }
    return (
        <Container>
            <Embed>
             <Titulo>Criar servidor</Titulo>
             <Paragrafo>Nome servidor</Paragrafo>
             <Input ref={inputRef} placeholder="Nome server" type='text' />
             <Button onClick={handleLobby}>Criar</Button>
            </Embed>
        </Container>
    )
}