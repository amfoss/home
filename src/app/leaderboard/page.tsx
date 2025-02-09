"use client";
import Image from "next/image";
import { Trophy, Award, Medal, Ribbon } from "lucide-react";
import { useState } from "react";

export default function Home() {
  const [alltimemode, setmode] = useState(false);

  return (
    <li className="w-full overflow-hidden gap-7 flex flex-col items-center bg-gradient-to-b from-[#161616] via-[#161616] to-[rgb(56,8,8)]">
      <p className="mt-5 text-center text-white text-[3rem] sm:text-[2.5rem] md:text-[4.2rem] lg:text-[5rem] font-medium">
        Leaderboard
      </p>

      {/* Alltime/Monthly Switch */}
      <div className="flex justify-evenly items-center rounded-xl bg-[#1C1C1C] w-[50%]">
        <button
          style={{ backgroundColor: alltimemode ? "#292929" : "#1C1C1C" }}
          className=" transition-colors duration-300 flex w-[50%] justify-center items-center rounded-md"
          onClick={() => setmode(!alltimemode)}
        >
          <p className="text-lg font-semibold text-white mt-2 ml-2 mb-2">
            Month
          </p>
        </button>
        <button
          style={{ backgroundColor: !alltimemode ? "#292929" : "#1C1C1C" }}
          className=" transition-colors duration-300 flex w-[50%] justify-center place-items-center rounded-md"
          onClick={() => setmode(!alltimemode)}
        >
          <p className="text-lg font-semibold  text-white mt-2 mr-2 mb-2">
            All Time
          </p>
        </button>
      </div>

      {/* Top 3 Board */}
      <div className="flex gap-[1%] sm:h-[200px] lg:h-[500px] lg:scale-100 sm:scale-[.38] md:scale-[.57] origin-top">
        <Profile mt={5} rank="Silver" />
        <Profile rank="Gold" />
        <Profile mt={8} rank="Bronze" />
      </div>


      <div className="flex justify-center items-center z-10 md:mt-16 rounded-xl bg-[#292929]">
        <p className="text-lg sm:text-[1.5vh] md:text-[.8rem] lg:text-xl font-semibold  text-white z-10 m-2">
          You have been placed at X rank with XXXX points.
        </p>
      </div>


      {/*Table*/}
      <div className="w-full">
        <Table />
      </div>

      {/*Wall of Shame*/}
      <p className="mt-5 text-center text-white text-[3rem] sm:text-[2.5rem] md:text-[4.2rem] lg:text-[5rem] font-medium">
        Wall of Shame
      </p>
      <div className="w-full">
        <div className="flex flex-col md:scale-[.6] lg:scale-[1] md:flex-row justify-evenly items-center gap-4 sm:gap-6 md:gap-8 w-full">
        <ProfileBottom />
        <ProfileBottom />
        <ProfileBottom />
      </div>
      </div>
    </li>
  );
}


function ProfileBottom() {
  const imgpath = "/placeholder.webp";
  const name = "Placeholder";
  return (
    <div className="flex flex-col items-center w-full sm:w-auto scale-100 sm:scale-75">
      <div className="flex flex-col items-center justify-center relative">
        <Image
          src={imgpath}
          alt="profile"
          width={200}
          height={200}
          className="rounded-full z-10 mb-4"
        />
        <p className="text-5xl z-10 text-white text-center">{name}</p>
      </div>
      <p className="text-base sm:text-2xl md:text-xl mt-3 text-center text-white gap-2">
        Points
      </p>
    </div>
  );
}

function Profile({ mt = 0, rank = "" }) {
  const imgpath = "/placeholder.webp";
  const name = "Placeholder";
  let sticker = <Medal className="w-5 h-5" />;
  if (rank == "Gold") {
    sticker = <Trophy className="w-5 h-5" />;
  }
  return (
    <div style={{ marginTop: `${mt}rem` }} className="scale-100 sm:scale-75">
      <div className="flex flex-col items-center justify-center relative">
        <div className="absolute w-[200px] h-[200px] rounded-md border-[20px] border-yellow-400 mb-4 blur-2xl"></div>
        <Image
          src={imgpath}
          alt="profile"
          width={200}
          height={200}
          className="rounded-md z-10 mb-4"
        />
        <p className="text-5xl z-10 text-white text-center">{name}</p>
      </div>
      <div
        className="w-[250px] sm:w-[300px] h-[250px] sm:h-[300px] bg-cover bg-center flex flex-col items-center text-white"
        style={{ backgroundImage: "url('/leaderboard.svg')" }}
      >
        <p className="text-4xl font-semibold mt-8 text-white">{rank}</p>
        <hr className="border-[1.5px] border-yellow-400 w-[80%]" />
        <p className="text-base sm:text-2xl md:text-xl w-1/3 mt-3 text-center text-white flex items-center justify-center gap-2">
          {sticker}Points
        </p>
      </div>
    </div>
  );
}

function Table() {
  let players = [];
  for (let i = 1; i <= 100; i++) {
    let col = "";
    let k = <div className="w-5 h-5" />;
    if (i == 1) {
      col = "#EFBF04";
      k = <Trophy className="w-5 h-5" />;
    } else if (i == 2) {
      col = "#a1a1a1";
      k = <Medal className="w-5 h-5" />;
    } else if (i == 3) {
      col = "#804A00";
      k = <Medal className="w-5 h-5" />;
    } else {
      col = "#232323";
    }
    players.push(
      <div
        key={i}
        style={{ backgroundColor: col }}
        className="hover:bg-[#303030] rounded-md transition-transform duration-300 ease-in-out transform hover:scale-105"
      >
        <div className="h-10 flex items-center justify-evenly rounded-md px-4">
          <p className="w-1/3 text-center text-white flex items-center justify-center gap-2 mr-3">
            <Award className="w-5 h-5" /> {i}
          </p>
          <p className="w-1/3 text-center text-white">Player</p>
          <div className="w-1/3 text-center text-white flex items-center justify-center gap-2 ml-4">
            {k}
            <p>{i * 1000}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full flex flex-col items-center  rounded-lg">
      <div className="w-[90%] sm:max-h-[400px] lg:max-h-[800px] overflow-y-auto  rounded-lg">
        <table className="sticky top-0 z-40 w-full text-white border-collapse">
          <thead className="bg-[#161616]">
            <tr className="text-left ">
              <th className="px-4 py-2 text-center w-1/3">Rank</th>
              <th className="px-4 py-2 text-center w-1/3">Name</th>
              <th className="px-4 py-2 text-center w-1/3">Points</th>
            </tr>
          </thead>
        </table>
        <div className="w-full flex flex-col gap-1 p-2">{players}</div>
      </div>
    </div>
  );
}
