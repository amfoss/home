/**
 * Application configuration
 * Centralized config for backend URLs and other settings
 */

export const config = {
  backendUrl: process.env.NODE_ENV === "production" 
    ? "https://root.amfoss.in" 
    : "http://localhost:8000",

  get graphqlUrl() {
    return `${this.backendUrl}/graphiql`;
  },

  get githubAuthUrl() {
    return `${this.backendUrl}/auth/github`;
  },
} as const;
