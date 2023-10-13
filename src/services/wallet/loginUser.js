// export const loginUser = async (walletAddress) => {
//     try {
//         const originalMessage = "Please sign this message to log in.";
//         const signedMessage = await window.ethereum.request({
//             method: "personal_sign",
//             params: [originalMessage, walletAddress],
//         });

//         const response = await fetch("http://localhost:3004/api/v1/auth/login", {
//             method: "POST",
//             headers: {
//                 "Content-Type": "application/json",
//             },
//             body: JSON.stringify({ walletAddress, signedMessage, originalMessage }),
//         });

//         const data = await response.json();
//         if (!response.ok) {
//             throw new Error(data.message || "Failed to log in.");
//         }
//     } catch (error) {
//         console.error("Error logging in:", error);
//         throw error;
//     }
// };