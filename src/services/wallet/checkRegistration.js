

export const checkRegistration = async (walletAddress) => {
    try {
        const response = await fetch(`https://localhost:3004/api/v1/user/isRegistered`, {
            credentials: 'include',
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ walletAddress }),
        });
        console.log('Response from server:', response);
        const data = await response.json();
        console.log('Data from server:', data);
        return data.isRegistered;

    } catch (error) {
        console.error('Error checking user registration:', error);
        throw error;
    }
};