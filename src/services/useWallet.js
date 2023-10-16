import { useState, useEffect } from 'react';
import { connectToWallet } from './wallet/walletService';
import { checkRegistration } from './wallet/checkRegistration';

export const useWallet = () => {
    const [address, setAddress] = useState(null);
    const [loading, setLoading] = useState(false);
    const [isRegistered, setIsRegistered] = useState(null);
    const [errors, setErrors] = useState([]);
    const [originalMessage, setOriginalMessage] = useState(null);
    const [signedMessage, setSignedMessage] = useState(null);
    const [showRegisterModal, setShowRegisterModal] = useState(false);



    useEffect(() => {
        // Verifica inicialmente si la cartera está conectada
        if (window.ethereum && window.ethereum.selectedAddress) {
            setAddress(window.ethereum.selectedAddress);
        } else {
            setAddress(null); // Esto reflejará que no hay cartera conectada
        }
    
        const handleAccountsChanged = (accounts) => {
            if (accounts.length === 0) {
                setAddress(null);
            } else {
                setAddress(accounts[0]);
            }
        };
    
        // Escucha el evento accountsChanged
        window.ethereum.on('accountsChanged', handleAccountsChanged);
        
        return () => {
            window.ethereum.removeListener('accountsChanged', handleAccountsChanged);
        };
    }, []);
    
    

  
    const handleConnect = async () => {
        if (loading || address) return;
        try {
            setLoading(true);
            const walletData = await connectToWallet();
            if (!walletData || !walletData.address) {
                throw new Error("Failed to connect to wallet");
            }
            setAddress(walletData.address);
            setOriginalMessage(walletData.originalMessage);
            setSignedMessage(walletData.signedMessage);

            // Check if the user is registered
            const registrationStatus = await checkRegistration(walletData.address);
            setIsRegistered(registrationStatus);
            if (!registrationStatus) {
                setShowRegisterModal(true);
            }
            
        } catch (error) {
            console.error(`Error al conectar la wallet: `, error);
            setErrors([error.message]);
        } finally {
            setLoading(false);
        }
    };
    
    return { 
        handleConnect, 
        address, 
        loading, 
        setIsRegistered,
        isRegistered,
        originalMessage,
        signedMessage,
        errors,
        showRegisterModal,
        setShowRegisterModal
    };
};
