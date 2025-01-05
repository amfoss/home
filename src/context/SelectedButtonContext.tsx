"use client";
import React, { createContext, useContext, useState, ReactNode } from 'react';

// Create the context
type SelectedButtonContextType = {
    selectedButton: string;
    setSelectedButton: (name: string) => void;
};

const SelectedButtonContext = createContext<SelectedButtonContextType | undefined>(undefined);

// Create a provider component
export const SelectedButtonProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [selectedButton, setSelectedButton] = useState<string>("dashboard");

    return (
        <SelectedButtonContext.Provider value={{ selectedButton, setSelectedButton }}>
            {children}
        </SelectedButtonContext.Provider>
    );
};

// Custom hook for easy access to the context
export const useSelectedButton = () => {
    const context = useContext(SelectedButtonContext);
    if (!context) {
        throw new Error("useSelectedButton must be used within a SelectedButtonProvider");
    }
    return context;
};
