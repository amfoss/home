"use client";
import React, { use, useEffect, useState } from "react";
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

import { AttendanceDetails, updatedAttendanceDetails } from "@/types/types";
import { AttendanceDetailRow } from "@/components/attendance-track/AttendanceDetails";
import { AttendanceService } from "@/services/attendance-service"; // Ensure the service is imported
import Calendar from "@/components/Calendar";

export const AttendancePage: React.FC = () => {
  // State for attendance data
  const [attendanceData, setAttendanceData] = useState<
    updatedAttendanceDetails[]
  >([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedDate, setSelectedDate] = useState(new Date());

  const attendanceListTitle = ["Name", "Year", "In Time", "Out Time"];
  // const absentListTitle = [
  //   "Name",
  //   "Year",
  // ];

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

  useEffect(() => {}, [selectedDate]);

  const handleDateClick = (date: Date) => {
    setSelectedDate(date);
  };

  const presentMembers = attendanceData.filter((member) => member.isPresent);
  const absentMembers = attendanceData.filter((member) => !member.isPresent);
  const lateMembers = attendanceData.filter(
    (member) => member.isPresent && member.timeIn > "17:30:00"
  ); // Assuming 10:00 AM is the cutoff for being late
  const filteredData = [...presentMembers, ...absentMembers];
  const onTimeMembers = attendanceData.filter(
    (member) => member.isPresent && member.timeIn === "17:30:00"
  );
  const EarlyMembers = attendanceData.filter(
    (member) => member.isPresent && member.timeIn < "17:30:00"
  );

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
              <Bar
                className=" h-full w-full p-5"
                data={{
                  labels: ["Present", "Absent", "Late"],
                  datasets: [
                    {
                      label: "Attendance Statistics",
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
                      borderWidth: 1,
                      borderRadius: 5,
                    },
                  ],
                }}
              ></Bar>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AttendancePage;
