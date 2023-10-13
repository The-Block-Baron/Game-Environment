import styled from "styled-components";

export const Button = styled.button`
    text-decoration: none;
    color: white;
    font-family: Afogand;
    letter-spacing: 2.5px;
    background: #222;
    border: none;
    `

export const HeaderContainer = styled.div`
    display: flex;
    justify-content: flex-end;
    background-color: #1B1B1B;
    padding: 20px;
`
export const Modal = styled.div`
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    padding: 20px;
    border: 1px solid #ccc;
    background-color: #fff;
    z-index: 1000;
`;

export const Input = styled.input`
    display: block;
    margin: 10px 0;
    padding: 5px;
    border: 1px solid #ccc;
`;
