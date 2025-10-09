"use client";
import React, { useEffect, useMemo, useState } from "react";
import { Chart, ArcElement } from "chart.js";
Chart.register(ArcElement);
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  TimeScale,
  RadialLinearScale,
} from "chart.js";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(
  RadialLinearScale,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  TimeScale,
  Title,
  Tooltip,
  Legend
);

import { AttendanceDetails } from "@/types/types";
import { AttendanceDetailRow } from "@/components/AttendanceTable";
import { AttendanceService } from "@/services/attendance-service";
import Calendar from "@/components/Calendar";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/Card";

export default function Page() {
  // State for attendance data
  const [attendanceData, setAttendanceData] = useState<AttendanceDetails[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [expandedRow, setExpandedRow] = useState<number | null>(null);

  // Define constants outside of the component to prevent recreation on each render
  const attendanceListTitle = React.useMemo(() => ["Name", "Year", "In Time", "Out Time"], []);

  useEffect(() => {
    const fetchAttendanceData = async () => {
      try {
        const data = await AttendanceService.getAttendanceDetails(
          selectedDate.toISOString().split("T")[0]
        );
        setAttendanceData(data);
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch attendance data " + err);
        setLoading(false);
      }
    };
    fetchAttendanceData();
  }, [selectedDate]);

  // Memoize the handleDateClick function to prevent recreation on each render
  const handleDateClick = React.useCallback((date: Date) => {
    setSelectedDate(date);
  }, []);

  const timeStringToMS = React.useCallback((timeString: any) => {
    if (!timeString) return null;
    try {
      const parts = timeString.split(":");
      if (parts.length < 3) return null;
      
      const hours = parseInt(parts[0], 10);
      const min = parseInt(parts[1], 10);

      let seconds = 0, milliSeconds = 0;
      if (parts[2].includes(".")) {
        const secAndmsec = parts[2].split(".");
        seconds = parseInt(secAndmsec[0], 10);
        milliSeconds = parseInt(secAndmsec[1], 10);
      } else {
        seconds = parseInt(parts[2], 10);
      }

      const timeInMS = (min * 60 + hours * 3600 + seconds) * 1000 + milliSeconds;
      return timeInMS;
    } catch (error) {
      console.error("Error parsing time string:", timeString, error);
      return null;
    }
  }, []);

  const minimumTime = useMemo(() => {
    if (!attendanceData || attendanceData.length === 0) return null;

    let minTime = Number.MAX_SAFE_INTEGER;
    let foundAtLeastOneValidTime = false;

    // Only consider present members for minimum time calculation
    const presentMembersOnly = attendanceData.filter(member => member.isPresent);
    
    for (const member of presentMembersOnly) {
      const memberTimeInMS = timeStringToMS(member.timeIn);
      if (memberTimeInMS != null) {
        if (memberTimeInMS < minTime) minTime = memberTimeInMS;
        foundAtLeastOneValidTime = true;
      }
    }
    
    console.log("Minimum time found:", foundAtLeastOneValidTime ? new Date(minTime).toISOString() : "None");
    return foundAtLeastOneValidTime ? minTime : null;
  }, [attendanceData, timeStringToMS]);


  // Define time as a constant outside of render to avoid recreating it on each render
  const LATE_THRESHOLD_MS = 30 * 60 * 1000; 
  
  // Calculate late time only when minimumTime changes
  const lateTime = useMemo(() => {
    if (!minimumTime) return null;
    const late = minimumTime + LATE_THRESHOLD_MS;
    console.log("Late threshold set at:", new Date(late).toISOString());
    return late;
  }, [minimumTime]);

  // Memoize the filtered member arrays to avoid recalculating on every render
  const { absentMembers, presentMembers, lateMembers, filteredData } = useMemo(() => {
    // First, separate present and absent members
    const absent = attendanceData.filter(member => !member.isPresent);
    let present = [];
    let late = [];
    
    // Only process present members if we have a valid late threshold
    if (lateTime !== null) {
      // Split present members into on-time and late
      for (const member of attendanceData) {
        if (!member.isPresent) continue;
        
        const memberTimeInMS = timeStringToMS(member.timeIn);
        if (memberTimeInMS === null) continue;
        
        // Debug the comparison
        console.log(`Member ${member.member.name}: Time ${member.timeIn} (${memberTimeInMS}) vs Late threshold ${lateTime}`);
        
        if (memberTimeInMS < lateTime) {
          present.push(member);
        } else {
          late.push(member);
        }
      }
    } else {
      // If no valid late threshold, consider all present members as on-time
      present = attendanceData.filter(member => member.isPresent);
    }
    
    console.log(`Found ${absent.length} absent, ${present.length} on-time, and ${late.length} late members`);
    
    return {
      absentMembers: absent,
      presentMembers: present,
      lateMembers: late,
      filteredData: [...present, ...absent, ...late]
    };
  }, [attendanceData, lateTime, timeStringToMS]);

  // Memoize the chart data to prevent unnecessary recalculations
  const chartData = useMemo(() => ({
    labels: ["Present OnTime", "Absent", "Late"],
    datasets: [
      {
        label: "Attendance Summary",
        data: [
          presentMembers.length,
          absentMembers.length,
          lateMembers.length,
        ],
        backgroundColor: [
          "rgba(255, 205, 86, 0.2)",
          "rgba(255, 99, 132, 0.2)",
          "rgba(255, 159, 64, 0.2)",
        ],
        borderColor: [
          "rgb(255, 205, 86)",
          "rgb(255, 99, 132)",
          "rgb(255, 159, 64)",
        ],
        hoverOffset: 4,
      },
    ],
  }), [presentMembers.length, absentMembers.length, lateMembers.length]);
  
  return (
    <div className="flex overflow-scroll h-screen w-full mb-5 flex-shrink-0 scroll-smooth">
      <div className="flex flex-col w-full max-h-fit p-5">
        <div className=" mx-2 max-h-30 pb-10 ">
          <Calendar onDateClick={handleDateClick} />
        </div>
        <div className="flex flex-col min-h-full xl:flex-row w-full">
          <div className="sm:h-[600px] xl:h-full w-full xl:w-2/3">
            <AttendanceDetailRow
              complete={true}
              titles={attendanceListTitle}
              loading={loading}
              attendanceData={filteredData}
              error={error}
            />
          </div>

          <div className="flex flex-row sm:flex-col md:flex-row xl:flex-col gap-5 xl:h-full xl:ml-5 xl:mt-0 mt-5 w-full xl:w-1/3 md:w-full md:h-96 ">
            <div className="flex flex-col bg-panelButtonColor rounded-md p-8 items-center justify-center min-w-64 xl:h-2/5 xl:w-full w-full md:w-1/2">
              <Doughnut data={chartData}></Doughnut>
            </div>
            <Card className="bg-panelButtonColor w-full xl:w-full xl:h-3/5 text-white overflow-hidden md:w-1/2 flex flex-col">
              <CardHeader>
                <div>
                  <CardTitle className="bg-panelButtonColor text-primaryYellow">
                    Late Entry Log
                    <CardDescription className="mt-2 mb-1">
                      Of {selectedDate.toLocaleDateString("en-CA")}
                    </CardDescription>
                  </CardTitle>
                </div>
              </CardHeader>
              <CardContent className="flex-grow min-h-0 overflow-y-auto scroll-smooth">
                <div className="w-full">
                  <div className="sticky top-0 bg-panelButtonColor z-10">
                    <div className="grid grid-cols-[1fr_90px_90px] items-center w-full">
                      <div className="px-5">Name</div>
                      <div className="text-center">Year</div>
                      <div className="pl-5">TimeIn</div>
                    </div>
                    <hr className="border-t border-white mt-2" />
                  </div>
                  {loading ? (
                    <p className="text-center p-2 text-white"> Loading...</p>
                  ) : error ? (
                    <div className="text-center p-4 text-red-500">{error}</div>
                  ) : lateMembers.length === 0 ? (
                    <div className="text-center p-4 text-[#facfa5]">✨ No late members found ✨</div>
                  ) : (
                    lateMembers.map((item, index) => (
                      <div
                        key={index}
                        className="grid grid-cols-[1fr_90px_90px] items-center w-full py-2 border-b border-gray-500"
                      >
                        <div
                          className={`px-5 text-[#facfa5] overflow-hidden ${
                            expandedRow !== index && "text-ellipsis whitespace-nowrap"
                          }`}
                          onClick={() =>
                            setExpandedRow(expandedRow === index ? null : index)
                          }
                        >
                          {item.member.name}
                        </div>
                        <div className="text-center text-[#facfa5]">
                          {item.member.year}
                        </div>
                        <div className="pl-5 text-[#facfa5]">
                          {item.timeIn?.substring(0, 8)}
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </CardContent>
            </Card>
            {/* </div> */}
          </div>
        </div>
      </div>
    </div>
  );
}
