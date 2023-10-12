import React from 'react';
import useWallet from '../../services/useWallet';

import { Button } from './StyledHeader';
import { HeaderContainer } from './StyledHeader';

const Header = () => {
  const { handleConnect, address, loading } = useWallet();  // <-- Destructure loading

  return (
    <HeaderContainer>
      <Button onClick={handleConnect} disabled={loading}>  {/* <-- Disable button if loading */}
        {address ? 'Connected' : 'Connect'}
      </Button>
    </HeaderContainer>
  );
}

export default Header;
