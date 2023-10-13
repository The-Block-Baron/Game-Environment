import React from 'react';
import { useState } from 'react';

import { registerUser } from '../../services/wallet/registerUser';
import { loginUser } from '../../services/wallet/loginUser';  // <-- Importa loginUser

import { useWallet } from '../../services/useWallet';
import { Button, Modal, Input } from './StyledHeader';
import { HeaderContainer } from './StyledHeader';

const Header = () => {
    const { 
        handleConnect, 
        hideConnectPrompt,
        address, 
        loading, 
        isRegistered, 
        showConnectPrompt 
    } = useWallet();

    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [confirmEmail, setConfirmEmail] = useState("");

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
            await loginUser(address);
            hideConnectPrompt();
        } catch (error) {
            alert([error.message]);
        }
    };

    return (
        <HeaderContainer>
            <Button onClick={handleConnect} disabled={loading}>
                {address ? (isRegistered ? 'Wallet Registered' : 'Wallet Not Registered') : 'Connect'}
            </Button>

            {showConnectPrompt && (
                <div id="modalContainer" onClick={handleOutsideClick} style={{
                    position: 'fixed', 
                    top: 0, 
                    left: 0, 
                    right: 0, 
                    bottom: 0, 
                    display: 'flex', 
                    justifyContent: 'center', 
                    alignItems: 'center',
                    backgroundColor: 'rgba(0, 0, 0, 0.3)'  // <-- This will make the background darker
                }}>
                    <Modal>
                        <h3>Register</h3>
                        <Input type="text" placeholder="Username" value={username} onChange={e => setUsername(e.target.value)} required />
                        <Input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} required />
                        <Input type="email" placeholder="Confirm Email" value={confirmEmail} onChange={e => setConfirmEmail(e.target.value)} required />
                        <Button onClick={handleRegistration}>Register</Button>
                    </Modal>
                </div>
            )}
        </HeaderContainer>
    );
}

export default Header;
