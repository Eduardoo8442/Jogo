import styled from "styled-components";

export const Container = styled.div`
.exit {
  color: red;
}
.alignitens {
  display: flex;
  align-items: center;
}
.prohibited {

  color: #0bff0b;
  margin-left: 1px;
  svg {
    font-size: 20px;
  }
}
.perfil {
display: flex;
align-items: center;
}
.textChat {
  margin-top: 4px;
  margin-left: 25px;
}
.formatChat {
  margin-bottom: 10px;
}
.user {
  display: flex;
  align-items: center;
  margin-top: 10px;
  user-select: none;
  &:hover {
    background-color: #a1989839;
  }
}
`;
export const EmbedOnline = styled.div`
margin: auto;
border: 3px solid black;
width: 200px;
height: 300px;
overflow-y: auto;
  svg {
    color: yellow;
    
}
`;
export const Image = styled.img`
  border-radius: 50%;
  width: 40px;
  height: 40px;
  margin-left: 10px;
  margin-right: 10px;

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
    width: 8px;
  }

  &::-webkit-scrollbar-track {
    background-color: #101011;
  }
  &::-webkit-scrollbar-thumb {
    background-color: #5f5f52;
  }
  &::-webkit-scrollbar-thumb:hover {
    background-color: #9e9e8f; 
  }
`;
export const Nick = styled.span`
color: white;
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