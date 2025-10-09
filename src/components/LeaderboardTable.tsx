import { Trophy, Medal, Award, Icon } from "lucide-react";


type LeaderboardTableProps = {
    isAllTime?: boolean;
}

export default function LeaderboardTable({ isAllTime = false }: LeaderboardTableProps) {
    const placeholderlist = ["Player 1","Player 2","Player 3","Player 4","Player 5"]
    const players = placeholderlist.map((item,index)=>{
        let col="";
        let icon = <div className="w-5 h-5" />;
        if (index == 0) {
            col = "bg-LeaderBoardGold";
            icon = <Trophy className="w-5 h-5" />;
        } else if (index == 1) {
            col = "bg-LeaderBoardSilver";
            icon = <Medal className="w-5 h-5" />;
        } else if (index == 2) {
            col = "bg-LeaderBoardBronze";
            icon = <Medal className="w-5 h-5" />;
        } else {
            col = "bg-LeaderBoardCommon hover:bg-LeaderBoardCommonHigh";
        }
        return(
            <div
            key={index}
            className={`${col}  rounded-md transition-transform duration-300 ease-in-out transform hover:scale-105`}
        >
            <div className="h-10 flex items-center justify-evenly rounded-md px-4">
            <p className="w-1/3 text-center text-white flex items-center justify-center gap-2 mr-3">
                <Award className="w-5 h-5" /> {index}
            </p>
            <p className="w-1/3 text-center text-white">{item}</p>
            <div className="w-1/3 text-center text-white flex items-center justify-center gap-2 ml-4">
                {icon}
                <p>{index * 1000}</p>
            </div>
            </div>
        </div>
        );
    })
return (
    <div className="w-full flex flex-col items-center  rounded-lg">
    <div className="w-[90%] sm:max-h-[400px] lg:max-h-[800px] overflow-y-auto  rounded-lg">
        <table className="sticky top-0 z-40 w-full text-white border-collapse">
        <thead className="bg-LeaderBoardHead">
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
