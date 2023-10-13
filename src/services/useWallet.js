import { useState } from 'react';

import { connectToWallet } from './wallet/walletService';
import { checkRegistration } from './wallet/checkRegistration';
import { loginUser } from './wallet/loginUser';

export const useWallet = () => {
    const [address, setAddress] = useState(null);
    const [loading, setLoading] = useState(false);
    const [isRegistered, setIsRegistered] = useState(null);
    const [showConnectPrompt, setShowConnectPrompt] = useState(false);
    const [errors, setErrors] = useState([]);
  
    const handleConnect = async () => {
        if (loading || address) return;
        try {
            await proceedToConnect();
        } catch (error) {
            console.error("Error al conectar:", error);
        }
    };
    
    const proceedToConnect = async () => {
        setLoading(true);
        try {
            if (isRegistered) {
                return;
            }

            const walletData = await connectToWallet();
            if (!walletData || !walletData.address) {
                throw new Error("Failed to connect to wallet");
            }
            setAddress(walletData.address);
            const registrationStatus = await checkRegistration(walletData.address);
            setIsRegistered(registrationStatus);
            
            if(registrationStatus) {
                try {
                    loginUser(walletData.address, walletData.signedMessage, walletData.originalMessage);
                } catch (loginError) {
                    console.error("Error during login:", loginError);
                    setErrors(prevErrors => [...prevErrors, loginError.message]);
                }
            } else {
                setShowConnectPrompt(true);
            }
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
        hideConnectPrompt,
        address, 
        loading, 
        isRegistered,
        showConnectPrompt,
        errors
    };
};
