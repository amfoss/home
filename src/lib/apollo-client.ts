"use client";
import { ApolloClient, InMemoryCache } from "@apollo/client";

// Apollo Client setup for GraphQL API
const client = new ApolloClient({
  uri: "https://root.shuttleapp.rs/",
  cache: new InMemoryCache(),
});

export default client;
