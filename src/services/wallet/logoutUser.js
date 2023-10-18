export const logoutUser = async () => {
    try {
        const response = await fetch("http://localhost:3004/api/v1/auth/logout", {
            method: "POST",
            credentials: 'include',
        });

        const data = await response.json();
        if (!response.ok) {
            throw new Error(data.message || "Failed to log out.");
        }

        return data.message;

    } catch (error) {
        console.error("Error logging out:", error);
        throw error;
    }
};
