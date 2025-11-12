"use client";
import React from 'react';
import Sidebar from '@/components/Sidebar';
import { Toaster } from 'react-hot-toast';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="flex flex-col min-h-screen w-full">
            <Toaster></Toaster>
            {/* Mobile Header*/}
            <div className="md:hidden h-14 bg-panelColor w-full flex items-center px-4 shadow-md">
                <div className="md:hidden">
                    <Sidebar />
                </div>
                <div className="flex items-center justify-center w-full">
                    <div className="text-white font-jetbrains text-lg">Home</div>
                </div>
            </div>
            <div className="flex flex-1 relative">
                {/* Desktop Sidebar*/}
                <div className="hidden md:block md:w-[180px] lg:w-[200px] h-[calc(100vh-0px)] top-0 sticky">
                    <Sidebar />
                </div>
                <div className="w-full md:w-[calc(100%-180px)] lg:w-[calc(100%-200px)] bg-bgMainColor min-h-[calc(100vh-56px)] md:min-h-screen">
                    {children}
                </div>
            </div>
        </div>
    );
}
