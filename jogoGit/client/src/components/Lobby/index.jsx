import React, { useEffect, useState, useRef } from "react";
import { Container, Nick, EmbedOnline, EmbedChat, Image, PChat, Paragrafo, ButtonInit, ContainerEmbed, Button, Input } from './styled';
import { useSelector, useDispatch } from "react-redux";
import { api } from '../../config/api';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { getRandomNumber } from "../../functions/random";
import { toast, ToastContainer } from 'react-toastify';
import { party as partyState } from '../../store/actions/index';
import 'react-toastify/dist/ReactToastify.css';
import { FaCrown } from "react-icons/fa6";
import Back from "../Back";
import { IoExitSharp } from "react-icons/io5";
export default function Lobby() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const socket = useSelector(state => state.setSocket.setSocket);
    const nick = useSelector(state => state.setNick.setNick);
    const party = useSelector(state => state.setParty.setParty);
    const imageme = useSelector(state => state.setImagem.imagem);
    const [players, setPlayers] = useState([]);
    const [mensagem, setMensagem] = useState([]);
    const inputRef = useRef();
    const embedRef = useRef();
    useEffect(() => {
           if(!nick) navigate('/');
           const dados = party;
           axios.post(`${api}/entrada`, { id: dados.idServer})
          .then(response => {
           socket.emit('entrada', { dados: party, nick: nick});
           socket.on('clearList', ({ id }) => {
            console.log(id)
             if(Number(id) === Number(party.idServer)) {
                setPlayers(current => []);
                socket.emit('cleared', { nome: nick, id: party.idServer, host: party.host, foto: imageme });
             }
        });
            socket.on('updatePlayers', ({ nome, id, host, foto}) => {
                console.log(Number(id) === Number(party.idServer), id, party.idServer)
              if(Number(id) === Number(party.idServer)) { 
                console.log('servidor atualizado')
                setPlayers(current => {
                    const date = {
                      nome: nome,
                      host: host,
                      foto: foto
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
        socket.emit('mensagem', { mensagem: value, nick: nick, id: party.idServer, foto: imageme } );
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
     if(players.length < 2) return toast.error("Poucos jogadores.", {
        position: toast.POSITION.BOTTOM_CENTER
    });
    const query = getRandomNumber(0, players.length-1);
    socket.emit('initParty', { jogador: query, id: party.idServer});
    }
    return(
        <Container>
          <Back />
          <ContainerEmbed>
        <EmbedOnline>
        <Paragrafo>Jogadores ({players.length})</Paragrafo>
        {players.map((player, index) => (
                        <div key={index}>
                            {player ?  (
                              player.host === true ? (



                                <div className="user">
                                <Image src={player.foto} />
                                <Nick> {player.nome}  <FaCrown />  </Nick> 
                                </div>


                              ) : ( 
                                 <div className="user"> 
                                <Image src={player.foto} />
                                <Nick> {player.nome} </Nick> 
                                </div>
                                )
                            ) : null }
                              
                        </div>
                    ))}
        </EmbedOnline>
        <EmbedChat ref={embedRef}>
        {mensagem.map((message, index) => (
                        <div className="formatChat" key={index}>
                          {message.event === 'exit' ? (
                                <div className="textChat alignitens exit">
                                <PChat>{message.text} <IoExitSharp /></PChat>     
                              </div>      
                          ) : null }
                          {message.event === 'prohibited' ? (
                           <div className="textChat alignitens prohibited"> 
                           <PChat>{message.text} </PChat>
                         </div> 
                          ) : null }
                          {message.event === 'message' ? (
                            <div>
                            <div className="perfil">
                                <Image src={message.foto} /> {message.name}:
                                       </div>
                                  <div className="textChat alignitens">
                             <PChat>{message.text}</PChat>     
                            </div>   
                            </div>
                          ) : null }        
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