"use client";
import React from "react";
import SideBarButton from "./SidebarButton";
import { Award, CalendarCheck2, Home } from "lucide-react";
import { useSelectedButton } from "@/context/SelectedButtonContext"; // Adjust the path as necessary
import Image from 'next/image';

const buttons = [
    {
        name: "Dashboard",
        icon: <Home />
    },
    {
        name: "Leaderboard",
        icon: <Award />
    },
    {
        name: "Attendance",
        icon: <CalendarCheck2 />
    }
];

const SidePanel: React.FC = () => {
    const { setSelectedButton } = useSelectedButton();

    const handleButtonClick = (name: string) => {
        setSelectedButton(name);
    };

    return (
        <div className="flex flex-col items-center min-h-full p-5 bg-panelColor text-white w-full rounded-md">
            <div className="flex flex-col md:flex-row items-center">
                <Image
                    src="/amfoss-logo-white.png"
                    alt="amfoss-logo-white"
                    className="h-auto min-w-[10vw] sm:w-[10vw] md:w-[40px] lg:w-[50px] md:min-w-[40px] lg:min-w-[50px] max-h-auto"
                    width={50}
                    height={50}
                    priority
                />
                <div className="hidden md:flex flex-col text-center text-[20px] md:text-[24px] font-jetbrains items-center text-offWhite justify-center md:ml-2">
                    Home
                </div>
            </div>
            <div className="sm:flex flex-col space-y-4 font-jetbrains m-2 mt-10 overflow-hidden lg:w-full">
                {buttons.map((button, index) => (
                    <SideBarButton
                        key={index}
                        icon={button.icon}
                        text={button.name}
                        onClick={() => handleButtonClick(button.name.toLowerCase())}
                    />
                ))}
            </div>
        </div>
    );
};

export default SidePanel;
