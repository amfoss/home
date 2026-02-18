"use client";
import { ApolloClient, InMemoryCache, HttpLink } from "@apollo/client";
import { config } from "./config";

const link = new HttpLink({
  uri: config.graphqlUrl,
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
