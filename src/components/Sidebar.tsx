"use client";
import React, { useState, useEffect } from "react";
import SideBarButton from "./SidebarButton";
import { Award, CalendarCheck2, Home } from "lucide-react";
import { useSelectedButton } from "@/context/SelectedButtonContext"; // Adjust the path as necessary
import Image from 'next/image';
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";

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
    const [collapsed, setcollapsed] = useState(true);
    const [isMobile, setIsMobile] = useState(false);
    const { setSelectedButton } = useSelectedButton();

    const handleButtonClick = (name: string) => {
        setSelectedButton(name);
    };
    const toggleCollapsed = () => {
        setcollapsed(!collapsed);
    }

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 768);
        };

        handleResize();
        window.addEventListener('resize', handleResize);

        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (!isMobile ?
        <div className="flex flex-col items-center min-h-full py-5 px-3 bg-panelColor text-white w-full">
            <div className="flex flex-row md:justify-evenly w-full">
                <div className="flex flex-col md:flex-row items-center">
                    <Image
                        src="/amfoss-logo-white.png"
                        alt="amfoss-logo-white"
                        className="h-auto min-w-[10vw] md:w-[40px] lg:w-[50px] md:min-w-[40px] lg:min-w-[50px] max-h-auto"
                        width={50}
                        height={50}
                        priority
                    />
                    <div className="md:flex flex-col text-center text-[20px] md:text-[24px] font-jetbrains items-center text-offWhite justify-center md:ml-2">
                        Home
                    </div>
                </div>
            </div>
            <div className="md:flex flex-col space-y-4 font-jetbrains m-2 mt-10 overflow-hidden lg:w-full">
                {buttons.map((button, index) => (
                    <SideBarButton
                        key={index}
                        icon={button.icon}
                        text={button.name}
                        collapsed={collapsed}
                        onClick={() => handleButtonClick(button.name.toLowerCase())}
                    />
                ))}
            </div>
        </div> :
        // For mobile scren
        <div className="flex flex-col items-center min-h-full py-5 px-2 bg-panelColor text-white w-full">
            <div className="flex flex-row items-center">
                <Image
                        src="/amfoss-logo-white.png"
                        alt="amfoss-logo-white"
                        className="h-auto w-[8vw] max-h-auto"
                        width={50}
                        height={50}
                        priority
                    />
                    <div className="flex text-center items-center mr-0" onClick={toggleCollapsed}>{collapsed ? <FaAngleRight className="text-2xl" /> : <FaAngleLeft className="text-2xl"/>}</div>
                </div>
            <div className="sflex flex-col space-y-4 font-jetbrains m-2 mt-10 overflow-hidden">
                {buttons.map((button, index) => (
                    <SideBarButton
                        key={index}
                        icon={button.icon}
                        text={button.name}
                        collapsed={collapsed}
                        onClick={() => handleButtonClick(button.name.toLowerCase())}
                    />
                ))}
            </div>
        </div>
    );
};

export default SidePanel;
