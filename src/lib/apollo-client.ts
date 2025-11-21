"use client";
import { ApolloClient, InMemoryCache, HttpLink } from "@apollo/client";

const link = new HttpLink({
  uri: "http://localhost:8000",
  credentials: "include",
});

const client = new ApolloClient({
  cache: new InMemoryCache(),
  defaultOptions: {
    watchQuery: {
      fetchPolicy: "no-cache",
    },
    query: {
      fetchPolicy: "no-cache",
    },
    mutate: {
      fetchPolicy: "no-cache",
    },
  },
  link,
});

export default client;
