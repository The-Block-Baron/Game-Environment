import React, { useState } from 'react';
import { ethers } from 'ethers';

import { Button } from './StyledHeader';
import { HeaderContainer } from './StyledHeader';

const Header = () => {
  const [provider, setProvider] = useState(null);

  const handleConnect = async () => {
    try {
      let currentProvider = provider;

      if (!window.ethereum) {
        throw new Error('El proveedor Ethereum no está instalado');
      }

      if (!currentProvider) {
        await window.ethereum.request({ method: 'eth_requestAccounts' });
        currentProvider = new ethers.BrowserProvider(window.ethereum)
        setProvider(currentProvider);
      }

      const [address] = await window.ethereum.request({ method: 'eth_accounts' });
      console.log(`Connected wallet: `, address);

    } catch (error) {
      console.error(`Error al conectar la wallet: `, error);
    }
};



  return (
    <HeaderContainer>
      <Button onClick={handleConnect}>
        Connect
      </Button>
    </HeaderContainer>
  );
}

export default Header;
