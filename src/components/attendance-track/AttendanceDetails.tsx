"use client";
import React from "react";
import { AttendanceDetails } from "@/types/types";

type AttendanceDetailRowProps = {
    titles: string[];
    loading: boolean;
    error: string | null;
    attendanceData: AttendanceDetails[];
    complete: boolean;
};

export const AttendanceDetailRow: React.FC<AttendanceDetailRowProps> = ({
    titles,
    loading,
    error,
    attendanceData,
    complete,
}) => {
    const truncate = (str: string, maxLength: number) =>
        str.length > maxLength ? str.substring(0, maxLength) + "..." : str;

    return (
        <div className="bg-panelButtonColor w-full min-w-[8.5rem] rounded-md overflow-hidden h-full">
            {/* Scrollable data section */}
            <div className="w-full  h-full overflow-y-auto flex flex-col">
                {/* Sticky header */}
                <div className="flex min-w-max p-2 sticky top-0 text-primaryYellow text-xl h-24 bg-panelColor flex-shrink-0 items-center justify-between">
                    {titles.map((title: string, index: number) => (
                        <div
                            key={index}
                            className={`w-1/5 min-w-[8.5rem] p-2 text-center ${index === 0 ? "basis-2/5 text-start px-4" : "basis-1/5"}`}
                        >
                            {title}
                        </div>
                    ))}
                </div>

                {loading ? (
                    <div className="text-center p-4 overflow-hidden text-offWhite">Loading...</div>
                ) : error ? (
                    <div className="text-center p-4 text-red-500">{error}</div>
                ) : attendanceData.length > 0 ? (
                    attendanceData.map((attendance, index) => (
                        <div
                            className={`flex min-w-full p-2 text-center items-center font-bold ${attendance.isPresent 
                                ? "text-offWhite" 
                                : "text-red-500" 
                                }`}
                            key={index}
                            aria-label={`Attendance record for ${attendance.member.name}`}
                        >
                            <div
                                className="min-w-[8.5rem] basis-2/5 px-4 truncate text-left"
                                title={attendance.member.name}
                            >
                                {truncate(attendance.member.name, 30)}
                            </div>
                            <div className="min-w-[8.5rem] basis-1/5 px-4 text-center">
                                {attendance.member.year}
                            </div>

                            {complete && (
                                <>
                                    <div className="min-w-[8.5rem] basis-1/5 px-4 text-center">
                                        {attendance.timeIn?.substring(0, 8) || "N/A"}
                                    </div>
                                    <div className="min-w-[8.5rem] basis-1/5 px-4 text-center">
                                        {attendance.timeOut?.substring(0, 8) || "N/A"}
                                    </div>
                                </>
                            )}
                        </div>
                    ))
                ) : (
                    <div className="text-center p-4 overflow-hidden">No attendance records found</div>
                )}
            </div>
        </div>
    );
};
