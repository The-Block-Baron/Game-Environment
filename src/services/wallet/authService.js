// services/authService.js

export const checkTokenValidity = async () => {
    try {
      const response = await fetch("http://localhost:3004/api/v1/auth/check-token", {
        method: "GET",
        credentials: 'include', 
      });
  
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || "Token verification failed.");
      }
  
      return data.user;
    } catch (error) {
      console.error("Error checking token:", error);
      throw error;
    }
  };
  