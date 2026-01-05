"use client";

import { ApolloProvider } from '@apollo/client';
import client from "@/lib/apollo-client";
import { ReactNode } from 'react';

export default function ApolloProviderWrapper({ children }: { children: ReactNode }) {
    return (
        <ApolloProvider client={client}>
            {children}
        </ApolloProvider>
    );
}
