import React, { useEffect, useRef } from "react";
import { Container, Nameh1, Input, Servers, Button } from './styled';
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { nick, socket } from '../../store/actions/index';
import { api } from '../../config/api';
import { io } from "socket.io-client";

export default function Main() {
    const navigate = useNavigate();
    const inputRef = useRef();
    const dispatch = useDispatch();
    const socketState = useSelector(state => state.setSocket.setSocket);

    useEffect(() => {
        const initializeSocket = async () => {
            if (!socketState) {
                try {
                    const initializedSocket = await initSocket();
                    dispatch(socket(initializedSocket));
                } catch (error) {
                    console.error("Erro ao inicializar o socket:", error);
                }
            }
        };

        initializeSocket();
    }, [dispatch, socketState]);

    async function initSocket() {
        return io.connect(api);
    }

    function handleCreate() {
        const value = inputRef.current.value;
        if (!value) return;

        dispatch(nick(value));
        navigate('/create');
    }
    function handleServer() {
        const value = inputRef.current.value;
        if (!value) return;
        dispatch(nick(value));
        navigate('/servers');
    }


    return (
        <Container>
            <Nameh1>Seu nick</Nameh1>
            <Input ref={inputRef} placeholder="Nick" type='text'/>
            <Servers>
            <Button onClick={handleServer}>Servidores</Button>
                <Button onClick={handleCreate}>Criar server</Button>
                
            </Servers>
        </Container>
    );
}
