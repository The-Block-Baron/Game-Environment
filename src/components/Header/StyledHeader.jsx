import styled from "styled-components";

export const Button = styled.button`
    text-decoration: none;
    color: white;
    font-family: Afogand;
    letter-spacing: 2.5px;
    background: transparent;
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
    font-family: Inter;
    letter-spacing: 2.2px;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    border: 1px solid #ccc;
    border-radius: 10px;
    background-color: #121212;
    z-index: 1000;
    width: 700px;
    border:0.5px solid #E0E0E0;
`;

export const StatusCircle = styled.div`
    border: 1px solid white;
    background-color: green;
    width: 20px;
    border-radius: 10px;
`;

export const Input = styled.input`
    margin: 10px 0;
    padding: 5px;
    height: 50px;
    font-family: Afogand;
    letter-spacing: 2px;
    font-size: 18px;
    padding-left: 15px;
    border-radius: 10px;
    border:none;
    `;

export const SignUp = styled.h3`
    background-color: #E0E0E0;
    font-family: Afogand;
    letter-spacing: 3px;
    color: #171717;
    text-align: center;
    margin-top: 0;
    border-radius: 10px;
    padding: 30px;
`

export const Welcome = styled.h5`
    line-height: 25px;
    padding: 0 30px;
    font-family: Afogand;
    letter-spacing: 3px;
    text-align: center;
    margin-bottom: 50px;
`
export const LabelContainer = styled.div`
    width: 100%;
    display: grid;  // Usa grid para alinear la etiqueta y el input
    grid-template-columns: 180px 350px;  // El label ocupará el espacio hasta 360px (lo que deja 40px de margen) y el input tendrá un ancho de 400px
    gap: 10px;  // Espacio entre la etiqueta y el input
    margin: 10px 0;  // Espacio entre cada LabelContainer
    align-items:center;
   justify-content: center;
   padding-bottom: 30px;
   font-family: Afogand;
   letter-spacing: 3px;
`;


export const ButtonContainer = styled.div`
    display: flex;
    justify-content: space-between; 
    margin-top: 50px; 
    padding-bottom: 30px;
    padding-left: 75px;
    padding-right: 80px;
    margin-bottom: 30px;
`;

export const StyledButton = styled.button`
    padding: 10px 30px;
    border: 2px solid white;
    background-color: #E0E0E0;
    font-family: Afogand;
    letter-spacing: 2px;
    font-size: 18px;
    color: #121212;
    cursor: pointer;
    border-radius: 5px; 
    transition: background-color 0.3s; 

    &:hover {
        background-color: #121212;
        color: #E0E0E0
    }
`;

export const CloseButton = styled.span`
    position: absolute;
    top: 10px;
    left: 20px;
    cursor: pointer;
    color: red;
    font-size: 15px;
    font-weight: bold;
    font-family: Afogand;
`;