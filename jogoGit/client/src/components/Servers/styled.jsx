import styled from "styled-components";

export const Container = styled.div`
display: flex;
justify-content: center;
`;
export const Embed = styled.div`
display: flex;
justify-content: center;
flex-direction: column;
align-items: center;
border: 1px solid red;
margin: 20px;
width: 400px;
height: 400px;
`;
export const Server = styled.div`
display: flex;
justify-content: center;
flex-direction: column;
`;
export const Paragrafo = styled.p`
color: white;
font-family: sans-serif;
font-weight: bold;
`;
export const Titulo = styled.h1`
color: white;
font-family: sans-serif;
`;
export const Button = styled.button`
background-color: #201f1f;
color: white;
width: 150px;
height: 40px;
margin: auto;
margin-top: 10px;
border-style: none;
border-radius: 4px;
&:hover {
    background-color: #2c2222;
}
`;