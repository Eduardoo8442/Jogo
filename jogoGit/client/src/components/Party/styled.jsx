import styled, { createGlobalStyle} from 'styled-components';
export const PageStyles = createGlobalStyle`
body {
    margin: 0;
    padding: 0;
}
`;
export const Container = styled.div`

`;
export const ContainerQuery = styled.div`
display: flex;
justify-content: center;
flex-direction: column;
align-items: center;
`;
export const ContainerParty = styled.div`

`;
export const ContainerGame = styled.div`
.dica {
    display: flex;
    justify-content: center;
}
`;
export const Paragrafo = styled.span`

`;
export const ContainerChat = styled.div`
border: 1px solid red;
height: 200px;
position: absolute;
bottom: 0;
width: 100%;
overflow-y: auto;
display: flex;
flex-direction: column;
.correct {
    color: #03ff03;
}
.failure {
    color: red;
}
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
export const Titulo= styled.h1`
display: flex;
justify-content: center;
color: white;
font-family: sans-serif;
`;
export const Button = styled.button`
width: 300px;
height: 40px;
border-style: none;
border-radius: 10px;
margin-top: 40px;
&:hover {
    background-color: #292626;
    color: white;
}
`;
export const Input = styled.input`
width: 300px;
height: 40px;
margin-top: 30px;
font-size: 20px;
background-color: grey;
color: white;
border-style: none;
border-radius: 10px;
&::placeholder {
  color: white;
}
`;
export const Caractere = styled.span`
color: white;
font-size: 40px;
margin-right: 10px;
`;
export const InputChat = styled.input`
display: flex;
margin: auto;
margin-top: 100px;
height: 40px;
width: 400px;
border-style: none;
border-radius: 10px;
`;