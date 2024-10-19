import React from "react";
import SidePanelButton from "./side-panel-button";
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';

const SidePanel: React.FC = () => (
    <div className="flex flex-col items-center min-h-full p-5 bg-panelColor text-white w-full">
        {/* Container for logo and text */}
        <div className="flex flex-col md:flex-row items-center">
            {/* Logo Image */}
            <img
                src="/amfoss-logo-white.png"
                alt="amfoss-logo-white"
                className="h-auto min-w-[10vw] sm:w-[10vw] md:w-[40px] lg:w-[50px] md:min-w-[40px] lg:min-w-[50px] max-h-auto"
            />
            {/* Home Text (visible only on md and larger screens) */}
            <div className="hidden md:flex flex-col text-center text-[20px] md:text-[24px] font-jetbrains items-center text-offWhite justify-center md:ml-2">
                Home
            </div>
        </div>

        {/* SidePanel Buttons */}
        <div className=" sm:flex flex-col space-y-4 font-jetbrains m-2 mt-10">
            <SidePanelButton icon={<CalendarMonthIcon />} text="Attendance" />
        </div>
    </div>
);

export default SidePanel;
