export const validateFields = (username, email, confirmEmail) => {
    const errors = [];

    if (!username) errors.push("Username is required");
    if (username.length < 4) errors.push("Username must be at least 4 characters long");
    if (!email) errors.push("Email is required");
    if (email !== confirmEmail) errors.push("Emails do not match");

    return errors;
}
