"use client";

import client from "@/lib/apollo-client";
import { gql } from "@apollo/client";
import toast from 'react-hot-toast'
import {
  AllMembersAttendanceResponse,
  AttendanceDetails,
  Member
} from "@/types/types";


const GET_ATTENDANCE_DETAILS_QUERY = gql`
  query GABD($date:NaiveDate!) {
    allMembers{
      name
      year
      attendance{
        onDate(date: $date){
          timeIn
          timeOut
          isPresent
        }
      }
    }
  }
`;


export const AttendanceService = {
  async getAttendanceDetails(date: string): Promise<AttendanceDetails[]> {
    try {
      const response = await client.query<AllMembersAttendanceResponse>({
        query: GET_ATTENDANCE_DETAILS_QUERY,
        variables: { date },
      });


      const attendanceDetails: AttendanceDetails[] = response.data.allMembers.map(item => {
        return {
          member: {
            name: item.name,
            year: item.year.toString() 
          },
          timeIn: item.attendance.onDate.timeIn,
          timeOut: item.attendance.onDate.timeOut,
          isPresent: item.attendance.onDate.isPresent
        };
      });

      return attendanceDetails;
    } catch (error) {
      console.error("Error fetching attendance details:", error);
      toast.error("Failed to fetch attendance data");
      return [];
    }
  },
};