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
import { AttendanceDetailRow } from "@/components/attendance-track/AttendanceDetails";
import { AttendanceService } from "@/services/attendance-service"; // Ensure the service is imported
import Calendar from "@/components/Calendar";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/Card";

export const AttendancePage: React.FC = () => {
  // State for attendance data
  const [attendanceData, setAttendanceData] = useState<AttendanceDetails[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedDate, setSelectedDate] = useState(new Date());

  const attendanceListTitle = ["Name", "Year", "In Time", "Out Time"];

  useEffect(() => {
    const fetchAttendanceData = async () => {
      try {
        const data = await AttendanceService.getAttendanceDetails(
          selectedDate.toISOString().split("T")[0]
        );
        setAttendanceData(data);
        setLoading(false);
        console.log(data);
      } catch (err) {
        setError("Failed to fetch attendance data " + err);
        setLoading(false);
      }
    };
    fetchAttendanceData();
  }, [selectedDate]);

  const handleDateClick = (date: Date) => {
    setSelectedDate(date);
  };

  const timeStringToMS = (timeString: any) => {
    if (!timeString) return null;
    const parts = timeString.split(":");
    const hours = parseInt(parts[0], 10);
    const min = parseInt(parts[1], 10);

    const secAndmsec = parts[2].split(".");
    const seconds = parseInt(secAndmsec[0], 10);
    const milliSeconds = parseInt(secAndmsec[1], 10);

    const timeInMS = (min * 60 + hours * 3600 + seconds) * 1000 + milliSeconds;
    return timeInMS;
  };

  const minimumTime = useMemo(() => {
    if (!attendanceData || attendanceData.length === 0) return null;

    let minTime = Number.MAX_SAFE_INTEGER;

    let foundAtLeastOneValidTime = false;

    for (const member of attendanceData) {
      const memberTimeInMS = timeStringToMS(member.timeIn);
      if (memberTimeInMS != null) {
        if (memberTimeInMS < minTime) minTime = memberTimeInMS;
        foundAtLeastOneValidTime = true;
      }
    }
    return foundAtLeastOneValidTime ? minTime : null;
  }, [attendanceData]);


  const time = 30 * 60 * 1000;
  const lateTime = useMemo(() => {
    if (!minimumTime) return null;
    return minimumTime + time;
  }, [minimumTime, time]);

  const absentMembers = attendanceData.filter(member => !member.isPresent);
  const presentMembers = attendanceData.filter(member => {
    if (!member.isPresent) return false;
    const memberTimeInMS = timeStringToMS(member.timeIn);
    if (memberTimeInMS === null || lateTime === null) return false;
    return memberTimeInMS < lateTime;
  });
  const lateMembers = attendanceData.filter(member => {
    if(!member.isPresent) return false;
    const memberTimeInMS = timeStringToMS(member.timeIn);
    if (memberTimeInMS === null || lateTime === null) return false;
    return memberTimeInMS >= lateTime;
  });

  const filteredData = [...presentMembers, ...absentMembers];

  return (
      <div className="flex overflow-scroll h-screen w-full mb-5 flex-shrink-0">
      <div className="flex flex-col w-full max-h-fit p-5">
        <div className=" mx-2 max-h-30 pb-10 ">
          {/* Additional content can go here */}
          <Calendar onDateClick={handleDateClick} />
        </div>
        <div className="flex flex-col min-h-full xl:flex-row w-full">
          <div className="sm:h-[600px] xl:h-full">
            <AttendanceDetailRow
              complete={true}
              titles={attendanceListTitle}
              loading={loading}
              attendanceData={filteredData}
              error={error}
            />
          </div>

          {/* Flex container for the two boxes */}
          <div className="flex flex-row sm:flex-col md:flex-row xl:flex-col gap-5  xl:h-full xl:ml-5 xl:mt-0 mt-5 w-2/5 md:w-full md:h-full ">
            <div className="flex flex-col bg-panelButtonColor rounded-md p-8 items-center justify-center min-w-64 h-fit xl:h-2/5 xl:w-full w-full">
              {/*TODO: need to implement absentee list.*/}
              <Doughnut
                data={{
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
                }}
              ></Doughnut>
            </div>
            {/* <div className=" bg-panelButtonColor min-h-fit rounded-md min-h-3/5 h-full w-full"> */}
            {/*need to implement some sorta graph*/}
            <Card className="bg-panelButtonColor  w-full xl:w-full h-fit text-white">
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
              <CardContent>
                <div className="w-full xl:max-h-96 overflow-y-scroll">
                  <div className="grid grid-cols-[1fr,minmax(70px,auto),minmax(70px,auto)] items-center w-full">
                    <div className="px-5 basis-2/5">Name</div>
                    <div className="pl-5 basis-2/5">Year</div>
                    <div className="pl-5 basis-1/5">TimeIn</div>
                  </div>
                  <hr className="border-t border-white mt-2" />
                  {loading ? (
                    <p className="text-center p-2 text-white"> Loading...</p>
                  ) : error ? (
                    <div className="text-center p-4 text-red-500">{error}</div>
                  ) : lateMembers.length === 0 ? (
                    <div className="text-center p-4 text-red-500">No Data</div>
                  ) : (
                    lateMembers.map((item, index) => (
                      <div
                        key={index}
                        className="grid grid-cols-[1fr,minmax(70px,auto),minmax(70px,auto)] items-center w-full py-2 border-b border-gray-500"
                      >
                        <div className="px-5 basis-2/5 text-[#facfa5]">
                          {item.name}
                        </div>
                        <div className="pl-5 basis-2/5 text-[#facfa5]">
                          {item.year}
                        </div>
                        <div className="pl-5 basis-1/5 text-[#facfa5]">
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
};

export default AttendancePage;
