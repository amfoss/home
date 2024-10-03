import React from "react";
import SidePanel from "../../global/components/sidepanel/side-panel";

export const Attendancepage: React.FC = () => (
  <div className="flex h-screen flex-row">
    <SidePanel />
    <div className="flex flex-col w-full h-full p-5">
      <div className="flex flex-[1] w-full">
        {/* Something goes here not sure what lol */}
      </div>
      <div className="flex flex-[2] w-full gap-5">
        {/* Wrapper div for making the table scrollable */}
        <div className=" bg-panelButtonColor w-4/6 rounded-md">
          <div className="h-full min-w-full text-center">
            <div className="h-[17%] font-jetbrains grid grid-flow-col content-center text-primaryYellow text-xl sticky bg-panelColor">
              <div>Member</div>
              <div>Year</div>
              <div>Time In</div>
              <div>Time Out</div>
              <div>Date</div>
            </div>
            <div className=" text-offWhite overflow-y-auto h-[83%] font-jetbrains text-base font-extrabold">
              <div className="h-20 font-jetbrains grid grid-flow-col content-center text-offWhite text-xl bg">
                <div className="px-4">Jane Smith</div>
                <div className="px-4">2023</div>
                <div className="px-4">08:45 AM</div>
                <div className="px-4">04:30 PM</div>
                <div className="px-4">01-02-2024</div>
              </div>
              <div className="h-20 font-jetbrains grid grid-flow-col content-center text-offWhite text-xl bg">
                <div className="px-4">Jane Smith</div>
                <div className="px-4">2023</div>
                <div className="px-4">08:45 AM</div>
                <div className="px-4">04:30 PM</div>
                <div className="px-4">01-02-2024</div>
              </div>
              <div className="h-20 font-jetbrains grid grid-flow-col content-center text-offWhite text-xl bg">
                <div className="px-4">Jane Smith</div>
                <div className="px-4">2023</div>
                <div className="px-4">08:45 AM</div>
                <div className="px-4">04:30 PM</div>
                <div className="px-4">01-02-2024</div>
              </div>
              <div className="h-20 font-jetbrains grid grid-flow-col content-center text-offWhite text-xl bg">
                <div className="px-4">Jane Smith</div>
                <div className="px-4">2023</div>
                <div className="px-4">08:45 AM</div>
                <div className="px-4">04:30 PM</div>
                <div className="px-4">01-02-2024</div>
              </div>
              <div className="h-20 font-jetbrains grid grid-flow-col content-center text-offWhite text-xl bg">
                <div className="px-4">Jane Smith</div>
                <div className="px-4">2023</div>
                <div className="px-4">08:45 AM</div>
                <div className="px-4">04:30 PM</div>
                <div className="px-4">01-02-2024</div>
              </div>
              <div className="h-20 font-jetbrains grid grid-flow-col content-center text-offWhite text-xl bg">
                <div className="px-4">Jane Smith</div>
                <div className="px-4">2023</div>
                <div className="px-4">08:45 AM</div>
                <div className="px-4">04:30 PM</div>
                <div className="px-4">01-02-2024</div>
              </div>
              <div className="h-20 font-jetbrains grid grid-flow-col content-center text-offWhite text-xl bg">
                <div className="px-4">Jane Smith</div>
                <div className="px-4">2023</div>
                <div className="px-4">08:45 AM</div>
                <div className="px-4">04:30 PM</div>
                <div className="px-4">01-02-2024</div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col bg-panelButtonColor w-2/6 rounded-md"></div>
      </div>
    </div>
  </div>
);
