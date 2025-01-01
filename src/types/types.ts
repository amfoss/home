// Type for the AttendanceDetails object returned by the query
export type AttendanceDetails = {
  id: string;
  timein: string;
  timeout: string;
  isPresent: boolean;
  date: string;
  memberName: string;
  year: string;
};

// Type for the Member object
export type Member = {
  id: string;
  name: string;
  year: string;
};

// Type for the Attendance object
export type Attendance = {
  id: number;
  date: string;
  timeIn: string;
  timeOut: string;
};

// Type for the GraphQL Query response for attendance details
export type GetAttendanceDetailsQueryResponse = {
  getAttendance: AttendanceDetails[];
};

export type GetMemberDetailsQueryResponse = {
  getMember: Member[];
};
// Represents the basic details of a member
export interface MemberDetails {
  id: string; // Unique identifier for the member
  name: string; // Name of the member
  year: string; // Year associated with the member (e.g., "Senior", "Junior")
}

// Represents enriched data for each member
export interface EnrichedMemberData extends MemberDetails {
  statusStreak: number; // Current status streak of the member
  maxStatusStreak: number; // Maximum status streak achieved by the member
  projects: string[]; // List of project titles associated with the member
  attendanceStreak: number; // Attendance streak for a given period
  attendanceMonth: string; // Month for which the attendance streak applies
}
