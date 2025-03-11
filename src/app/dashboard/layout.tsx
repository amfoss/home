// src/app/dashboard/layout.tsx
import React from 'react';
import Sidebar from '@/components/Sidebar';
import { PropsWithChildren } from 'react';
import { SelectedButtonProvider } from '@/context/SelectedButtonContext';

const DashboardLayout = ({ children }: PropsWithChildren) => {
    return (
        <SelectedButtonProvider>
            <div className="flex min-h-screen w-full ">
                <div className="fixed left-0 top-0 h-screen z-50 md:w-2/12 md:sticky">
                    <Sidebar />
                </div>
                {/* Content area will take the remaining space */}
                <div className="bg-bgMainColor w-full md:w-10/12 ml-20 md:ml-0">
                    {children}
                </div>
            </div>
        </SelectedButtonProvider>
    );
};

export default DashboardLayout;
