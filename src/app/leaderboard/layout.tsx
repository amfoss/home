// src/app/dashboard/layout.tsx
import React from 'react';
import Sidebar from '@/components/Sidebar';
import { PropsWithChildren } from 'react';
import { SelectedButtonProvider } from '@/context/SelectedButtonContext';

const DashboardLayout = ({ children }: PropsWithChildren) => {
    return (
        <SelectedButtonProvider>
            <div className="flex min-h-screen w-full ">
                <div className='w-2/12 h-screen top-0 sticky'>
                    <Sidebar />
                </div>
                {/* Content area will take the remaining space */}
                <div className="w-10/12 bg-bgMainColor">
                    {children}
                </div>
            </div>
        </SelectedButtonProvider>
    );
};

export default DashboardLayout;
