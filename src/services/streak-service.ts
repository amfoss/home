"use client";

import client from "@/lib/apollo-client";
import { gql } from "@apollo/client";
import { MemberDetails, EnrichedMemberData } from "@/types/types";

const GET_MEMBERS_QUERY = gql`
  query {
    getMember {
      id
      name
      year
    }
  }
`;

const GET_STATUS_STREAK_QUERY = gql`
  query {
    getUpdateStreak {
      id
      streak
      maxStreak
    }
  }
`;

const GET_PROJECTS_QUERY = gql`
  query {
    getProjects {
      memberId
      projectTitle
    }
  }
`;

const GET_ATTENDANCE_SUMMARY_QUERY = gql`
  query getAttendanceSummary($startDate: String!, $endDate: String!) {
    getAttendanceSummary(startDate: $startDate, endDate: $endDate) {
      dailyCount {
        date
        count
      }
      memberAttendance {
        id
        presentDays
      }
      maxDays
    }
  }
`;

export const DashboardService = {
  // Function to fetch attendance count by day
  async getAttendanceCounts(
    startDate: string,
    endDate: string
  ): Promise<{ date: string; count: number }[]> {
    try {
      const response = await client.query<{
        getAttendanceSummary: {
          dailyCount: { date: string; count: number }[];
        };
      }>({
        query: GET_ATTENDANCE_SUMMARY_QUERY,
        variables: { startDate, endDate },
      });

      return response.data.getAttendanceSummary.dailyCount;
    } catch (error) {
      console.error("Error fetching attendance count data:", error);
      throw new Error("Could not fetch attendance count data");
    }
  },

  // Function to get enriched member details
  async getMemberSummary(
    startDate: string,
    endDate: string
  ): Promise<{
    enrichedData: EnrichedMemberData[];
    topAttendance: { memberName: string; attendanceRatio: string };
    topStatusUpdate: { memberName: string; statusRatio: string };
  }> {
    try {
      const [
        memberResponse,
        statusStreakResponse,
        projectsResponse,
        attendanceSummaryResponse,
      ] = await Promise.all([
        client.query<{ getMember: MemberDetails[] }>({
          query: GET_MEMBERS_QUERY,
        }),
        client.query<{
          getUpdateStreak: { id: string; streak: number; maxStreak: number }[];
        }>({
          query: GET_STATUS_STREAK_QUERY,
        }),
        client.query<{
          getProjects: { memberId: string; projectTitle: string }[];
        }>({
          query: GET_PROJECTS_QUERY,
        }),
        client.query<{
          getAttendanceSummary: {
            memberAttendance: { id: string; presentDays: number }[];
            maxDays: number;
          };
        }>({
          query: GET_ATTENDANCE_SUMMARY_QUERY,
          variables: { startDate, endDate },
        }),
      ]);

      const members = memberResponse.data.getMember;
      const statusStreaks = statusStreakResponse.data.getUpdateStreak;
      const projects = projectsResponse.data.getProjects;
      const attendanceSummary =
        attendanceSummaryResponse.data.getAttendanceSummary;

      const maxDays = attendanceSummary.maxDays;
      const memberAttendance = attendanceSummary.memberAttendance;

      const statusMap = new Map(
        statusStreaks.map((item) => [
          item.id,
          { streak: item.streak, maxStreak: item.maxStreak },
        ])
      );

      const projectMap = new Map<string, string[]>();
      projects.forEach((project) => {
        if (!projectMap.has(project.memberId)) {
          projectMap.set(project.memberId, []);
        }
        projectMap.get(project.memberId)?.push(project.projectTitle);
      });

      const attendanceMap = new Map(
        memberAttendance.map((item) => [item.id, item.presentDays])
      );

      let maxAttendanceRatio = 0;
      let maxAttendanceMembers: string[] = [];
      let maxStatusRatio = 0;
      let maxStatusMembers: string[] = [];

      // Enrich member data
      const enrichedData: EnrichedMemberData[] = members.map((member) => {
        const presentDays = attendanceMap.get(member.id) || 0;
        const attendanceRatio = presentDays / maxDays;

        if (attendanceRatio > maxAttendanceRatio) {
          maxAttendanceRatio = attendanceRatio;
          maxAttendanceMembers = [member.name];
        } else if (attendanceRatio === maxAttendanceRatio) {
          maxAttendanceMembers.push(member.name);
        }

        const status = statusMap.get(member.id) || { streak: 0, maxStreak: 0 };
        const statusRatio = status.streak / (status.maxStreak || 1);

        if (statusRatio > maxStatusRatio) {
          maxStatusRatio = statusRatio;
          maxStatusMembers = [member.name];
        } else if (statusRatio === maxStatusRatio) {
          maxStatusMembers.push(member.name);
        }

        return {
          id: member.id,
          name: member.name,
          year: member.year,
          statusStreak: status.streak,
          maxStatusStreak: status.maxStreak,
          projects: projectMap.get(member.id) || ["Unknown"],
          attendanceStreak: presentDays,
          attendanceMonth: `${presentDays}/${maxDays}`,
        };
      });

      return {
        enrichedData,
        topAttendance: {
          memberName:
            maxAttendanceMembers.length > 1
              ? "a lot of people"
              : maxAttendanceMembers[0] || "Unknown",
          attendanceRatio: `${Math.round(maxAttendanceRatio * 100)}%`,
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
};
