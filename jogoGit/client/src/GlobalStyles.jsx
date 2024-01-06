import { createGlobalStyle, styled } from 'styled-components';

export const PageStyles = createGlobalStyle`
body {
    background-color: #242629;
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
}
`;
export const PDev = styled.p`
color: #ffffff; 
font-family: sans-serif;
font-weight: bolder;
margin-right: 4px;
`;
export const Container = styled.div`
.divdev {
display: flex;
align-items: center;
position: fixed;
bottom: 0;
right: 0;
margin: 0;
padding: 10px;
}
.svgdev {
    color: #b737f1;
}
`;