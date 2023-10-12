import { ethers } from 'ethers';

export const connectToWallet = async () => {

  try {
  if (!window.ethereum) {
    throw new Error('El proveedor Ethereum no está instalado');
  }

  await window.ethereum.request({ method: 'eth_requestAccounts' });
  const provider = new ethers.BrowserProvider(window.ethereum);
  const [address] = await window.ethereum.request({ method: 'eth_accounts' });
  console.log(`Connected wallet: `, address);

  return { provider, address }
  } catch (error) {
    console.error(`Error al conectar la wallet: `, error);
  }
};
