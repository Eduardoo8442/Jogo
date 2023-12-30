import React, { useEffect, useState, useRef } from "react";
import { Container, Nick, EmbedOnline, EmbedChat, PChat, Paragrafo, ButtonInit, ContainerEmbed, Button, Input } from './styled';
import { useSelector, useDispatch } from "react-redux";
import { api } from '../../config/api';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { getRandomNumber } from "../../functions/random";
import { toast, ToastContainer } from 'react-toastify';
import { party as partyState } from '../../store/actions/index';
import 'react-toastify/dist/ReactToastify.css';
export default function Lobby() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const socket = useSelector(state => state.setSocket.setSocket);
    const nick = useSelector(state => state.setNick.setNick);
    const party = useSelector(state => state.setParty.setParty);
    const [players, setPlayers] = useState([]);
    const [mensagem, setMensagem] = useState([]);
    const inputRef = useRef();
    const embedRef = useRef();
    useEffect(() => {
           if(!nick) navigate('/');
           const dados = party;
           axios.post(`${api}/entrada`, { id: dados.idServer})
          .then(response => {
           socket.emit('entrada', { dados: party});
           socket.on('clearList', ({ id }) => {
            console.log(id)
             if(Number(id) === Number(party.idServer)) {
                setPlayers(current => []);
                console.log('limpo', players)
             }
            socket.emit('cleared', { nome: nick, id: party.idServer, host: party.host });
        });
            socket.on('updatePlayers', ({ nome, id, host}) => {
                console.log(host)
              if(Number(id) === Number(party.idServer)) { 
                setPlayers(current => {
                    const date = {
                      nome: nome,
                      host: host,
                    }
                    console.log([...current, date])                    
                     return [...current, date]
                })
            } else console.log('nick rejeitado:', nome) 
            });
          })
          .catch(error => {
            console.log(error)
            navigate('/');
          });
          socket.on('receive', data => {
            const id = data.id;
            if(Number(id) === Number(party.idServer)) { 
            console.log('new message')
            setMensagem((currentList) => [...currentList, data]);
            scrollEnd();
            }
        });
        socket.on('partyPlayers', ({ jogador, id }) => {
          if (Number(id) === Number(party.idServer)) {
              setPlayers(currentPlayers => {
                  if (currentPlayers[jogador]?.nome === nick) {
                      const date = { ...party };
                      date.query = true;
                      dispatch(partyState(date));
                  }
                  navigate('/party');
                  return currentPlayers;
              });
          }
      });
          return () => {
            socket.off('updatePlayers');
            socket.off('partyPlayers');
            socket.off('clearList');
            socket.off('receive');
          };
    }, []);
    function handleMessage() {
        const value = inputRef.current.value;
        if(!value) return;
        inputRef.current.value = '';
        socket.emit('mensagem', { mensagem: value, nick: nick, id: party.idServer} );
    }
    function handleKeyDown(event) {
      if (event.key === 'Enter') {
          event.preventDefault();
          handleMessage();
      }
  }
  function scrollEnd() {
    setTimeout(() => {
    const endEmbed = embedRef.current;
    endEmbed.scrollTop = endEmbed.scrollHeight;
    }, 100);
} 
    function initParty() {
     if(players.length < 2) toast.error("Poucos jogadores.", {
        position: toast.POSITION.BOTTOM_CENTER
    });
    const query = getRandomNumber(0, players.length-1);
    socket.emit('initParty', { jogador: query, id: party.idServer});
    }
    return(
        <Container>
          <ContainerEmbed>
        <EmbedOnline>
        <Paragrafo>Jogadores</Paragrafo>
        {players.map((player, index) => (
                        <div key={index}>
                            {player ?  (
                              player.host === true ? <Nick>{player.nome}(host) </Nick> : <Nick>{player.nome} </Nick>
                            ) : null }
                            
                        </div>
                    ))}
        </EmbedOnline>
        <EmbedChat ref={embedRef}>
        {mensagem.map((message, index) => (
                        <div key={index}>
                          {message.name}: <PChat>{message.text}</PChat>               
                        </div>
                    ))}
                     <Input onKeyDown={handleKeyDown} ref={inputRef} placeholder="enviar mensagem" /> <Button onClick={handleMessage}>Enviar</Button>
        </EmbedChat>
        </ContainerEmbed>
       {party.host === true ? <ButtonInit onClick={initParty}>Iniciar jogo</ButtonInit> : null}
       <ToastContainer position="top-right" autoClose={2000} />
        </Container>
    )
}