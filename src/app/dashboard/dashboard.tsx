"use client";

import React, { useState, useEffect } from "react";
import Calendar from "@/components/Calendar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/Card";
import { ChartLine, Search } from "lucide-react";
import { Bar } from "react-chartjs-2";
import { useRouter } from 'next/navigation';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from "chart.js";
import { DashboardService } from "@/services/streak-service";
import { MemberDetails as MemberDetailsType } from "@/types/types";
import { useMember } from '@/context/MemberContext';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const Dashboard = () => {
    const router = useRouter();
    const { setSelectedMember } = useMember();

    const [selectedDate, setSelectedDate] = useState(new Date());
    const [attendanceData, setAttendanceData] = useState<number[]>([]);
    const [labels, setLabels] = useState<string[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [selected, setSelected] = useState<string>("attendance");
    const [memberSummary, setMemberSummary] = useState<{
        enrichedData: any[];
        topAttendance: { memberName: string; attendanceRatio: string };
        topStatusUpdate: { memberName: string; statusRatio: string };
    } | null>(null);

    const fetchAttendanceCount = async () => {
        setLoading(true);
        setError(null);

        try {
            const startDate = new Date(selectedDate);
            startDate.setDate(selectedDate.getDate() - 6);

            const formattedStartDate = startDate.toISOString().split("T")[0];
            const formattedEndDate = selectedDate.toISOString().split("T")[0];
            const dailyAttendance = await DashboardService.getAttendanceCounts(
                formattedStartDate,
                formattedEndDate
            );

            const dateLabels: string[] = [];
            const attendanceCounts: number[] = [];

            // Create an array of all 7 dates
            const allDates = Array.from({ length: 7 }).map((_, index) => {
                const date = new Date(selectedDate);
                date.setDate(selectedDate.getDate() - (6 - index));
                return date.toISOString().split("T")[0];
            });

            allDates.forEach((date) => {
                const entry = dailyAttendance.find((att) => att.date === date);
                dateLabels.push(new Date(date).toLocaleDateString("en-GB", {
                    day: "2-digit",
                    month: "short",
                    timeZone: "Asia/Kolkata",
                }));
                attendanceCounts.push(entry ? entry.count : 0);
            });

            setLabels(dateLabels);
            setAttendanceData(attendanceCounts);
        } catch (err) {
            setError("Failed to fetch attendance data.");
            setAttendanceData(new Array(7).fill(0));
        } finally {
            setLoading(false);
        }
    };
    const fetchMemberSummary = async () => {
        setLoading(true);
        setError(null);

        try {
            const startDate = new Date(selectedDate);
            startDate.setDate(selectedDate.getDate() - 30);
            const formattedStartDate = startDate.toISOString().split("T")[0];
            const formattedEndDate = selectedDate.toISOString().split("T")[0];

            const response = await DashboardService.getMemberSummary(formattedStartDate, formattedEndDate);
            setMemberSummary(response);
        } catch (err) {
            setError("Failed to fetch member summary data.");
            setMemberSummary(null);
        } finally {
            setLoading(false);
        }
    };


    const chartOptions = {
        responsive: true,
        plugins: {
            legend: {
                display: false,
            },
            tooltip: {
                enabled: true,
            },
        },
        scales: {
            x: {
                grid: {
                    display: false,
                },
                ticks: {
                    color: "#fff",
                },
            },
            y: {
                grid: {
                    display: false,
                },
                ticks: {
                    color: "#fff",
                    stepSize: 1,
                    max: 50,
                },
                beginAtZero: true,
            },
        },
    };

    const chartData = {
        labels,
        datasets: [
            {
                data: loading ? new Array(7).fill(0) : attendanceData,
                backgroundColor: "rgba(229, 172, 0, 0.6)",
                borderColor: "#FEC108",
                borderWidth: 1,
            },
        ],
    };

    useEffect(() => {
        fetchAttendanceCount();
        fetchMemberSummary();
    }, [selectedDate]);

    const formatDate = (date: Date): string => {
        const options: Intl.DateTimeFormatOptions = { month: "short", day: "numeric", year: "numeric" };
        return date.toLocaleDateString("en-US", options);
    };

    const navigateToMemberDetails = (member: MemberDetailsType) => {
        setSelectedMember(member);
        router.push(`/dashboard/${member.id}`);
    };

    const getDateRange = (date: Date, range: number) => {
        const startDate = new Date(date);
        startDate.setDate(date.getDate() - range);
        return `${formatDate(startDate)} - ${formatDate(date)}`;
    };

    const handleDateClick = (date: Date) => {
        setSelectedDate(date);
    };

    return (
        <div className="p-2 text-white max-h-screen overflow-scroll">
            <div className="mx-5"><Calendar onDateClick={handleDateClick} />
                <div className="mt-5 flex flex-col lg:flex-row  justify-between w-full min-h-64 max-w-full">
                    <Card className="bg-panelButtonColor max-w-full m-2 lg:w-1/2">
                        <CardHeader
                            options={
                                <button className="p-2">
                                    <ChartLine className="text-xl cursor-pointer" />
                                </button>
                            }
                        >
                            <CardTitle>
                                Attendance Summary
                                <CardDescription>
                                    From {getDateRange(selectedDate, 7)}
                                </CardDescription>
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            {loading ? (
                                <Bar options={chartOptions} data={{
                                    ...chartData,
                                    datasets: [{
                                        data: new Array(7).fill(0),
                                        backgroundColor: "rgba(229, 172, 0, 0.6)",
                                        borderColor: "#FEC108",
                                        borderWidth: 1,
                                    }]
                                }} />
                            ) : error ? (
                                <p>{error}</p>
                            ) : (
                                <Bar options={chartOptions} data={chartData} />
                            )}
                        </CardContent>
                    </Card>
                    <Card className="bg-panelButtonColor max-w-full m-2 lg:w-1/2">
                        <CardHeader>
                            <div className="flex justify-between min-w-full">
                                <CardTitle>
                                    Low on count
                                    <CardDescription className="mt-2">
                                        From {getDateRange(selectedDate, 30)}
                                    </CardDescription>
                                </CardTitle>
                                <div className="relative flex items-center justify-between w-44 h-8 bg-bgMainColor rounded-2xl px-2 min-w-fit">
                                    {/* Highlighter */}
                                    <div
                                        className={`absolute top-0 left-0 h-8  bg-yellow-400 rounded-2xl opacity-30 transition-transform duration-500`}
                                        style={{
                                            width: selected === "attendance" ? "5rem" : "6rem",
                                            transform: selected === "attendance" ? "translateX(0)" : "translateX(5rem)",
                                        }}
                                    />

                                    {/* Attendance Option */}
                                    <div
                                        className={`text-white flex-1 text-xs font-medium cursor-pointer relative z-10`}
                                        onClick={() => setSelected("attendance")}
                                    >
                                        Attendance
                                    </div>

                                    {/* Status Updates Option */}
                                    <div
                                        className={`text-white ml-3 text-xs font-medium cursor-pointer relative z-10`}
                                        onClick={() => setSelected("status")}
                                    >
                                        Status Updates
                                    </div>
                                </div>

                            </div>
                        </CardHeader>
                        <CardContent>
                            <div className="w-full h-48 overflow-y-scroll">
                                <div className="grid grid-cols-[1fr,minmax(70px,auto),minmax(70px,auto)] items-center w-full">
                                    <div className="px-5">Name</div>
                                    <div className="pl-5">Attended</div>
                                    <div className="pl-5">Missed</div>
                                </div>

                                <hr className="border-t border-white mt-2" />

                                {/*need to add query for getting people with least numbers*/}
                                <p className="text-center p-2 text-red-500"> No data available</p>
                                {/* data.map((item, index) => (
                                <div key={index} className="grid grid-cols-[1fr,minmax(70px,auto),minmax(50px,auto)] items-center w-full py-2 border-b border-gray-500">
                                    <div className="px-5">{item.name}</div>
                                    <div className="pl-5">{item.attended}</div>
                                    <div className="pl-5">{item.missed}</div>
                                </div>
                                ))} */}
                            </div>
                        </CardContent>
                    </Card>
                </div>
                <h3 className="text-lg font-semibold mt-5">Hall Of Fame</h3>
                <div className="flex flex-col md:flex-row w-full mt-2 text-ye">
                    <Card className="m-2 bg-panelButtonColor w-full md:w-1/3">
                        <CardHeader>
                            <CardTitle className="text-yellow-500">Most Attendance</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p>{memberSummary ? memberSummary.topAttendance.memberName : "Unknown"}: {memberSummary ? memberSummary.topAttendance.attendanceRatio : "0"}</p>
                        </CardContent>
                    </Card>
                    <Card className="m-2 bg-panelButtonColor w-full md:w-1/3">
                        <CardHeader>
                            <CardTitle className="text-yellow-500">Most Status Updates</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p>{memberSummary ? memberSummary.topStatusUpdate.memberName : "Unknown"}: {memberSummary ? memberSummary.topStatusUpdate.statusRatio : "0"}</p>
                        </CardContent>
                    </Card>

                    <Card className="m-2 bg-panelButtonColor w-full md:w-1/3">
                        <CardHeader>
                            <CardTitle className="text-yellow-500">Highest CP Score</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p>Unknown: 0</p>
                        </CardContent>
                    </Card>
                </div>
                <Card
                    className="m-2 bg-panelButtonColor w-[98.5%]">
                    <CardHeader options={
                        <div className="flex items-center space-x-2">
                            <div className="relative w-44">
                                <input
                                    type="text"
                                    placeholder="Search..."
                                    className="px-4 py-1 border rounded-md w-full bg-bgMainColor text-offWhite text-sm pr-10"
                                />
                                <Search
                                    className="absolute right-2 top-1/2 transform -translate-y-1/2 text-offWhite cursor-pointer"
                                    size={20}
                                />
                            </div>
                        </div>
                    }>
                        <CardTitle>Members</CardTitle>
                    </CardHeader>
                    <CardContent
                        className="pt-5 overflow-x-scroll">
                        <div className="w-full max-h-96 h-fit overflow-y-scroll overflow-x-scroll min-w-[500px] md:overflow-x-hidden">
                            <div className="grid grid-cols-4 items-center w-full text-white font-bold py-2 overflow-x-scroll">
                                <div className="text-left px-10">Members</div>
                                <div className="text-center ">Active Projects</div>
                                <div className="text-center">Attendance</div>
                                <div className="text-right px-10">Status Updates</div>
                            </div>

                            <hr className="border-t border-gray-600" />


                            {memberSummary?.enrichedData.map((item, index) => (
                                <div
                                    key={index}
                                    className="grid grid-cols-4 items-center w-full py-2 border-b border-gray-500 opacity-90 transition-all duration-300 ease-in-out hover:opacity-100 font-light hover:scale-x-105 hover:font-normal overflow-x-scroll"
                                    onClick={() => navigateToMemberDetails(item)}

                                >
                                    <div className="text-left px-10">{item.name}</div>
                                    <div className="text-center">{item.projects}</div>
                                    <div className="text-center">{item.attendanceMonth}</div>
                                    <div className="text-right px-10">{item.statusStreak}</div>
                                </div>
                            ))}
                        </div>
                    </CardContent>


                </Card>
            </div>
        </div >
    );
};

export default Dashboard;
