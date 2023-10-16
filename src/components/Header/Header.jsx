import React from 'react';
import { useState } from 'react';

import { registerUser } from '../../services/wallet/registerUser';
import { loginUser } from '../../services/wallet/loginUser';

import { useWallet } from '../../services/useWallet';
import { Button, Modal, Input, StatusCircle, SignUp, Welcome, LabelContainer, ButtonContainer, StyledButton, CloseButton } from './StyledHeader';  // Asumiendo que tienes un componente Styled para el círculo verde
import { HeaderContainer } from './StyledHeader';

const Header = () => {
    const { 
        handleConnect, 
        setIsRegistered,
        address, 
        loading, 
        isRegistered, 
        originalMessage,
        signedMessage,
        showRegisterModal,
        setShowRegisterModal
    } = useWallet();
    

    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [confirmEmail, setConfirmEmail] = useState("");
    const [userData, setUserData] = useState(null); 

    const handleOutsideClick = (e) => {
        if (e.target.id === "modalContainer") {
            hideConnectPrompt();
        }
    };

    const handleRegistration = async () => {
        if (email !== confirmEmail) {
            alert(["Email and Confirm Email do not match"]);
            return;
        }

        try {
            await registerUser(address, username, email);
            setIsRegistered(true);
            setShowRegisterModal(false); 
        } catch (error) {
            alert([error.message]);
        }
    
    };

    const handleLogin = async () => {
        try {
            const user = await loginUser(address, signedMessage, originalMessage);
            console.log(user)
            setUserData(user);
        } catch (error) {
            console.error("Error during login:", error);
        }
    };

    const hideConnectPrompt = () => {
        setShowRegisterModal(false)
    }

    return (
        <HeaderContainer>
            {address && <StatusCircle />}  {/* Círculo verde */}
            <Button onClick={handleConnect} disabled={loading}>
                {address ? 'CONNECTED' : 'CONNECT'}
            </Button>

            {address && !isRegistered && <Button onClick={() => setShowRegisterModal(true)}>REGISTER</Button>}
            {!userData && address && isRegistered && <Button onClick={handleLogin}>LOGIN</Button>}

            {userData && (
                <div>
                    <h2>Hey, {userData.username}</h2>
                    <small>{address}</small>
                </div>
            )}

            {showRegisterModal && (
                <div id="modalContainer" onClick={handleOutsideClick} style={{
                    position: 'fixed', 
                    top: 0, 
                    left: 0, 
                    right: 0, 
                    bottom: 0, 
                    display: 'flex', 
                    justifyContent: 'center', 
                    alignItems: 'center',
                    backgroundColor: 'rgba(0, 0, 0, 0.7)'  // <-- This will make the background darker
                }}>
                    <Modal>
                        <CloseButton onClick={() => setShowRegisterModal(false)}>X</CloseButton>
                        <SignUp className='sign--up'>SIGN UP FORM</SignUp>
                        <Welcome>WELCOME<span style={{fontFamily:"Inter"}}>,</span> REGISTER TO RECEIVE THE LATEST UPDATES<br/><span /* ... otros estilos ... */>{address}</span></Welcome>
                        
                        <LabelContainer>
                            <label>Username</label>
                            <Input type="text" value={username} onChange={e => setUsername(e.target.value)} required />
                        </LabelContainer>

                        <LabelContainer>
                            <label>Email</label>
                            <Input type="email" value={email} onChange={e => setEmail(e.target.value)} required />
                        </LabelContainer>

                        <LabelContainer>
                            <label>Confirm Email</label>
                            <Input type="email" value={confirmEmail} onChange={e => setConfirmEmail(e.target.value)} required />
                        </LabelContainer>

                        <ButtonContainer>
                            <StyledButton onClick={() => setShowRegisterModal(!showRegisterModal)}>I'd rather not</StyledButton>
                            <StyledButton onClick={handleRegistration}>Sign Up</StyledButton>
                        </ButtonContainer>
                    </Modal>
                </div>
            )}
        </HeaderContainer>
    );
}

export default Header;
