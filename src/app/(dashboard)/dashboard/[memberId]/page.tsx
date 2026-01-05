"use client";
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import client from '@/lib/apollo-client';
import { gql } from '@apollo/client';
import toast from 'react-hot-toast';
import { ArrowLeft, ChevronLeft, ChevronRight, ChartLine, Github, UserRound, Trophy } from 'lucide-react';
import Image from 'next/image';

type MemberInfo = {
    memberId: number;
    rollNo: string;
    name: string;
    email: string;
    sex: string;
    createdAt: string;
    year: number;
    hostel: string;
    macAddress: string | null;
    discordId: string | null;
    groupId: number | null;
    githubUser: string | null;
    track: string | null;
}

const GET_MEMBER_QUERY = gql`
  query GetMember($memberId: Int!) {
    member(memberId: $memberId) {
      memberId
      rollNo
      name
      email
      sex
      createdAt
      hostel
      macAddress
      discordId
      groupId
      githubUser
      track
    }
  }
`;

const GET_MEMBER_ATTENDANCE_QUERY = gql`
  query GetMemberAttendance($memberId: Int!, $startDate: NaiveDate!, $endDate: NaiveDate!) {
    member(memberId: $memberId) {
      memberId
      attendance {
        presentCount(startDate: $startDate, endDate: $endDate)
        absentCount(startDate: $startDate, endDate: $endDate)
        records(startDate: $startDate, endDate: $endDate) {
          isPresent
        }
      }
    }
  }
`;

const GET_MEMBER_STATUS_QUERY = gql`
  query GetMemberStatus($memberId: Int!, $startDate: NaiveDate!, $endDate: NaiveDate!) {
    member(memberId: $memberId) {
      memberId
      status {
        records(startDate: $startDate, endDate: $endDate) {
          isSent
        }
      }
    }
  }
`;

const getMonthDateRange = (monthOffset: number) => {
    const now = new Date();
    const startDate = new Date(now.getFullYear(), now.getMonth() + monthOffset, 1);
    const endDate = new Date(startDate.getFullYear(), startDate.getMonth() + 1, 0);
    return { startDate, endDate };
};

const padRecordsForMonth = (records: boolean[], monthOffset: number): boolean[] => {
    const { startDate, endDate } = getMonthDateRange(monthOffset);
    const daysInMonth = endDate.getDate();
    const now = new Date();
    now.setHours(0, 0, 0, 0);

    const daysToShow = daysInMonth;

    const paddedRecords = [...records];
    while (paddedRecords.length < daysToShow) {
        paddedRecords.push(false);
    }
    
    return paddedRecords.slice(0, daysToShow);
};

const GET_ALL_MEMBERS_LEADERBOARD = gql`
  query GetAllMembersLeaderboard($startDate: String!, $endDate: String!) {
    allMembers {
      memberId
      name
      attendance {
        presentCount(startDate: $startDate, endDate: $endDate)
      }
      status {
        updateCount(startDate: $startDate, endDate: $endDate)
      }
    }
  }
`;

const MemberDetails = () => {
    const router = useRouter();
    const { memberId } = useParams(); 
    const [memberDetails, setMemberDetails] = useState<MemberInfo | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [monthlyAttendanceRecords, setMonthlyAttendanceRecords] = useState<boolean[][]>([]);
    const [monthlyStatusRecords, setMonthlyStatusRecords] = useState<boolean[][]>([]);
    const [selectedMonthOffset, setSelectedMonthOffset] = useState<number>(0);
    const [monthsToDisplay, setMonthsToDisplay] = useState<number>(3);
    const [leaderboardData, setLeaderboardData] = useState<{
        userRank: number;
        userScore: number;
        allMembers: Array<{
            rank: number;
            name: string;
            score: number;
            memberId: number;
            isCurrentUser?: boolean;
        }>;
    } | null>(null);
    const [imageLoading, setImageLoading] = useState<boolean>(true);

    useEffect(() => {
        const calculateMonths = () => {
            const containerWidth = window.innerWidth;
            const availableWidth = containerWidth - 300;
            const monthWidth = 140;
            const possibleMonths = Math.floor(availableWidth / monthWidth);
            const months = Math.max(12, Math.min(12, possibleMonths));
            setMonthsToDisplay(months);
        };

        calculateMonths();
        window.addEventListener('resize', calculateMonths);
        return () => window.removeEventListener('resize', calculateMonths);
    }, []);

    useEffect(() => {
        const fetchMemberDetails = async () => {
            if (memberId) {
                try {
                    setLoading(true);
                    
                    const now = new Date();
                    const memberIdInt = parseInt(memberId as string);

                    const memberResponse = await client.query({
                        query: GET_MEMBER_QUERY,
                        variables: { memberId: memberIdInt },
                        fetchPolicy: 'cache-first',
                    });

                    if (memberResponse.data?.member) {
                        setMemberDetails(memberResponse.data.member);

                        const monthlyQueries = [];
                        for (let i = -(monthsToDisplay - 1); i <= 0; i++) {
                            const { startDate, endDate } = getMonthDateRange(i);
                            const startDateStr = startDate.toLocaleDateString('en-CA', {
                                year: 'numeric',
                                month: '2-digit',
                                day: '2-digit'
                            });
                            const endDateStr = endDate.toLocaleDateString('en-CA', {
                                year: 'numeric',
                                month: '2-digit',
                                day: '2-digit'
                            });
                            
                            monthlyQueries.push(
                                Promise.all([
                                    client.query({
                                        query: GET_MEMBER_ATTENDANCE_QUERY,
                                        variables: {
                                            memberId: memberIdInt,
                                            startDate: startDateStr,
                                            endDate: endDateStr,
                                        },
                                        fetchPolicy: 'cache-first',
                                    }),
                                    client.query({
                                        query: GET_MEMBER_STATUS_QUERY,
                                        variables: {
                                            memberId: memberIdInt,
                                            startDate: startDateStr,
                                            endDate: endDateStr,
                                        },
                                        fetchPolicy: 'cache-first',
                                    }),
                                ])
                            );
                        }

                        const yearStartDate = new Date(now);
                        yearStartDate.setFullYear(yearStartDate.getFullYear() - 1);
                        const yearStartDateStr = yearStartDate.toISOString().split('T')[0];
                        const yearEndDateStr = now.toISOString().split('T')[0];
                        
                        const leaderboardQuery = client.query({
                            query: GET_ALL_MEMBERS_LEADERBOARD,
                            variables: {
                                startDate: yearStartDateStr,
                                endDate: yearEndDateStr,
                            },
                            fetchPolicy: 'cache-first',
                        });

                        const [monthlyResults, leaderboardResponse] = await Promise.all([
                            Promise.all(monthlyQueries),
                            leaderboardQuery,
                        ]);

                        const attendanceByMonth: boolean[][] = [];
                        const statusByMonth: boolean[][] = [];
                        
                        monthlyResults.forEach(([attendanceRes, statusRes], index) => {
                            const monthOffset = -(monthsToDisplay - 1) + index;

                            if (attendanceRes.data?.member?.attendance?.records) {
                                const records = attendanceRes.data.member.attendance.records.map((r: any) => r.isPresent);
                                attendanceByMonth.push(padRecordsForMonth(records, monthOffset));
                            } else {
                                attendanceByMonth.push([]);
                            }

                            if (statusRes.data?.member?.status?.records) {
                                const records = statusRes.data.member.status.records.map((r: any) => r.isSent);
                                statusByMonth.push(padRecordsForMonth(records, monthOffset));
                            } else {
                                statusByMonth.push([]);
                            }
                        });
                        
                        setMonthlyAttendanceRecords(attendanceByMonth);
                        setMonthlyStatusRecords(statusByMonth);

                        if (leaderboardResponse.data?.allMembers) {
                            const membersWithScores = leaderboardResponse.data.allMembers.map((member: any) => ({
                                memberId: member.memberId,
                                name: member.name,
                                score: member.attendance.presentCount * 10 + member.status.updateCount * 5,
                            }));

                            membersWithScores.sort((a: any, b: any) => b.score - a.score);

                            const rankedMembers = membersWithScores.map((member: any, index: number) => ({
                                ...member,
                                rank: index + 1,
                                isCurrentUser: member.memberId === memberIdInt,
                            }));

                            const currentUser = rankedMembers.find((m: any) => m.memberId === memberIdInt);

                            if (currentUser) {
                                setLeaderboardData({
                                    userRank: currentUser.rank,
                                    userScore: currentUser.score,
                                    allMembers: rankedMembers,
                                });
                            }
                        }
                    } else {
                        setError('Member not found');
                        toast.error('Member not found');
                    }
                } catch (err) {
                    console.error('Error fetching member details:', err);
                    setError('Failed to fetch member details');
                    toast.error('Failed to fetch member details');
                }
                setLoading(false);
            }
        };

        fetchMemberDetails();
    }, [memberId, monthsToDisplay]);

    useEffect(() => {
        if (leaderboardData) {
            const element = document.getElementById('current-user-rank');
            if (element) {
                setTimeout(() => {
                    element.scrollIntoView({ behavior: 'smooth', block: 'center' });
                }, 100);
            }
        }
    }, [leaderboardData]);

    if (error) return <div className="text-white p-8">Error: {error}</div>;

    return (
        <div className="min-h-screen bg-[#0a0a0a] flex flex-col text-white p-8 gap-8 justify-between">

            <div>
                <div className="mb-8 flex items-center gap-4 border-b border-gray-800 pb-4">
                    <button 
                        onClick={() => router.back()}
                        className="text-white hover:text-gray-300 transition-colors"
                    >
                        <ArrowLeft size={24} />
                    </button>
                    <h1 className="text-2xl font-light">
                        Members / {memberDetails?.rollNo}
                    </h1>
                </div>

                <div className="flex flex-col lg:flex-row gap-8">
                    <div className="flex flex-1 flex-col justify-between gap-6">
                        {memberDetails ?
                            <>
                                <div className="flex items-center flex-wrap gap-6">
                                    <div className="relative w-[120px] h-[120px]">
                                        {imageLoading && (
                                            <div className="absolute inset-0 bg-[#1a1a1a] rounded-lg flex items-center justify-center">
                                                <div className="w-8 h-8 border-4 border-gray-600 border-t-[#EBB500] rounded-full animate-spin"></div>
                                            </div>
                                        )}
                                        <Image 
                                            src={`https://github.com/${memberDetails.githubUser}.png`} 
                                            alt={memberDetails.name} 
                                            width={120} 
                                            height={120} 
                                            className="rounded-lg"
                                            onLoad={() => setImageLoading(false)}
                                        />
                                    </div>
                                    <div className="flex flex-1">
                                        <div className="flex-1">
                                            <h2 className="text-2xl font-bold mb-1">{memberDetails.name}</h2>
                                            <p className="text-gray-400 text-sm mb-3">
                                                {new Date(memberDetails.createdAt).toLocaleDateString('en-GB', {
                                                    day: '2-digit',
                                                    month: '2-digit',
                                                    year: 'numeric'
                                                }).replace(/\//g, '.')}
                                            </p>
                                            <a href={`https://github.com/${memberDetails.githubUser}`} target="_blank" rel="noopener noreferrer" className='flex items-center gap-2 bg-[#1A1A1A] hover:bg-[#2a2a2a] transition-colors p-2 rounded-lg w-fit'>
                                                <Github className="w-6 h-6" />
                                                <span>{memberDetails.githubUser}</span>
                                            </a>
                                        </div>
                                        <div className="text-2xl font-semibold tracking-widest text-[#EBB500]" 
                                            style={{ writingMode: 'vertical-rl', textOrientation: 'mixed' }}>
                                            {memberDetails.track}
                                        </div>
                                    </div>
                                </div>

                                <div className="bg-[#1a1a1a] rounded-lg p-6">
                                    <div className="flex items-center gap-2 mb-4">
                                        <UserRound/>
                                        <h3 className="text-lg font-semibold">Personal info</h3>
                                    </div>
                                    <div className="space-y-3 text-sm">
                                        <div className="flex justify-between flex-wrap gap-2">
                                            <span className="text-gray-400">Hostel</span>
                                            <span className="text-white">{memberDetails.hostel}</span>
                                        </div>
                                        <div className="flex justify-between flex-wrap gap-2">
                                            <span className="text-gray-400">Email</span>
                                            <span className="text-white">{memberDetails.email}</span>
                                        </div>
                                        <div className="flex justify-between flex-wrap gap-2">
                                            <span className="text-gray-400">Discord ID</span>
                                            <span className="text-white">{memberDetails.discordId}</span>
                                        </div>
                                    </div>
                                </div>
                            </>
                        :   <div className="bg-[#1a1a1a] rounded-lg p-6 flex items-center justify-center min-h-[400px]">
                                <div className="text-gray-500 text-center">LOADING...</div>
                            </div>
                        }
                    </div>

                    <div className='flex-1'>
                        <h3 className="text-xl font-semibold mb-4">Stats</h3>
                        <div className="bg-[#1a1a1a] rounded-lg p-4 flex flex-col">
                            <div className="flex items-center gap-2 mb-3">
                                <Trophy className="w-5 h-5 text-[#EBB500]" />
                                <h4 className="text-sm font-semibold">Leaderboard Rank</h4>
                            </div>
                            <div className="flex-1 overflow-hidden">
                                {leaderboardData ?
                                    <div className="space-y-1 overflow-y-auto max-h-[220px] pr-2 scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-gray-900">
                                        {leaderboardData.allMembers.map(member => (
                                            <div
                                                key={member.memberId}
                                                id={member.isCurrentUser ? 'current-user-rank' : undefined}
                                                className={`flex items-center justify-between px-2 py-1 rounded text-xs ${
                                                    member.isCurrentUser 
                                                        ? 'bg-[#EBB500] bg-opacity-60 border border-[#EBB500] sticky top-0 bottom-0 z-10' 
                                                        : 'bg-[#0a0a0a]'
                                                }`}
                                            >
                                                <div className="flex items-center gap-2">
                                                    <span className={`font-semibold ${member.isCurrentUser ? 'text-white' : 'text-gray-400'}`}>
                                                        #{member.rank}
                                                    </span>
                                                    <span className={`truncate max-w-[100px] ${member.isCurrentUser ? 'text-white font-semibold' : 'text-gray-300'}`}>
                                                        {member.isCurrentUser ? memberDetails?.name : member.name}
                                                    </span>
                                                </div>
                                                <span className={`font-mono ${member.isCurrentUser ? 'text-white' : 'text-gray-400'}`}>
                                                    {member.score}
                                                </span>
                                            </div>
                                        ))}
                                    </div> : <div className="text-gray-500 text-center m-auto text-sm">LOADING...</div>
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="bg-[#1a1a1a] flex flex-col lg:flex-row gap-4 rounded-lg p-6">
                <div className="flex items-center flex-row lg:flex-col justify-between">
                    <div className="flex items-center gap-2">
                        <ChartLine/>
                        <h3 className="text-xl font-semibold">
                            {(() => {
                                const date = new Date();
                                date.setMonth(date.getMonth() + selectedMonthOffset);
                                return date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
                            })()}
                        </h3>
                    </div>
                    <div className="flex items-center gap-2">
                        <button
                            onClick={() => setSelectedMonthOffset(prev => prev - 1)}
                            className="p-2 hover:bg-[#2a2a2a] rounded-lg transition-colors"
                            title="Previous month"
                        >
                            <ChevronLeft/>
                        </button>
                        <button
                            onClick={() => setSelectedMonthOffset(prev => prev + 1)}
                            disabled={selectedMonthOffset >= 0}
                            className="p-2 hover:bg-[#2a2a2a] rounded-lg transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                            title="Next month"
                        >
                            <ChevronRight/>
                        </button>
                    </div>
                </div>
                
                {(() => {
                    const monthIndex = selectedMonthOffset + (monthsToDisplay - 1);
                    const monthAttendanceRecords = monthlyAttendanceRecords[monthIndex] || [];
                    const monthStatusRecords = monthlyStatusRecords[monthIndex] || [];
                    
                    const presentDays = monthAttendanceRecords.filter(record => record).length;
                    const statusUpdates = monthStatusRecords.filter(record => record).length;
                    const attendanceRate = monthAttendanceRecords.length > 0 
                        ? Math.round((presentDays / monthAttendanceRecords.length) * 100)
                        : 0;
                    const statusPercent = monthStatusRecords.length > 0
                        ? Math.round((statusUpdates / monthStatusRecords.length) * 100)
                        : 0;

                    const presentThreshold = 15;
                    const statusThreshold = 10;

                    const isCurrentMonth = selectedMonthOffset === 0;
                    const now = new Date();
                    const { endDate } = getMonthDateRange(selectedMonthOffset);
                    const daysToConsider = isCurrentMonth ? now.getDate() : endDate.getDate();
                    
                    const rateThreshold = monthAttendanceRecords.length > 0 
                        ? Math.round((presentThreshold / daysToConsider) * 100)
                        : 70;
                    const statusPercentThreshold = monthStatusRecords.length > 0
                        ? Math.round((statusThreshold / daysToConsider) * 100)
                        : 60;
                    
                    return (
                        monthlyAttendanceRecords.length > 0 || monthlyStatusRecords.length > 0 ?
                            <div className="flex flex-1 flex-wrap justify-around gap-4 sm:gap-2">
                                <div className="text-center gap-1 flex flex-col items-center min-w-[120px]">
                                    <div className={`text-2xl sm:text-3xl font-bold ${presentDays >= presentThreshold ? 'text-yellow-500' : 'text-red-500'}`}>
                                        {presentDays}
                                    </div>
                                    <div className="text-xs sm:text-sm text-gray-400">Days Present</div>
                                </div>
                                
                                <div className="text-center gap-1 flex flex-col items-center min-w-[120px]">
                                    <div className={`text-2xl sm:text-3xl font-bold ${statusUpdates >= statusThreshold ? 'text-yellow-500' : 'text-red-500'}`}>
                                        {statusUpdates}
                                    </div>
                                    <div className="text-xs sm:text-sm text-gray-400">Status Updates</div>
                                </div>
                                
                                <div className="text-center gap-1 flex flex-col items-center min-w-[120px]">
                                    <div className={`text-2xl sm:text-3xl font-bold ${attendanceRate >= rateThreshold ? 'text-yellow-500' : 'text-red-500'}`}>
                                        {attendanceRate}%
                                    </div>
                                    <div className="text-xs sm:text-sm text-gray-400">Attendance Rate</div>
                                </div>
                                
                                <div className="text-center gap-1 flex flex-col items-center min-w-[120px]">
                                    <div className={`text-2xl sm:text-3xl font-bold ${statusPercent >= statusPercentThreshold ? 'text-yellow-500' : 'text-red-500'}`}>
                                        {statusPercent}%
                                    </div>
                                    <div className="text-xs sm:text-sm text-gray-400">Status Rate</div>
                                </div>
                            </div>
                        : <div className="text-center text-gray-500 py-4">LOADING...</div>
                    );
                })()}
            </div>

            <div className="w-full flex gap-8 lg:flex-row flex-col">
                <div className="w-full lg:w-auto lg:max-w-fit lg:m-auto overflow-x-auto">
                    <h3 className="text-xl font-semibold mb-4">Status</h3>
                    <div className="bg-[#1a1a1a] rounded-lg p-6 w-auto">
                        <div className="flex gap-1">
                            <div className="flex flex-col justify-around text-xs text-gray-500 pr-2">
                                <span>Mon</span>
                                <span>Wed</span>
                                <span>Fri</span>
                            </div>

                            <div className="overflow-x-auto">
                                <div className="inline-flex flex-col gap-2">
                                    <div className="flex gap-1">
                                        {monthlyStatusRecords.map((monthRecords, monthIndex) => {
                                            const daysInMonth = monthRecords.length;
                                            const weeksNeeded = Math.ceil(daysInMonth / 7);
                                            
                                            return (
                                                <div key={monthIndex} className="flex gap-1">
                                                    {Array.from({ length: weeksNeeded }).map((_, weekIndex) => (
                                                        <div key={weekIndex} className="flex flex-col gap-1">
                                                            {Array.from({ length: 7 }).map((_, dayIndex) => {
                                                                const recordIndex = weekIndex * 7 + dayIndex;
                                                                const hasRecord = recordIndex < daysInMonth;
                                                                const bgColor = hasRecord
                                                                    ? monthRecords[recordIndex]
                                                                        ? 'bg-green-500'
                                                                        : 'bg-gray-800'
                                                                    : 'bg-gray-700';

                                                                return (
                                                                    <div
                                                                        key={dayIndex}
                                                                        className={`w-4 h-4 rounded ${bgColor}`}
                                                                        title={hasRecord 
                                                                            ? `${monthRecords[recordIndex] ? 'Updated' : 'No update'}`
                                                                            : 'No data'}
                                                                    />
                                                                );
                                                            })}
                                                        </div>
                                                    ))}
                                                </div>
                                            );
                                        })}
                                    </div>
                                    
                                    <div className="flex justify-around text-xs text-gray-500">
                                        {(() => {
                                            const currentMonth = new Date().getMonth();
                                            const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
                                            
                                            const orderedMonths: string[] = [];
                                            for (let i = 0; i < monthsToDisplay; i++) {
                                                const monthIndex = (currentMonth - (monthsToDisplay - 1) + i + 12) % 12;
                                                orderedMonths.push(months[monthIndex]);
                                            }
                                            
                                            return orderedMonths.map((month, index) => (
                                                <span key={index} className="text-center">{month}</span>
                                            ));
                                        })()}
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        <div className="flex items-center justify-end gap-2 mt-4 text-xs text-gray-500">
                            <span>No update</span>
                            <div className="flex gap-1">    
                                <div className="w-3 h-3 bg-gray-800 rounded"></div>
                                <div className="w-3 h-3 bg-gray-700 rounded"></div>
                                <div className="w-3 h-3 bg-green-500 rounded"></div>
                            </div>
                            <span>Updated</span>
                        </div>
                    </div>
                </div>
                
                <div className="max-w-fit lg:m-auto overflow-x-auto">
                    <h3 className="text-xl font-semibold mb-4">Attendance</h3>
                    <div className="bg-[#1a1a1a] rounded-lg p-6 w-auto">
                        <div className="flex gap-1">
                            <div className="flex flex-col justify-around text-xs text-gray-500 pr-2">
                                <span>Mon</span>
                                <span>Wed</span>
                                <span>Fri</span>
                            </div>

                            <div className="overflow-x-auto">
                                <div className="inline-flex flex-col gap-1">
                                    <div className="flex gap-1">
                                        {monthlyAttendanceRecords.map((monthRecords, monthIndex) => {
                                            const daysInMonth = monthRecords.length;
                                            const weeksNeeded = Math.ceil(daysInMonth / 7);
                                            
                                            return (
                                                <div key={monthIndex} className="flex gap-1">
                                                    {Array.from({ length: weeksNeeded }).map((_, weekIndex) => (
                                                        <div key={weekIndex} className="flex flex-col gap-1">
                                                            {Array.from({ length: 7 }).map((_, dayIndex) => {
                                                                const recordIndex = weekIndex * 7 + dayIndex;
                                                                const hasRecord = recordIndex < daysInMonth;
                                                                const bgColor = hasRecord
                                                                    ? monthRecords[recordIndex]
                                                                        ? 'bg-yellow-500'
                                                                        : 'bg-gray-800'
                                                                    : 'bg-gray-700';

                                                                return (
                                                                    <div
                                                                        key={dayIndex}
                                                                        className={`w-4 h-4 rounded-full ${bgColor}`}
                                                                        title={hasRecord 
                                                                            ? `${monthRecords[recordIndex] ? 'Present' : 'Absent'}`
                                                                            : 'No data'}
                                                                    />
                                                                );
                                                            })}
                                                        </div>
                                                    ))}
                                                </div>
                                            );
                                        })}
                                    </div>
                                    
                                    <div className="flex justify-around text-xs text-gray-500">
                                        {(() => {
                                            const currentMonth = new Date().getMonth();
                                            const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
                                            
                                            const orderedMonths: string[] = [];
                                            for (let i = 0; i < monthsToDisplay; i++) {
                                                const monthIndex = (currentMonth - (monthsToDisplay - 1) + i + 12) % 12;
                                                orderedMonths.push(months[monthIndex]);
                                            }
                                            
                                            return orderedMonths.map((month, index) => (
                                                <span key={index} className="text-center">{month}</span>
                                            ));
                                        })()}
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        <div className="flex items-center justify-end gap-2 mt-4 text-xs text-gray-500">
                            <span>Absent</span>
                            <div className="flex gap-1">    
                                <div className="w-3 h-3 bg-gray-800 rounded-full"></div>
                                <div className="w-3 h-3 bg-gray-700 rounded-full"></div>
                                <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                            </div>
                            <span>Present</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MemberDetails;
