import styled from 'styled-components';

export const Container = styled.div`
display: flex;
flex-direction: column;
.divMaeImage {
  display: flex;
  justify-content: center;
}
.labelimage {
  display: inline-block;
  background-color: red;
}
.divImage {
  display: inline-block;
  &:hover {
    #imageButton {
      transition: 0.3s;
    filter: brightness(0.2); 
    }

    .textImage {
      opacity: 1;
    }
  }
}
.textImage {
  display: inline-block;
  color: white;
  position: absolute;
  left: 50%;
  top: 13%;
  transform: translate(-50%, -50%);
  margin: 0;
  padding: 10px;
  font-size: 30px;
  font-family: sans-serif;
  color: #fff;
  opacity: 0;
  transition: 0.3s;
}
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
  transition: 0.3s;
`;
export const Button = styled.button`
background-color: #201f1f;
color: white;
width: 300px;
height: 60px;
margin: auto;
font-size: 20px;
margin-top: 10px;
border-style: none;
border-radius: 8px;
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