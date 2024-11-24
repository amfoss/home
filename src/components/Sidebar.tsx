"use client";
import React from "react";
import SideBarButton from "./SidebarButton";
import { Award, CalendarCheck2, UserRound } from "lucide-react";
import { useSelectedButton } from "@/context/SelectedButtonContext"; // Adjust the path as necessary
import Image from 'next/image';

const buttons = [
    {
        name: "Attendance",
        icon: <CalendarCheck2 />
    },
    {
        name: "Leaderboard",
        icon: <Award />
    },
    {
        name: "Profile",
        icon: <UserRound />
    }
];

const SidePanel: React.FC = () => {
    const { setSelectedButton } = useSelectedButton();

    const handleButtonClick = (name: string) => {
        setSelectedButton(name);
        console.log(`${name} button clicked`);
    };

    return (
        <div className="flex flex-col items-center min-h-full p-5 bg-panelColor text-white w-full">
            {/* Container for logo and text */}
            <div className="flex flex-col md:flex-row items-center">
                {/* Logo Image */}
                <Image
                    src="/amfoss-logo-white.png"
                    alt="amfoss-logo-white"
                    className="h-auto min-w-[10vw] sm:w-[10vw] md:w-[40px] lg:w-[50px] md:min-w-[40px] lg:min-w-[50px] max-h-auto"
                    width={50} // Replace with your intended width
                    height={50} // Replace with your intended height
                    priority // Ensures this image is loaded quickly
                />
                {/* Home Text (visible only on md and larger screens) */}
                <div className="hidden md:flex flex-col text-center text-[20px] md:text-[24px] font-jetbrains items-center text-offWhite justify-center md:ml-2">
                    Home
                </div>
            </div>

            {/* SidePanel Buttons */}
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
