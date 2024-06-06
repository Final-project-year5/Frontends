// authService.js

// Function to check if the user is authenticated
export const isAuthenticated = () => {
  // Check if the access token is present in local storage
  const accessToken = localStorage.getItem('accessToken');
  return !!accessToken; // Returns true if the access token exists, false otherwise
};

// Function to get the user's role from the local storage
export const getUserRole = () => {
  const storedRole = localStorage.getItem('role');

  if (!storedRole) {
      return null; // Return null if role data is not found in local storage
  }

  try {
      // Parse the stored role data
      const role = JSON.parse(storedRole);
      console.log("authservice: ", role);
      return role; // Return the user's role
  } catch (error) {
      console.error('Error parsing stored role data:', error);
      return null; // Return null if there's an error
  }
};

// Function to log the user out
export const logout = () => {
  // Remove the access token from local storage
  localStorage.removeItem('accessToken');
  // Remove the role from local storage
  localStorage.removeItem('role');
  window.location.href = '/signin'; // Replace '/signin' with the actual URL of your sign-in page

};
