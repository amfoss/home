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

  const attendanceListTitle = [
    "Name",
      "Year",
    "Date",
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
        setAttendanceData(data);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch attendance data'+err);
        setLoading(false);
      }
    };
    
    fetchAttendanceData();
  }, []);


  const presentMembers = attendanceData.filter(member => member.isPresent);
  const absentMembers = attendanceData.filter(member => !member.isPresent);
  const filteredData = [...presentMembers, ...absentMembers];

  return (
    <div className="flex h-screen flex-row border w-screen flex-shrink-0">
      <div className="w-2/12 max-w-"><SidePanel /></div>
      <div className="flex flex-col w-10/12 h-full p-5 ">
        <div className="flex flex-[1] w-full max-h-10">
          {/* Additional content can go here */}
        </div>
        <div className="flex flex-col lg:flex-row w-full">
          <AttendanceDetailRow complete={true} titles={attendanceListTitle} loading={loading} attendanceData={filteredData} error={error}/>

          {/* Flex container for the boxes */}
          <div className="flex flex-col lg:flex-col gap-4 lg:w-2/5 lg:h-full w-full lg:ml-5 lg:mt-0 mt-5 md:w-full md:h-56 ">
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
