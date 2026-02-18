"use client";
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import client from '@/lib/apollo-client';
import { gql } from '@apollo/client';
import toast from 'react-hot-toast';
import { Edit } from 'lucide-react';
import { ProfileCard } from '@/components/profile/ProfileCard';
import { LeaderboardStats } from '@/components/profile/LeaderboardStats';
import { MonthlyStats } from '@/components/profile/MonthlyStats';
import { HeatmapGrid } from '@/components/profile/HeatmapGrid';

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

const GET_CURRENT_MEMBER_QUERY = gql`
  query GetCurrentMember {
    me {
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

const getMonthDateRange = (monthOffset: number) => {
    const now = new Date();
    const startDate = new Date(now.getFullYear(), now.getMonth() + monthOffset, 1);
    const endDate = new Date(startDate.getFullYear(), startDate.getMonth() + 1, 0);
    return { startDate, endDate };
};

const padRecordsForMonth = (records: boolean[], monthOffset: number): boolean[] => {
    const { endDate } = getMonthDateRange(monthOffset);
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

type ProfileViewProps = {
    mode?: string;
}

const ProfileView = ({ mode }: ProfileViewProps) => {
    const router = useRouter();
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

    // Redirect to edit mode if mode is edit
    useEffect(() => {
        if (mode === 'edit') {
            router.push('/profile/edit');
        }
    }, [mode, router]);

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
            try {
                setLoading(true);

                const now = new Date();

                const memberResponse = await client.query({
                    query: GET_CURRENT_MEMBER_QUERY,
                    fetchPolicy: 'network-only',
                });

                if (memberResponse.data?.me) {
                    const member = memberResponse.data.me;

                    setMemberDetails(member);

                    const memberIdInt = member.memberId;

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
                            const records = attendanceRes.data.member.attendance.records.map((r: { isPresent: boolean }) => r.isPresent);
                            attendanceByMonth.push(padRecordsForMonth(records, monthOffset));
                        } else {
                            attendanceByMonth.push([]);
                        }

                        if (statusRes.data?.member?.status?.records) {
                            const records = statusRes.data.member.status.records.map((r: { isSent: boolean }) => r.isSent);
                            statusByMonth.push(padRecordsForMonth(records, monthOffset));
                        } else {
                            statusByMonth.push([]);
                        }
                    });

                    setMonthlyAttendanceRecords(attendanceByMonth);
                    setMonthlyStatusRecords(statusByMonth);

                    if (leaderboardResponse.data?.allMembers) {
                        const membersWithScores = leaderboardResponse.data.allMembers.map((member: {
                            memberId: number;
                            name: string;
                            attendance: { presentCount: number };
                            status: { updateCount: number };
                        }) => ({
                            memberId: member.memberId,
                            name: member.name,
                            score: member.attendance.presentCount * 10 + member.status.updateCount * 5,
                        }));

                        membersWithScores.sort((a: { score: number }, b: { score: number }) => b.score - a.score);

                        const rankedMembers = membersWithScores.map((member: { memberId: number; name: string; score: number }, index: number) => ({
                            ...member,
                            rank: index + 1,
                            isCurrentUser: member.memberId === memberIdInt,
                        }));

                        const currentUser = rankedMembers.find((m: { memberId: number }) => m.memberId === memberIdInt);

                        if (currentUser) {
                            setLeaderboardData({
                                userRank: currentUser.rank,
                                userScore: currentUser.score,
                                allMembers: rankedMembers,
                            });
                        }
                    }
                } else {
                    setError('Profile not found');
                    toast.error('Profile not found');
                }
            } catch (err) {
                setError('Failed to fetch profile details');
                toast.error('Failed to fetch profile details');
            }
            setLoading(false);
        };

        fetchMemberDetails();
    }, [monthsToDisplay]);

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

    // Calculate monthly stats for MonthlyStats component
    const getMonthlyStats = () => {
        const monthIndex = selectedMonthOffset + (monthsToDisplay - 1);
        const monthAttendanceRecords = monthlyAttendanceRecords[monthIndex] || [];
        const monthStatusRecords = monthlyStatusRecords[monthIndex] || [];

        const presentDays = monthAttendanceRecords.filter(record => record).length;
        const statusUpdates = monthStatusRecords.filter(record => record).length;

        const isCurrentMonth = selectedMonthOffset === 0;
        const now = new Date();
        const { endDate } = getMonthDateRange(selectedMonthOffset);
        const daysToConsider = isCurrentMonth ? now.getDate() : endDate.getDate();

        const absentDays = daysToConsider - presentDays;

        const attendanceRate = daysToConsider > 0
            ? Math.round((presentDays / daysToConsider) * 100)
            : 0;
        const statusPercent = daysToConsider > 0
            ? Math.round((statusUpdates / daysToConsider) * 100)
            : 0;

        return {
            presentDays,
            absentDays,
            statusUpdates,
            attendanceRate,
            statusPercent,
            daysToConsider
        };
    };

    return (
        <div className="min-h-screen bg-[#0a0a0a] flex flex-col text-white p-8 gap-8 justify-between">

            <div>
                <div className="mb-8 flex items-center justify-between border-b border-gray-800 pb-4">
                    <h1 className="text-2xl font-light">
                        My Profile
                    </h1>
                    <button
                        onClick={() => router.push('/profile/edit')}
                        className="flex items-center gap-2 bg-primaryYellow hover:bg-yellow-600 text-black font-bold py-2 px-4 rounded transition-colors"
                    >
                        <Edit size={16} />
                        Edit Profile
                    </button>
                </div>

                <div className="flex flex-col lg:flex-row gap-8">
                    {memberDetails ? (
                        <ProfileCard
                            name={memberDetails.name}
                            githubUser={memberDetails.githubUser}
                            createdAt={memberDetails.createdAt}
                            track={memberDetails.track}
                            hostel={memberDetails.hostel}
                            email={memberDetails.email}
                            discordId={memberDetails.discordId}
                            loading={loading}
                        />
                    ) : (
                        <ProfileCard
                            name=""
                            githubUser={null}
                            createdAt=""
                            track={null}
                            hostel=""
                            email=""
                            discordId={null}
                            loading={true}
                        />
                    )}

                    <LeaderboardStats
                        leaderboardData={leaderboardData}
                        currentUserName={memberDetails?.name}
                        loading={loading}
                    />
                </div>
            </div>

            <MonthlyStats
                selectedMonthOffset={selectedMonthOffset}
                onMonthChange={setSelectedMonthOffset}
                stats={monthlyAttendanceRecords.length > 0 || monthlyStatusRecords.length > 0 ? getMonthlyStats() : null}
                loading={loading}
            />

            <div className="w-full flex gap-8 lg:flex-row flex-col">
                <HeatmapGrid
                    title="Status"
                    monthlyRecords={monthlyStatusRecords}
                    monthsToDisplay={monthsToDisplay}
                    colorClass="bg-green-500"
                    shape="rounded"
                    loading={loading}
                />

                <HeatmapGrid
                    title="Attendance"
                    monthlyRecords={monthlyAttendanceRecords}
                    monthsToDisplay={monthsToDisplay}
                    colorClass="bg-yellow-500"
                    shape="rounded-full"
                    loading={loading}
                />
            </div>
        </div>
    );
};

export default ProfileView;
