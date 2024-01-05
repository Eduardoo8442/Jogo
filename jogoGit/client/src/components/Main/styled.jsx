import styled from 'styled-components';

export const Container = styled.div`
display: flex;
flex-direction: column;
`;
export const Servers = styled.div`
margin-top: 80px;
display: flex;
flex-direction: column;
`;
export const Image = styled.img`
  display: flex;
  justify-content: center;
  margin: auto;
  border-radius: 50%;
  width: 150px;
  height: 150px;
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
export const Nameh1 = styled.h1`
display: flex;
justify-content: center;
color: white;
font-family: sans-serif;
font-size: 40px;
`;
export const Input = styled.input`
margin: auto;
width: 300px;
height: 40px;
font-size: 20px;
border-radius: 6px;
border: 3px solid grey;
`;