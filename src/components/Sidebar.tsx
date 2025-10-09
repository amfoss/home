"use client";
import React, { useState, useEffect } from "react";
import SideBarButton from "./SidebarButton";
import { Award, CalendarCheck2, Home, Menu, X } from "lucide-react";
import Image from 'next/image';
import { useRouter } from 'next/navigation';

const buttons = [
    {
        name: "Dashboard",
        icon: <Home />,
        path: "/dashboard"
    },
    {
        name: "Leaderboard",
        icon: <Award />,
        path: "/cp-leaderboard"
    },
    {
        name: "Attendance",
        icon: <CalendarCheck2 />,
        path: "/attendance"
    },
    {
        name: "Profile",
        icon: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-user"><circle cx="12" cy="8" r="5"/><path d="M20 21a8 8 0 1 0-16 0"/></svg>,
        path: "/profile"
    }
];

const SidePanel: React.FC = () => {
    const router = useRouter();
    const [isExpanded, setIsExpanded] = useState(false);
    const [isMounted, setIsMounted] = useState(false);

 
    useEffect(() => {
        setIsMounted(true);
    }, []);

    const handleButtonClick = (path: string) => {
        router.push(path);
        setIsExpanded(false);
    };

    const toggleSidebar = () => {
        setIsExpanded(!isExpanded);
    };

    return (
        <div className="relative md:bg-panelColor md:rounded-md md:min-h-full">
            {/* Mobile menu button - positioned in the header */}
            {isMounted && (
                <button 
                    onClick={toggleSidebar}
                    className="p-2 rounded-md md:hidden z-40"
                    aria-label={isExpanded ? "Close sidebar" : "Open sidebar"}
                >
                    <Menu className="w-5 h-5 text-offWhite" />
                </button>
            )}
            
            {/* Mobile View - Background overlay */}
            {isMounted && (
                <div 
                    className={`
                        fixed md:hidden inset-0 bg-black bg-opacity-60 z-30
                        ${isExpanded ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}
                        transition-opacity duration-300
                    `}
                    onClick={() => setIsExpanded(false)}
                />
            )}
            
            {/* Full sidebar content */}
            <div 
                className={`
                    ${isExpanded 
                        ? 'fixed inset-y-0 left-0 w-[280px] z-40 shadow-2xl' 
                        : 'hidden md:flex'}
                    flex-col items-center p-4
                    transition-all duration-300 ease-in-out
                    bg-panelColor text-white overflow-y-auto
                    md:static md:w-full md:min-h-full md:rounded-md md:shadow-none
                `}
            >
                {/* Close button for mobile expanded sidebar */}
                {isMounted && isExpanded && (
                    <button 
                        onClick={toggleSidebar}
                        className="absolute top-4 right-4 p-2 rounded-md bg-panelButtonColor md:hidden"
                        aria-label="Close sidebar"
                    >
                        <X className="w-5 h-5 text-offWhite" />
                    </button>
                )}
                {/* Logo and title */}
                <div className="flex flex-col items-center justify-center mb-6 md:mb-5 w-full pt-4">
                    <Image
                        src="/amfoss-logo-white.png"
                        alt="amfoss-logo-white"
                        className="w-[40px] h-auto sm:w-[45px] md:w-[45px] lg:w-[50px] object-contain"
                        width={50}
                        height={50}
                        priority
                    />
                    <div className="text-center text-base sm:text-lg font-jetbrains text-offWhite mt-2">
                        Home
                    </div>
                </div>
                <div className="flex flex-col space-y-3 font-jetbrains w-full">
                    {buttons.map((button, index) => (
                        <SideBarButton
                            key={index}
                            icon={button.icon}
                            text={button.name}
                            onClick={() => handleButtonClick(button.path)}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default SidePanel;
