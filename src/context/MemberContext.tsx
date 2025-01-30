import { createContext, useContext, ReactNode, useState } from 'react';
import { MemberDetails } from '@/types/types';

type MemberContextType = {
    selectedMember: MemberDetails | null;
    setSelectedMember: (member: MemberDetails | null) => void;
};

const MemberContext = createContext<MemberContextType | undefined>(undefined);

export function MemberProvider({ children }: { children: ReactNode }) {
    const [selectedMember, setSelectedMember] = useState<MemberDetails | null>(null);

    return (
        <MemberContext.Provider value={{ selectedMember, setSelectedMember }}>
            {children}
        </MemberContext.Provider>
    );
}

export function useMember() {
    const context = useContext(MemberContext);
    if (context === undefined) {
        throw new Error('useMember must be used within a MemberProvider');
    }
    return context;
} 