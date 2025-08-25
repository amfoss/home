import client from "@/lib/apollo-client";
import { gql } from "@apollo/client";
import { MemberDetails, EnrichedMemberData ,  AttendanceCountDetails, statusUpdateCountDetails} from "@/types/types";

// GraphQL query to fetch members with their streak info
const GET_MEMBERS_QUERY = gql`
  query my_query {
    members {
      memberId
      name
      year
      streak {
        maxStreak
        currentStreak
      }
    }
  }
`;

const GET_ATTENDANCE_COUNT_QUERY = gql`
  query GetAttendanceCounts($startDate: String!, $endDate: String!) {
    members {
      memberId
      name
      year
      presentCountByDate(startDate: $startDate, endDate: $endDate)
      absentCountByDate(startDate: $startDate, endDate: $endDate)
    }
  }
`;

const GET_STATUS_UPDATE_COUNT_QUERY = gql`
  query GetStatusUpdateCounts($startDate: String!, $endDate: String!) {
    members {
      memberId
      name
      year
      statusUpdateCountByDate(startDate: $startDate, endDate: $endDate)
    }
  }
`;

// This query is redundant since it fetches the same data as GET_MEMBERS_QUERY
// Keeping it for structure, but you can remove it if not needed
// const GET_STATUS_STREAK_QUERY = gql`
//   query my_query {
//     members {
//       memberId
//       streak {
//         maxStreak
//         currentStreak
//       }
//     }
//   }
// `;

export const DashboardService = {
  async getMemberSummary(
    startDate: string,
    endDate: string
  ): Promise<{
    enrichedData: EnrichedMemberData[];
    topAttendance: { memberName: string; attendanceRatio: string };
    topStatusUpdate: { memberName: string; statusRatio: string };
  }> {
    try {
      // Fetch members data (streak info is included)
      const memberResponse = await client.query<{ members: any[] }>({
        query: GET_MEMBERS_QUERY,
      });

      const members = memberResponse.data.members;

      let maxStatusRatio = 0;
      let maxStatusMembers: string[] = [];

      // Enrich member data with streak info and calculate top status updater(s)
      const enrichedData: EnrichedMemberData[] = members.map((member) => {
        const streak = member.streak || { currentStreak: 0, maxStreak: 0 };
        const statusRatio = streak.currentStreak / (streak.maxStreak || 1);

        if (statusRatio > maxStatusRatio) {
          maxStatusRatio = statusRatio;
          maxStatusMembers = [member.name];
        } else if (statusRatio === maxStatusRatio) {
          maxStatusMembers.push(member.name);
        }

        return {
          id: member.memberId,
          name: member.name,
          year: member.year,
          statusStreak: streak.currentStreak,
          maxStatusStreak: streak.maxStreak,
          projects: [], // Assuming projects are not fetched in this query
        };
      });

      // Attendance summary is not available, so we return "N/A"
      return {
        enrichedData,
        topAttendance: {
          memberName: "N/A",
          attendanceRatio: "N/A",
        },
        topStatusUpdate: {
          memberName:
            maxStatusMembers.length > 1
              ? "a lot of people"
              : maxStatusMembers[0] || "Unknown",
          statusRatio: `${Math.round(maxStatusRatio * 100)}%`,
        },
      };
    } catch (error) {
      console.error("Error fetching member summary data:", error);
      throw new Error("Could not fetch member summary data");
    }
  },

    // Dummy implementation for attendance counts
  async getAttendanceCounts(
    startDate: string,
    endDate: string
  ): Promise<{ date: string; count: number }[]> {
    // Generate 7 days of dummy data
    const start = new Date(startDate);
    const result: { date: string; count: number }[] = [];
    for (let i = 0; i < 7; i++) {
      const d = new Date(start);
      d.setDate(start.getDate() + i);
      result.push({
        date: d.toISOString().split("T")[0],
        count: Math.floor(Math.random() * 10) + 1, // random count between 1 and 10
      });
    }
    return result;
  },

  async getLowAttendanceCounts(
    startDate: string,
    endDate: string
  ): Promise<AttendanceCountDetails[]> {
    try {
      const { data } = await client.query<{
        members: {
          memberId: string;
          name: string;
          presentCountByDate: number;
          absentCountByDate: number;
        }[];
      }>({
        query: GET_ATTENDANCE_COUNT_QUERY,
        variables: { startDate, endDate },
      });

      return data.members.map((member) => ({
        id: member.memberId,
        name: member.name,
        presentCountByDate: member.presentCountByDate,
        absentCountByDate: member.absentCountByDate,
      }));
    } catch (error) {
      console.error("Error fetching attendance count:", error);
      throw new Error("Could not fetch attendance count");
    }
  },

  async getLowStatusUpdateCounts(
    startDate: string,
    endDate: string
  ): Promise<statusUpdateCountDetails[]> {
    try {
      const { data } = await client.query<{
        members: {
          memberId: string;
          name: string;
          statusUpdateCountByDate: number;
        }[];
      }>({
        query: GET_STATUS_UPDATE_COUNT_QUERY,
        variables: { startDate, endDate },
      });

      return data.members.map((member) => ({
        id: member.memberId,
        name: member.name,
        statusUpdateCountByDate: member.statusUpdateCountByDate,
      }));
    } catch (error) {
      console.error("Error fetching status update count:", error);
      throw new Error("Could not fetch status update count");
    }
  },
};