export const loginUser = async (walletAddress, signedMessage, originalMessage) => {
    try {
        console.log(signedMessage)
        const response = await fetch("https://localhost:3004/api/v1/auth/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ walletAddress, signedMessage, originalMessage }),
            credentials: 'include',
        });

        const data = await response.json();
        if (!response.ok) {
            const errorMessage = data.errors && data.errors.length > 0 ? data.errors[0].msg : "Failed to log in";
            console.error("Server error:", errorMessage);
            throw new Error(errorMessage);
        }

        return data.user;  

    } catch (error) {
        console.error("Error logging in:", error);
        throw error;
    }
};
