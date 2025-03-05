"use client";


const CLIENT_ID = process.env.NEXT_PUBLIC_GITHUB_CLIENT_ID;
const REDIRECT_URI = process.env.NEXT_PUBLIC_GITHUB_REDIRECT_URI;

export const AuthService = {
  /**
   * Redirects user to GitHub login page for authentication.
   */
  loginWithGitHub() {
    window.location.href = `http://github.com/login/oauth/authorize?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&scope=read:user`;
  },


  /**
   * Stores the authentication token in local storage.
   * @param {string} token - GitHub OAuth token.
   */
  saveToken(token: string) {
    localStorage.setItem("github_token", token);
  },

  /**
   * Retrieves the authentication token from local storage.
   * @returns {string | null} - The stored token or null if not found.
   */
  getToken() {
    return localStorage.getItem("github_token");
  },

  /**
   * Removes the authentication token from local storage and logs out the user.
   */
  logout() {
    localStorage.removeItem("github_token");
    window.location.reload();
  },

  /**
   * Checks if the user is authenticated by verifying if a token exists.
   * @returns {boolean} - True if authenticated, false otherwise.
   */
  isAuthenticated() {
    return Boolean(localStorage.getItem("github_token"));
  },
};
