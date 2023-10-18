import { useState, useEffect } from 'react';
import { connectToWallet } from './wallet/walletService';
import { checkRegistration } from './wallet/checkRegistration';
import { checkTokenValidity } from './wallet/authService';

export const useWallet = () => {
    const [address, setAddress] = useState(null);
    const [loading, setLoading] = useState(false);
    const [isRegistered, setIsRegistered] = useState(null);
    const [errors, setErrors] = useState([]);
    const [showRegisterModal, setShowRegisterModal] = useState(false);
    const [userData, setUserData] = useState(null);



    useEffect(() => {
        const checkAndSetRegistration = async (addressToCheck) => {
            try {
                const registered = await checkRegistration(addressToCheck);
                setIsRegistered(registered);
            } catch (error) {
                console.error("Error checking registration:", error);
            }
        };
    
        const verifyTokenAndSetUserData = async () => {
            try {
                const user = await checkTokenValidity();
                setUserData(user);
            } catch (error) {
                console.error("Error verifying token:", error);
            }
        };
    
        if (window.ethereum && window.ethereum.selectedAddress) {
            const currentAddress = window.ethereum.selectedAddress;
            setAddress(currentAddress);
            checkAndSetRegistration(currentAddress);
        } else {
            setAddress(null);
        }

        verifyTokenAndSetUserData();
    
        const handleAccountsChanged = async (accounts) => {
            if (accounts.length === 0) {
                setAddress(null);
            } else {
                const newAddress = accounts[0];
                setAddress(newAddress);
                checkAndSetRegistration(newAddress);
            }
        };
    
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
        errors,
        showRegisterModal,
        setShowRegisterModal,
        userData,
        setUserData
    };
};
