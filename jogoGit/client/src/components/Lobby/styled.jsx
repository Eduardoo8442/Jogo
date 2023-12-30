import styled from "styled-components";

export const Container = styled.div`
`;
export const EmbedOnline = styled.div`
margin: auto;
border: 3px solid black;
width: 200px;
height: 300px;
`;
export const EmbedChat = styled.div`
margin: auto;
border: 3px solid black;
width: 200px;
height: 300px;
overflow-y: auto;
display: flex;
flex-direction: column;
&::-webkit-scrollbar {
    width: 12px;
  }

  &::-webkit-scrollbar-track {
    background-color: #101011;
  }
  &::-webkit-scrollbar-thumb {
    background-color: #ffef11;
  }
  &::-webkit-scrollbar-thumb:hover {
    background-color: #7a791c; 
  }
`;
export const Nick = styled.p`
color: white;
margin-left: 10px;
font-family: sans-serif;
`;
export const ContainerEmbed = styled.div`
color: white;
display: flex;
justify-content: center;
`;
export const Paragrafo = styled.p`
color: white;
font-weight: bold;
font-family: sans-serif;
margin-left: 10px;
`;
export const PChat = styled.span`
color: white;
font-weight: bold;
font-family: sans-serif;
`;
export const Button = styled.button`
border-style: none;
background-color: black;
color: white;
&:hover {
    background-color: #4e4a4a;
}
`;
export const Input = styled.input`
margin-top: 10px;
background-color: #252121;
border-style: none;
color: white;

`;
export const ButtonInit = styled.button`
border-style: none;
background-color: #070bff;
color: white;
width: 200px;
height: 50px;
display: flex;
justify-content: center;
margin: auto;
border-radius: 15px;
align-items: center;
font-size: 30px;
font-family: sans-serif;
font-weight: bold;
&:hover {
    background-color: #212881;
}
`;