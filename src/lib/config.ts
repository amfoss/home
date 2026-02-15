/**
 * Application configuration
 * Centralized config for backend URLs and other settings
 */

export const config = {
  /**
   * Backend API URL
   * Change this to switch between development and production
   */
  backendUrl: "http://localhost:8000",

  /**
   * GraphQL endpoint
   */
  get graphqlUrl() {
    return `${this.backendUrl}/graphiql`;
  },

  /**
   * GitHub OAuth redirect URL
   */
  get githubAuthUrl() {
    return `${this.backendUrl}/auth/github`;
  },
} as const;
