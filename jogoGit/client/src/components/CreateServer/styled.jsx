import styled from 'styled-components';

export const Container = styled.div`
display: flex;
justify-content: center;
align-items: center;
height: 100vh;
`;
export const Embed = styled.div`
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
border: 2px solid grey;
width: 400px;
height: 200px;
margin-bottom: 40px;
`;
export const Button = styled.button`
margin-top: 10px;
width: 100px;
height: 40px;
margin-bottom: 10px;
border-radius: 4px;
border-style: none;
color: white;
background-color: #444474;
&:hover {
    background-color: #1b1b24; 
}
`;
export const Input = styled.input`
width: 150px;
height: 25px;
background-color: #352a2a;
border-style: none;
border-radius: 4px;
color: white;
&::placeholder {
    text-align: center;
}
`;
export const Titulo = styled.h1`
color: white;
font-family: sans-serif;
`;
export const Paragrafo = styled.p`
color: white;
font-family: sans-serif;
`;