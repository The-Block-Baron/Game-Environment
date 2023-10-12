import { useState } from 'react';
import { connectToWallet } from './walletService';

const useWallet = () => {
  const [provider, setProvider] = useState(null);
  const [address, setAddress] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleConnect = async () => {

    if (loading) return;
    if (address) {
        console.log("Already connected");
        return;
    }

    setLoading(true);
    try {
        const { provider: newProvider, address: newAddress } = await connectToWallet();
        setProvider(newProvider);
        setAddress(newAddress);
        
      } catch (error) {
        console.error(`Error al conectar la wallet: `, error);
      } finally {
        setLoading(false);
      }
  };
  return { handleConnect, address, loading };
};

export default useWallet;
