"use client";
import React, { use, useEffect, useState } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  TimeScale,
  RadialLinearScale,
} from "chart.js";
import { Bar, Radar } from "react-chartjs-2";

ChartJS.register(
  RadialLinearScale,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  TimeScale,
);

import { AttendanceDetails, AttendanceDetailsMouli } from "@/types/types";
import { AttendanceDetailRow } from "@/components/attendance-track/AttendanceDetails";
import { AttendanceService } from "@/services/attendance-service"; // Ensure the service is imported
import Calendar from "@/components/Calendar";

export const AttendancePage: React.FC = () => {
  // State for attendance data
  const [attendanceData, setAttendanceData] = useState<
    AttendanceDetailsMouli[]
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
  );
  const filteredData = [...presentMembers, ...absentMembers];
  const onTimeMembers = attendanceData.filter(
    (member) => member.isPresent && member.timeIn === "17:30:00"
  );
  const earlyMembers = attendanceData.filter(
    (member) => member.isPresent && member.timeIn < "17:30:00"
  );

  // Yearwise members
  const firstYears = attendanceData.filter((members) => members.year === "1");
  const secondYears = attendanceData.filter((members) => members.year === "2");
  const thirdYears = attendanceData.filter((members) => members.year === "3");
  const fourthYears = attendanceData.filter((members) => members.year === "4");

  // Yearwise present members
  const firstYearPresent = firstYears.filter((members) => members.isPresent);
  const secondYearPresent = secondYears.filter((members) => members.isPresent);
  const thirdYearPresent = thirdYears.filter((members) => members.isPresent);
  const fourthYearPresent = fourthYears.filter((members) => members.isPresent);

  // Yearwise absent members
  const firstYearAbsent = firstYears.filter((members) => !members.isPresent);
  const secondYearAbsent = secondYears.filter((members) => !members.isPresent);
  const thirdYearAbsent = thirdYears.filter((members) => !members.isPresent);
  const fourthYearAbsent = fourthYears.filter((members) => !members.isPresent);

  // Yearwise late members
  const firstYearLate = firstYears.filter(
    (members) => members.isPresent && members.timeIn > "17:30:00"
  );
  const secondYearLate = secondYears.filter(
    (members) => members.isPresent && members.timeIn > "17:30:00"
  );
  const thirdYearLate = thirdYears.filter(
    (members) => members.isPresent && members.timeIn > "17:30:00"
  );
  const fourthYearLate = fourthYears.filter(
    (members) => members.isPresent && members.timeIn > "17:30:00"
  );

  // Yearwise on time members
  const firstYearOnTime = firstYears.filter(
    (members) => members.isPresent && members.timeIn === "17:30:00"
  );
  const secondYearOnTime = secondYears.filter(
    (members) => members.isPresent && members.timeIn === "17:30:00"
  );
  const thirdYearOnTime = thirdYears.filter(
    (members) => members.isPresent && members.timeIn === "17:30:00"
  );
  const fourthYearOnTime = fourthYears.filter(
    (members) => members.isPresent && members.timeIn === "17:30:00"
  );

  // Yearwise early members
  const firstYearEarly = firstYears.filter(
    (members) => members.isPresent && members.timeIn < "17:30:00"
  );
  const secondYearEarly = secondYears.filter(
    (members) => members.isPresent && members.timeIn < "17:30:00"
  );
  const thirdYearEarly = thirdYears.filter(
    (members) => members.isPresent && members.timeIn < "17:30:00"
  );
  const fourthYearEarly = fourthYears.filter(
    (members) => members.isPresent && members.timeIn < "17:30:00"
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
            <div className="flex flex-col bg-panelButtonColor rounded-md p-8 items-center justify-center h-full">
              {/*TODO: need to implement absentee list.*/}
              <Radar
                data={{
                  labels: ["Present", "Absent", "Late", "On Time", "Early"],
                  datasets: [
                    {
                      label: "First Years",
                      data: [
                        firstYearPresent.length,
                        firstYearAbsent.length,
                        firstYearLate.length,
                        firstYearOnTime.length,
                        firstYearEarly.length,
                      ],
                      fill: true,
                      backgroundColor: "rgba(255, 99, 132, 0.2)",
                      borderColor: "rgb(255, 99, 132)",
                      pointBackgroundColor: "rgb(255, 99, 132)",
                      pointBorderColor: "#fff",
                      pointHoverBackgroundColor: "#fff",
                      pointHoverBorderColor: "rgb(255, 99, 132)",
                    },
                    {
                      label: "Second Years",
                      data: [
                        secondYearPresent.length,
                        secondYearAbsent.length,
                        secondYearLate.length,
                        secondYearOnTime.length,
                        secondYearEarly.length,
                      ],
                      fill: true,
                      backgroundColor: "rgba(54, 162, 235, 0.2)",
                      borderColor: "rgb(54, 162, 235)",
                      pointBackgroundColor: "rgb(54, 162, 235)",
                      pointBorderColor: "#fff",
                      pointHoverBackgroundColor: "#fff",
                      pointHoverBorderColor: "rgb(54, 162, 235)",
                    },
                    {
                      label: "Third Years",
                      data: [
                        thirdYearPresent.length,
                        thirdYearAbsent.length,
                        thirdYearLate.length,
                        thirdYearOnTime.length,
                        thirdYearEarly.length,
                      ],
                      fill: true,
                      backgroundColor: "rgba(255, 206, 86, 0.2)",
                      borderColor: "rgb(255, 206, 86)",
                      pointBackgroundColor: "rgb(255, 206, 86)",
                      pointBorderColor: "#fff",
                      pointHoverBackgroundColor: "#fff",
                      pointHoverBorderColor: "rgb(255, 206, 86)",
                    },
                    {
                      label: "Fourth Years",
                      data: [
                        fourthYearPresent.length,
                        fourthYearAbsent.length,
                        fourthYearLate.length,
                        fourthYearOnTime.length,
                        fourthYearEarly.length,
                      ],
                      fill: true,
                      backgroundColor: "rgba(75, 192, 192, 0.2)",
                      borderColor: "rgb(75, 192, 192)",
                      pointBackgroundColor: "rgb(75, 192, 192)",
                      pointBorderColor: "#fff",
                      pointHoverBackgroundColor: "#fff",
                      pointHoverBorderColor: "rgb(75, 192, 192)",
                    },
                  ],
                }}
              ></Radar>
            </div>
            <div className="flex flex-col bg-panelButtonColor items-center justify-center pb-10 rounded-md h-full">
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
                        "rgba(255, 99, 132, 0.2)",
                        "rgba(255, 159, 64, 0.2)",
                        "rgba(255, 205, 86, 0.2)",
                      ],
                      borderColor: [
                        "rgb(255, 99, 132)",
                        "rgb(255, 159, 64)",
                        "rgb(255, 205, 86)",
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
