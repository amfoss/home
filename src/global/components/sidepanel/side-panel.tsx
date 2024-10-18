import React from "react";
import SidePanelButton from "./side-panel-button";
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';


const SidePanel: React.FC = () => (
  <div className=" h-screen p-5 bg-panelColor text-white sm: w-14 md:w-1/4 lg:w-1/5">
    <div className="flex flex-row h-1/6 md:w-full sm: p-0">
      <img
        src="/amfoss-logo-white.png"
        alt="amfoss-logo-white"
        className="max-w-md xl:w-[82px] h-[87px] lg:w-1/2 md:w-16" />
      <div className="hidden sm:flex flex-col xl:h-[85px] md:w-full text-[40px] w-full font-jetbrains items-center text-offWhite justify-center">
        Home
      </div>
    </div>
    <div className="hidden sm:flex flex-col space-y-4 font-jetbrains">
      <SidePanelButton icon={<CalendarMonthIcon />} text="Attendance" />
    </div>

  </div>
);

export default SidePanel;