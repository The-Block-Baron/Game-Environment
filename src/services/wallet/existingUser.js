export const checkExistingUser = async (username, email) => {
    try {
        const response = await fetch('http://localhost:3004/api/v1/user/checkExistingUser', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, email }),
        });

        const data = await response.json();

        if (response.status === 400) {
            return { canConnect: false, errors: data.errors.map(err => err.msg) };
        }

        return { canConnect: data.canConnect, errors: [] };
    } catch (error) {
        console.error("Error checking existing user:", error);
        return { canConnect: false, errors: ["Error checking existing user"] };
    }
}
