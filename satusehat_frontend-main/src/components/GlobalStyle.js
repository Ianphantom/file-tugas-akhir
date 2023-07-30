import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
    *{
        margin: 0;
        padding: 0;
        box-sizing: border-box;
        font-family: 'Inter', sans-serif;
    }

    .padding-screen{
        padding: 0px 5rem;
    }

    a:hover{
        list-style: none;
        text-decoration: none;
    }
`;

export default GlobalStyle;
