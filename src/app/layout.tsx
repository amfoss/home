'use client';
import "@/styles/globals.css";
import { ReactNode } from 'react';
import { ApolloProvider } from '@apollo/client';
import client from "@/lib/apollo-client";
import icon from "@/../public/amfoss-logo-white-square.png";
export default function Layout({ children }: { children: ReactNode }) {
    return (
        <html>
            <head>
                <link rel="icon" type="image/png" href={icon.src} sizes="32x32" />
                <meta charSet="UTF-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <title>Home</title>
            </head>
            <body className="w-screen h-screen" suppressHydrationWarning>
                <ApolloProvider client={client}>
                    {children}
                </ApolloProvider>
            </body>
        </html>
    );
}
