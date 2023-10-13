import { useState } from 'react';
import { connectToWallet } from './wallet/walletService';

export const useWallet = () => {
    const [address, setAddress] = useState(null);
    const [loading, setLoading] = useState(false);
    const [isRegistered, setIsRegistered] = useState(null);
    const [showConnectPrompt, setShowConnectPrompt] = useState(false);
    const [errors, setErrors] = useState([]);
  
    const handleConnect = async () => {
        if (loading || address) return;
        setShowConnectPrompt(true);
    };
    
    const proceedToConnect = async () => {
        setLoading(true);
        try {
            const walletData = await connectToWallet();
            if (!walletData || !walletData.address) {
                throw new Error("Failed to connect to wallet");
            }
            setAddress(walletData.address);
        } catch (error) {
            console.error(`Error al conectar la wallet: `, error);
            setErrors([error.message]);
        } finally {
            setLoading(false);
        }
    };

    const hideConnectPrompt = () => {
        setShowConnectPrompt(false);
    };
    
    return { 
        handleConnect, 
        proceedToConnect,
        hideConnectPrompt,
        address, 
        loading, 
        isRegistered,
        showConnectPrompt,
        errors
    };
};
