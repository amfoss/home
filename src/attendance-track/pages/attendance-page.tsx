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
        // Get today's date in IST
        const today = new Date().toLocaleDateString('en-GB', { 
          timeZone: 'Asia/Kolkata',
          year: 'numeric',
          month: '2-digit',
          day: '2-digit'
        });
        
        // Format it as 'YYYY-MM-DD'
        const [day, month, year] = today.split('/');
        const date = `${year}-${month}-${day}`; // 'YYYY-MM-DD' format
    
        const data = await AttendanceService.getAttendanceDetails(date);
    
        console.log(data);
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
              <div className="h-24 font-jetbrains grid grid-flow-col content-center text-primaryYellow text-xl sticky bg-panelColor">
                <div>Member</div>
                <div>Year</div>
                <div>Time In</div>
                <div>Time Out</div>
                <div>Date</div>
              </div>
              <div className="text-offWhite overflow-y-auto h-[31rem] font-jetbrains text-base font-extrabold">
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
          <div className="flex flex-1 flex-col gap-4">
            
            <div className="flex flex-col h-full w-full bg-panelButtonColor w-2/6 rounded-md"></div>
            <div className="flex flex-col h-full w-full bg-panelButtonColor w-2/6 rounded-md"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AttendancePage;
