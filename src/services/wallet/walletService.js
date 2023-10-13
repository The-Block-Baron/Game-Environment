import { ethers } from "ethers";

export const connectToWallet = async () => {
  try {
    if (!window.ethereum) {
      throw new Error('El proveedor Ethereum no está instalado');
    }

    await window.ethereum.request({ method: 'eth_requestAccounts' });
    const provider = new ethers.BrowserProvider(window.ethereum);
    const [address] = await window.ethereum.request({ method: 'eth_accounts' });
    const originalMessage = "Por favor, firma este mensaje para iniciar sesión.";
    const signedMessage = await (await provider.getSigner()).signMessage(originalMessage);

    console.log("Connected to wallet with address:", address); // Log added for debugging
    return { provider, address, originalMessage, signedMessage };
  } catch (error) {
    console.error(`Error inside connectToWallet: `, error); // Log added for debugging
    throw error;
  }
};
