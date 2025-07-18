"use client";
import React, { use, useEffect, useMemo, useState } from "react";
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
import { Bar, Doughnut } from "react-chartjs-2";

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

import { updatedAttendanceDetails } from "@/types/types";
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
  const [attendanceData, setAttendanceData] = useState<
    updatedAttendanceDetails[]
  >([]);
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
      }
      foundAtLeastOneValidTime = true;
    }
    return foundAtLeastOneValidTime ? minTime : null;
  }, [attendanceData]);

  const time = 30 * 60 * 1000;
  const lateTime = useMemo(() => {
    if (!minimumTime) return null;
    return minimumTime + time;
  }, [minimumTime, time]);

  const absentMembers = attendanceData.filter((member) => !member.isPresent);

  const presentMembers = attendanceData.filter((member) => {
    if (!member.isPresent) return false;
    const memberTimeInMs = timeStringToMS(member.timeIn);
    if (memberTimeInMs === null || lateTime === null) return false;
    return memberTimeInMs < lateTime;
  });

  const lateMembers = attendanceData.filter(
    (member) =>{
    if (!member.isPresent) return false;
    const memberTimeInMs = timeStringToMS(member.timeIn);
    if (memberTimeInMs === null || lateTime === null) return false;
    return memberTimeInMs > lateTime;
    }
  );

  const filteredData = [...presentMembers, ...absentMembers];

  return (
    <div className="flex overflow-scroll h-screen flex-row  w-full flex-shrink-0 ">
      <div className="flex flex-col w-full max-h-fit p-5  ">
        <div className=" mx-2 max-h-30 pb-10 ">
          {/* Additional content can go here */}
          <Calendar onDateClick={handleDateClick} />
        </div>
        <div className="flex flex-col min-h-full lg:flex-row w-full">
          <AttendanceDetailRow
            complete={true}
            titles={attendanceListTitle}
            loading={loading}
            attendanceData={filteredData}
            error={error}
          />

          {/* Flex container for the two boxes */}
          <div className="flex flex-col lg:flex-col gap-4 lg:w-2/3 lg:h-full w-full lg:ml-5 lg:mt-0 mt-5 md:w-full md:h-56 ">
            <div className="flex flex-col bg-panelButtonColor rounded-md p-8 items-center justify-center h-[400px] w-full">
              {/*TODO: need to implement absentee list.*/}
              <Doughnut
                data={{
                  labels: ["Present", "Absent", "Late"],
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
            <div className="flex flex-col bg-panelButtonColor items-center justify-center pb-10 rounded-md h-full w-full">
              {/*need to implement some sorta graph*/}
              <Card className="bg-panelButtonColor max-w-full m-2 lg:w-1/2">
                <CardHeader>
                  <div className="flex justify-between min-w-full">
                    <CardTitle>
                      Low on count
                      <CardDescription className="mt-2">
                        {/* From {getDateRange(selectedDate, 30)} */}
                      </CardDescription>
                    </CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="w-full h-48 overflow-y-scroll">
                    <div className="grid grid-cols-[1fr,minmax(70px,auto),minmax(70px,auto)] items-center w-full">
                      <div className="px-5">Name</div>
                      <div className="pl-5">Semester</div>
                      <div className="pl-5">TimeIn</div>
                    </div>

                    <hr className="border-t border-white mt-2" />

                    {/*need to add query for getting people with least numbers*/}
                    {/* <p className="text-center p-2 text-red-500"> No data available</p>*/}
                    {/* data.map((item, index) => (
                                <div key={index} className="grid grid-cols-[1fr,minmax(70px,auto),minmax(50px,auto)] items-center w-full py-2 border-b border-gray-500">
                                    <div className="px-5">{item.name}</div>
                                    <div className="pl-5">{item.attended}</div>
                                    <div className="pl-5">{item.missed}</div>
                                </div>
                                ))} */}
                    {/* {lowCountData.length === 0 ? (
                                <p className="text-center p-2 text-red-500"> No data available</p>
                            ) : (
                                lowCountData.map((item, index) => (
                                    <div key={index} className="grid grid-cols-[1fr,minmax(70px,auto),minmax(50px,auto)] items-center w-full py-2 border-b border-gray-500">
                                        <div className="px-5">{item.name}</div>
                                        <div className="pl-5">{item.attended}</div>
                                        <div className="pl-5">{item.missed}</div>
                                    </div>
                                ))
                            )} */}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AttendancePage;
