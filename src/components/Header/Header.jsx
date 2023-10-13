import React from 'react';

import { useWallet } from '../../services/useWallet';
import { Button, Modal } from './StyledHeader';
import { HeaderContainer } from './StyledHeader';

const Header = () => {
    const { 
        handleConnect, 
        proceedToConnect,
        hideConnectPrompt,
        address, 
        loading, 
        isRegistered, 
        showConnectPrompt 
    } = useWallet();

    const handleOutsideClick = (e) => {
        if (e.target.id === "modalContainer") {
            hideConnectPrompt();
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
                        <h3>Connect to MetaMask</h3>
                        <Button onClick={proceedToConnect}>Connect</Button>
                    </Modal>
                </div>
            )}
        </HeaderContainer>
    );
}

export default Header;


