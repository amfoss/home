"use client";

import client from "@/lib/apollo-client";
import { gql } from "@apollo/client";
import {
  GetAttendanceDetailsQueryResponse,
  AttendanceDetails,
  GetMemberDetailsQueryResponse,
} from "@/types/types";

const GET_ATTENDANCE_DETAILS_QUERY = gql`

  query 
  {attendanceByDate(date : "2025-01-01"){
      # attendance
      timeIn
      timeOut
      date
      isPresent
    }}
`;

const GET_MEMBER_DETAILS_QUERY = gql`

    query {
    members {
     memberId
      name
      year
    } 
  }
`;

export const AttendanceService = {
  // Function to get attendance details based on a specific date
  async getAttendanceDetails(date: string): Promise<AttendanceDetails[]> {
    try {
      const [attendanceResponse, memberResponse] = await Promise.all([
        client.query<GetAttendanceDetailsQueryResponse>({
          query: GET_ATTENDANCE_DETAILS_QUERY,
          variables: { date },
        }),
        client.query<GetMemberDetailsQueryResponse>({
          query: GET_MEMBER_DETAILS_QUERY,
        }),
      ]);

      const attendanceDetails = attendanceResponse.data.getAttendance;
      const members = memberResponse.data.getMember;

      // Map member IDs to both names and years
      const memberMap = new Map(
        members.map((member) => [
          member.id,
          { name: member.name, year: member.year },
        ])
      );

      // Enrich attendance details with member names and years
      const enrichedAttendance = attendanceDetails.map((attendance) => ({
        ...attendance,
        memberName: memberMap.get(attendance.id)?.name || "Unknown", // Get member name or default to 'Unknown'
        year: memberMap.get(attendance.id)?.year || "Unknown", // Get member year or default to 'Unknown'
      }));

      return enrichedAttendance;
    } catch (error) {
      console.error("Error fetching attendance details:", error);
      throw new Error("Could not fetch attendance details");
    }
  },
};
