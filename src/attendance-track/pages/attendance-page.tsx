import React, { useEffect, useState } from "react";
import SidePanel from "../../global/components/sidepanel/side-panel";
import { AttendanceDetails } from "../types/types";
import { AttendanceDetailRow } from "../components/attendance-details"; 
import { AttendanceService } from "../services/attendance-service"; // Ensure the service is imported

export const AttendancePage: React.FC = () => {
  // State for attendance data
  const [attendanceData, setAttendanceData] = useState<AttendanceDetails[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAttendanceData = async () => {
      try {
        const date = '2024-10-03'; // Replace with actual date as necessary
        const data = await AttendanceService.getAttendanceDetails(date);

        console.log(data)
        setAttendanceData(data);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch attendance data');
        setLoading(false);
      }
    };

    fetchAttendanceData();
  }, []);

  return (
    <div className="flex h-screen flex-row">
      <SidePanel />
      <div className="flex flex-col w-full h-full p-5">
        <div className="flex flex-[1] w-full">
          {/* Additional content can go here */}
        </div>
        <div className="flex flex-[2] w-full gap-5">
          {/* Wrapper div for making the table scrollable */}
          <div className="bg-panelButtonColor w-4/6 rounded-md">
            <div className="h-full min-w-full text-center">
              <div className="h-[17%] font-jetbrains grid grid-flow-col content-center text-primaryYellow text-xl sticky bg-panelColor">
                <div>Member</div>
                <div>Year</div>
                <div>Time In</div>
                <div>Time Out</div>
                <div>Date</div>
              </div>
              <div className="text-offWhite overflow-y-auto h-[83%] font-jetbrains text-base font-extrabold">
                {loading ? (
                  <div>Loading...</div>
                ) : error ? (
                  <div>{error}</div>
                ) : attendanceData.length > 0 ? (
                  attendanceData.map((attendance, index) => (
                    <AttendanceDetailRow
                      key={index}
                      id={attendance.id}
                      memberName={attendance.memberName}    
                      timein={attendance.timein.substring(0, 8)}
                      timeout={attendance.timeout.substring(0, 8)}
                      date={attendance.date}
                      year={attendance.year} 
                                   />
                  ))
                ) : (
                  <div>No attendance records found</div>
                )}
              </div>
            </div>
          </div>
          <div className="flex flex-col bg-panelButtonColor w-2/6 rounded-md"></div>
        </div>
      </div>
    </div>
  );
};

export default AttendancePage;
