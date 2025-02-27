import Image from "next/image";
import { Medal, Trophy } from "lucide-react";

function ProfileBottom({ imgpath = "/placeholder.webp", name = "Placeholder" }) {
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
    <div className={`mt-${mt} scale-100 sm:scale-75`}>
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

export { ProfileBottom, Profile };
