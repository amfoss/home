"use client";
import React, { useEffect, useState } from "react";

import { AttendanceDetails, AttendanceDetailsMouli } from "@/types/types";
import { AttendanceDetailRow } from "@/components/attendance-track/AttendanceDetails";
import { AttendanceService } from "@/services/attendance-service"; // Ensure the service is imported
import Calendar from "@/components/Calendar";

export const AttendancePage: React.FC = () => {
  // State for attendance data
  const [attendanceData, setAttendanceData] = useState<AttendanceDetailsMouli[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedDate, setSelectedDate] = useState(new Date());

  const attendanceListTitle = [
    "Name",
    "Year",
    "In Time",
    "Out Time",
  ];
  // const absentListTitle = [
  //   "Name",
  //   "Year",
  // ];


  useEffect(() => {
    const fetchAttendanceData = async () => {
      try {
        const data = await AttendanceService.getAttendanceDetails(selectedDate.toISOString().split("T")[0]);
        setAttendanceData(data);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch attendance data ' + err);
        setLoading(false);
      }
    };
    fetchAttendanceData();
  }, [selectedDate]);

  const handleDateClick = (date: Date) => {
    setSelectedDate(date);
  };

  const presentMembers = attendanceData.filter(member => member.isPresent);
  const absentMembers = attendanceData.filter(member => !member.isPresent);
  const filteredData = [...presentMembers, ...absentMembers];

  return (
    <div className="flex  h-screen flex-row  w-full flex-shrink-0 ">

      <div className="flex flex-col w-full max-h-fit p-5  ">
        <div className=" mx-2 max-h-30 pb-10 ">
          {/* Additional content can go here */}
          <Calendar onDateClick={handleDateClick} />
        </div>
        <div className="flex flex-col min-h-full lg:flex-row w-full">
          <AttendanceDetailRow complete={true} titles={attendanceListTitle} loading={loading} attendanceData={filteredData} error={error} />

          {/* Flex container for the two boxes */}
          <div className="flex flex-col lg:flex-col gap-4 lg:w-2/3 lg:h-full w-full lg:ml-5 lg:mt-0 mt-5 md:w-full md:h-56 ">
            <div className="flex flex-col bg-panelButtonColor rounded-md p-4 h-full">
              {/*TODO: need to implement absentee list.*/}
            </div>
            <div className="flex flex-col bg-panelButtonColor rounded-md p-4 h-full">
              {/*need to implement some sorta graph*/}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default AttendancePage;
