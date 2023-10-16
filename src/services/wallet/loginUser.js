export const loginUser = async (walletAddress, signedMessage, originalMessage) => {
    try {
        const response = await fetch("http://localhost:3004/api/v1/auth/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ walletAddress, signedMessage, originalMessage }),
        });

        const data = await response.json();
        if (!response.ok) {
            throw new Error(data.message || "Failed to log in.");
        }

        return data.user;  

    } catch (error) {
        console.error("Error logging in:", error);
        throw error;
    }
};
