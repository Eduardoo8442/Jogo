import React, { useEffect, useRef, useState } from "react";
import { Container, ContainerQuery, Titulo, Caractere, Input, Button, InputChat, Paragrafo, ContainerParty, ContainerGame, ContainerChat, PageStyles } from './styled';
import { useSelector, useDispatch } from "react-redux";
import { party as partyState } from "../../store/actions";
import { useNavigate } from "react-router-dom";
import { removerAcentos } from "../../functions/removeAcentos";
export default function Party() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const temaRef = useRef();
    const objetoRef = useRef();
    const responseRef = useRef();
    const embedRef = useRef();
    const nick = useSelector(state => state.setNick.setNick);
    const party = useSelector(state => state.setParty.setParty);
    const socket = useSelector(state => state.setSocket.setSocket);
    const [fase, setFase] = useState(0);
    const [resposta, setResposta] = useState('');
    const [tema, setTema] = useState('');
    const [dica, setDica] = useState('Aguardando dicas');
    const [acerto, setAcerto] = useState(false);
    const [mensagem, setMensagem] = useState([]);
    const [tempo, setTempo] = useState(40);
    useEffect(() => {
    socket.on('comecar', ({ theme, response, id }) => {
        if(Number(id) === Number(party.idServer)) { 
        console.log(response)
        setResposta(response.trim());
        setTema(theme);
        const interval = setInterval(() => {
             setTempo((current) => {
            if(current === 0) {
                clearInterval(interval);
                const date = { ...party };
                date.query = false;
                dispatch(partyState(date));
                navigate('/lobby');
            }
              return current-1;
             });
        }, 1000);
        }
    });
    socket.on('sendResponse', ({ id, response, nome}) => {
        if (Number(id) === Number(party.idServer)) {
        const data = {};
    if(String(removerAcentos(response).toLowerCase().trim()) === String(removerAcentos(resposta).toLowerCase())) {
        data.correct = true;
        data.text = `O ${nome} acertou!`;
        if(String(nick) === String(nome)) {
        setAcerto(true);
        }
    } else {
        data.correct = false;
        data.text = `O ${nome} errou!`;
    }
    setMensagem((currentList) => [...currentList, data]);
    scrollEnd();
}
    });
    socket.on('sendDica', ({ id, response }) => {
        if (Number(id) === Number(party.idServer)) {
            setDica(response)
        }
    });
   return () => {
    socket.off('sendResponse');
    socket.off('comecar');
    socket.off('sendDica');
   }
    }, [resposta]);
    function initParty() {
     if(!temaRef.current.value || !objetoRef.current.value) return;
     setFase(1);
     socket.emit('read', { theme: temaRef.current.value, response: objetoRef.current.value, id: party.idServer })
    }
    function sendResponse() {
    if(!responseRef.current.value) return;
    socket.emit('response', { id: party.idServer, response: responseRef.current.value, nick: nick});
    }
    function handleKeyDown(event) {
        if (event.key === 'Enter') {
            event.preventDefault();
            party.query === true ? sendDica() : sendResponse() ;
            responseRef.current.value = '';
        }
    }
    function sendDica() {
        socket.emit('dica', { id: party.idServer, response: responseRef.current.value });
    }
    function scrollEnd() {
        setTimeout(() => {
        const endEmbed = embedRef.current;
        endEmbed.scrollTop = endEmbed.scrollHeight;
        }, 100);
    } 
    return(
        <Container>
            <PageStyles />
        {party.query === false && !resposta ? <Titulo>Aguardando o tema...</Titulo> : null}
         {party.query === true && fase === 0 ? (
               <ContainerQuery>
           <Titulo>Escolha o tema e oque você está pensando!</Titulo>
           <Input ref={temaRef} placeholder="Tema - dica" />
           <Input ref={objetoRef} placeholder="o que você está pensando" />
           <Button onClick={initParty}>Começar</Button>
               </ContainerQuery>
         ) : null }
         {fase === 1 ? (
           <ContainerParty>
            <Titulo>Envie uma dica para os jogadores!</Titulo>
            <Titulo>Tempo: {tempo}</Titulo>
            <InputChat onKeyDown={handleKeyDown} ref={responseRef} placeholder="Enviar dica"/>
            <ContainerChat ref={embedRef}>
             {mensagem.map((message, index) => (
                        <div key={index}>
                          {message.correct === true ? <Paragrafo className="correct">{message.text}</Paragrafo> : <Paragrafo className="failure">{message.text}</Paragrafo>}               
                        </div>
                    ))}
             </ContainerChat>
           </ContainerParty>
         ) : null }
         {!party.query && resposta ? (
            <ContainerGame>
             <Titulo>Tema: {tema}</Titulo>
             <Titulo>Dicas: {dica}</Titulo>
             <Titulo>Tempo: {tempo}</Titulo>
             <div className="dica">
             {resposta.split('').map((caracter, index) => (
               <Caractere key={index}>_</Caractere>
              ))}
              </div>
            {acerto === true ? <InputChat disabled onKeyDown={handleKeyDown} ref={responseRef} placeholder="Enviar resposta"/> : <InputChat onKeyDown={handleKeyDown} ref={responseRef} placeholder="Enviar resposta"/>}
             <ContainerChat ref={embedRef}>
             {mensagem.map((message, index) => (
                        <div key={index}>
                          {message.correct === true ? <Paragrafo className="correct">{message.text}</Paragrafo> : <Paragrafo className="failure">{message.text}</Paragrafo>}               
                        </div>
                    ))}
             </ContainerChat>
            </ContainerGame>
         ) : null }
        </Container>
    )
}