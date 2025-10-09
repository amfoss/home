"use client";
import { useState } from "react";

import {Profile,ProfileBottom} from "@/components/LeaderBoardProfiles"
import dynamic from 'next/dynamic';

const LeaderboardTable = dynamic(() => import("@/components/LeaderboardTable"), {
  ssr: false,
});

export default function LeaderBoard() {
  const [alltimemode, setmode] = useState(false);
  return (
    <div className="w-full overflow-hidden gap-7 flex flex-col items-center bg-bgMainColor">
      <h1 className="mt-5 text-center text-white text-[3rem] sm:text-[2.5rem] md:text-[4.2rem] lg:text-[5rem] font-medium">
        Leaderboard
      </h1>
      <div className="flex justify-evenly items-center rounded-xl bg-LeaderBoardCommon w-[50%]">
        <button
          className={`transition-colors duration-300 flex w-[50%] justify-center items-center rounded-md ${
            alltimemode ? "bg-LeaderBoardCommonHigh" : "bg-LeaderBoardCommon"}`}
          onClick={() => setmode(!alltimemode)}
        >
          <p className="text-lg font-semibold text-white mt-2 ml-2 mb-2">
            Month
          </p>
        </button>
        <button
          className={`transition-colors duration-300 flex w-[50%] justify-center items-center rounded-md ${
            alltimemode ? "bg-LeaderBoardCommon" : "bg-LeaderBoardCommonHigh"}`}
          onClick={() => setmode(!alltimemode)}
        >
          <p className="text-lg font-semibold  text-white mt-2 mr-2 mb-2">
            All Time
          </p>
        </button>
      </div>
      <div className="flex gap-[1%] sm:h-[200px] lg:h-[500px] lg:scale-100 sm:scale-[.38] md:scale-[.57] origin-top">
        <Profile mt={8} rank="Silver" />
        <Profile rank="Gold" />
        <Profile mt={10} rank="Bronze" />
      </div>
      <div className="flex justify-center items-center z-10 md:mt-16 rounded-xl bg-LeaderBoardCommonHigh]">
        <p className="text-lg sm:text-[1.5vh] md:text-[.8rem] lg:text-xl font-semibold  text-white z-10 m-2">
          You have been placed at X rank with XXXX points.
        </p>
      </div>
  
      <LeaderboardTable isAllTime={alltimemode} />
    </div>
  );
}
