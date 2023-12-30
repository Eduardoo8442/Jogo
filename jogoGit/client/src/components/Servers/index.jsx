import React, { useEffect, useState } from "react";
import { Container, Paragrafo, Titulo, Server, Embed, Button } from "./styled";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { party } from "../../store/actions";
import { api } from "../../config/api";
import axios from 'axios';
export default function Servers() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const nick = useSelector(state => state.setNick.setNick);
    const socket = useSelector(state => state.setSocket.setSocket);
    const [listServer, setListServer]  = useState([]);
    useEffect(() => {
    if(!nick) navigate('/');
    axios.get(`${api}/getlist`)
  .then(response => {
    setListServer(response.data);
  })
  .catch(error => {
    navigate('/');
  });
    }, []);


  function handleClick(e) {
    const dados = {
      idServer: e.target.classList[2],
      host: false,
      nome: nick,
     }
     dispatch(party(dados));
   navigate('/lobby');
  }
      
    return (
        <Container>
            <Paragrafo>Nick: {nick}</Paragrafo>
           <Server>
            <Titulo>Servidores:</Titulo>
            {listServer.map((document, index) => (
           <Embed key={index}>
          <Paragrafo> Nome do servidor: {document.nomeServer} </Paragrafo>
           <Paragrafo>Nome do host: {document.nome} </Paragrafo>
           <Paragrafo> id do servidor: {document.idServer} </Paragrafo>
           <Paragrafo> Players: {document.online-1} Online(s) </Paragrafo>
           <Button className={document.idServer} onClick={handleClick}>Entrar</Button>
            </Embed>
            ))}
           </Server>
        </Container>
    )
}