export const registerUser = async (walletAddress, username, email) => {
    try {
        const response = await fetch("https://localhost:3004/api/v1/auth/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ walletAddress, username, email }),
        });

        const data = await response.json();
        if (!response.ok) {
            throw new Error(data.message || "Failed to register user.");
        }
    } catch (error) {
        console.error("Error registering user:", error);
        throw error;
    }
};
