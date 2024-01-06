import React, { useEffect, useRef } from "react";
import { Container, Nameh1, Input, Servers, Image,Button } from './styled';
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { nick, socket, imagem } from '../../store/actions/index';
import { api } from '../../config/api';
import { io } from "socket.io-client";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
export default function Main() {
    const navigate = useNavigate();
    const inputRef = useRef();
    const fileInputRef = useRef();
    const dispatch = useDispatch();
    const socketState = useSelector(state => state.setSocket.setSocket);
    const imageme = useSelector(state => state.setImagem.imagem);
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
        console.log(value)
        if (!value) return;
        dispatch(nick(value));
        navigate('/servers');
    }
    function handleFileChange() {
        const file = fileInputRef.current.files[0];
        if (!file) {
          toast.info("Selecione um arquivo.", {
            position: toast.POSITION.BOTTOM_CENTER
          });
          return;
        }
        const url = `${api}/upload`;
        const formData = new FormData();
        formData.append('file', file);
        fetch(url, {
        method: 'POST',
        body: formData,
      })
        .then(response => response.json())
        .then(result => {
          const imageLink = result.imageLink;
          dispatch(imagem(imageLink));
          toast.success("Imagem atualizada com sucesso!", {
            position: toast.POSITION.BOTTOM_CENTER
          });
        })
        .catch(error => {
          console.error('Erro na requisição fetch:', error);
          toast.error("Erro ao atualizar a foto.", {
            position: toast.POSITION.BOTTOM_CENTER
          });
        });
          
      }

    return (
        <Container>
            
              <div className="divMaeImage">
              <div className="divImage">
         <label className="" htmlFor="imageInput" style={{ cursor: 'pointer' }}>
         <Image id="imageButton" src={imageme} />
         <p className="textImage">Foto</p>
         </label>
         </div>
         </div>

          <input type="file" ref={fileInputRef} id="imageInput" accept="image/*" style={{ display: 'none' }} onChange={handleFileChange}  capture="camera" />

            <Nameh1>Seu nick e foto</Nameh1>
            <Input ref={inputRef} placeholder="Nick" type='text'/>
            <Servers>
            <Button onClick={handleServer}>Servidores</Button>
                <Button onClick={handleCreate}>Criar server</Button>
                
            </Servers>
            <ToastContainer />7
        </Container>
    );
}
