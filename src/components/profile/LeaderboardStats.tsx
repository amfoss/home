"use client";
import { Trophy } from 'lucide-react';

export type LeaderboardMember = {
    rank: number;
    name: string;
    score: number;
    memberId: number;
    isCurrentUser?: boolean;
};

export type LeaderboardStatsProps = {
    leaderboardData: {
        userRank: number;
        userScore: number;
        allMembers: LeaderboardMember[];
    } | null;
    currentUserName?: string;
    loading?: boolean;
};

export const LeaderboardStats = ({ leaderboardData, currentUserName, loading = false }: LeaderboardStatsProps) => {
    if (loading) {
        return (
            <div className='flex-1'>
                <h3 className="text-xl font-semibold mb-4">Stats</h3>
                <div className="bg-[#1a1a1a] rounded-lg p-4 flex flex-col">
                    <div className="flex items-center gap-2 mb-3">
                        <Trophy className="w-5 h-5 text-[#EBB500]" />
                        <h4 className="text-sm font-semibold">Leaderboard Rank</h4>
                    </div>
                    <div className="flex-1 flex items-center justify-center">
                        <div className="flex flex-col items-center gap-4">
                            <div className="w-12 h-12 border-4 border-gray-600 border-t-[#EBB500] rounded-full animate-spin"></div>
                            <div className="text-gray-500 text-sm">Loading stats...</div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className='flex-1'>
            <h3 className="text-xl font-semibold mb-4">Stats</h3>
            <div className="bg-[#1a1a1a] rounded-lg p-4 flex flex-col">
                <div className="flex items-center gap-2 mb-3">
                    <Trophy className="w-5 h-5 text-[#EBB500]" />
                    <h4 className="text-sm font-semibold">Leaderboard Rank</h4>
                </div>
                <div className="flex-1 overflow-hidden">
                    {leaderboardData ? (
                        <div className="space-y-1 overflow-y-auto max-h-[220px] pr-2 scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-gray-900">
                            {leaderboardData.allMembers.map(member => (
                                <div
                                    key={member.memberId}
                                    id={member.isCurrentUser ? 'current-user-rank' : undefined}
                                    className={`flex items-center justify-between px-2 py-1 rounded text-xs ${member.isCurrentUser
                                            ? 'bg-[#EBB500] bg-opacity-60 border border-[#EBB500] sticky top-0 bottom-0 z-10'
                                            : 'bg-[#0a0a0a]'
                                        }`}
                                >
                                    <div className="flex items-center gap-2">
                                        <span className={`font-semibold ${member.isCurrentUser ? 'text-white' : 'text-gray-400'}`}>
                                            #{member.rank}
                                        </span>
                                        <span className={`truncate max-w-[100px] ${member.isCurrentUser ? 'text-white font-semibold' : 'text-gray-300'}`}>
                                            {member.isCurrentUser && currentUserName ? currentUserName : member.name}
                                        </span>
                                    </div>
                                    <span className={`font-mono ${member.isCurrentUser ? 'text-white' : 'text-gray-400'}`}>
                                        {member.score}
                                    </span>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="text-gray-500 text-center m-auto text-sm">No data available</div>
                    )}
                </div>
            </div>
        </div>
    );
};
