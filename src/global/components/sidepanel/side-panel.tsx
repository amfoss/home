import React from "react";
import SidePanelButton from "./side-panel-button";
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
const SidePanel: React.FC = () => {
  return (
    <div className="w-64 h-screen p-5 bg-panelColor text-white md:w-1/4 lg:w-1/5">
      <div className="flex flex-row p-5 h-1/6 md:w-full"> 
        <img
          src="src/assets/amfoss-logo-white.png"
          alt="logo"
          className=" max-w-md xl:w-[82px] h-[87px] lg:w-1/2 md:w-16"
        />
        <div className="flex flex-col xl:h-[85px] md:w-full text-[40px] w-full font-jetbrains items-center text-offWhite justify-center ">
          Home
        </div>
      </div>
      <div className="flex flex-col space-y-4 font-jetbrains"> {/* Add space between buttons */}
        <SidePanelButton icon={<CalendarMonthIcon/>} text="Attendance" />
      </div>
    </div>
  );
};

export default SidePanel;