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
border: 3px solid grey;
margin: 20px;
width: 300px;
height: 340px;
border-radius: 10px;
box-shadow: 
    0 2px 10px rgba(37, 31, 31, 0.2),
    10px -10px 20px rgba(5, 5, 5, 0.973); 
transition: 0.3s;
&:hover {
transition: 0.3s;
border: 5px solid grey;
box-shadow: 
    0 2px 10px rgba(241, 3, 3, 0.2),
    10px -10px 20px rgba(228, 0, 0, 0.973); 
}
    `;
export const Linha = styled.hr`
width: 100%;
`;
export const NomeServer = styled.h1`
color: white;
font-family: sans-serif;
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
display: flex;
margin: auto;
padding: 20px;
color: white;
font-family: sans-serif;
`;
export const Button = styled.button`
background-color: #4e4444;
color: white;
width: 150px;
height: 40px;
margin: auto;
margin-top: 10px;
border-style: none;
border-radius: 4px;
margin-bottom: 20px;
&:hover {
    background-color: #5e4141;
}
`;