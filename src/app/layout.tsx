import "@/styles/globals.css";
import { ReactNode } from 'react';
import ApolloProviderWrapper from "@/components/ApolloProviderWrapper";
import { siteMetadata } from "@/lib/metadata";

export const metadata = siteMetadata;

export default function Layout({ children }: { children: ReactNode }) {
    return (
        <html>
            <body className="w-screen h-screen" suppressHydrationWarning>
                <ApolloProviderWrapper>
                    {children}
                </ApolloProviderWrapper>
            </body>
        </html>
    );
}
