'use client';
import "@/styles/globals.css";
import { ReactNode } from 'react';
import { ApolloProvider } from '@apollo/client';
import client from "@/lib/apollo-client";
import icon from "@/../public/amfoss-logo-white-square.png";
import { MemberProvider } from '@/context/MemberContext';

export default function RootLayout({ children }: { children: ReactNode }) {
    return (
        <html lang="en">
            <head>
                <link rel="icon" type="image/png" href={icon.src} sizes="32x32" />
                <meta charSet="UTF-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <title>Home</title>
            </head>
            <body className="w-screen h-screen">
                <MemberProvider>
                    <ApolloProvider client={client}>
                        {children}
                    </ApolloProvider>
                </MemberProvider>
            </body>
        </html>
    );
}
