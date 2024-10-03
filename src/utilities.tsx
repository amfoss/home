
import { ApolloClient, InMemoryCache } from '@apollo/client';

// Apollo Client setup for GraphQL API
const client = new ApolloClient({
  uri: 'https://root.shuttleapp.rs/',  // Replace with actual GraphQL API URL
  cache: new InMemoryCache(),
});

export default client;
