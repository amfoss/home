// Type for the AttendanceDetails object returned by the query
export type AttendanceDetails = {
  member: Member;
  timeIn: any;
  timeOut: any;
  isPresent: boolean;
};

// Type for the Member object
export type Member = {
  id?: string;
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
  [x: string]: any;
  getAttendance: AttendanceDetails[];
};

export type GetMemberDetailsQueryResponse = {
  getMember: Member[];
};

// Represents the basic details of a member (aligned with dashboard.tsx)
export interface MemberDetails {
  memberId: string; // Changed from id to memberId to match dashboard.tsx
  name: string;
  streak?: {
    maxStreak: number;
    currentStreak: number;
  };
  year?: string;
  email?: string;
  joinDate?: string;
  role?: string;
}

// Represents enriched data for each member (aligned with dashboard.tsx)
export interface EnrichedMemberData {
  id: string;
  name: string;
  year: string;
  statusStreak: number;
  maxStatusStreak: number;
  projects: string[];
}

export interface AttendanceCountDetails {
  id: string;
  name: string;
  presentCountByDate: number;
  absentCountByDate: number;
}

export interface statusUpdateCountDetails {
  id: string;
  name: string;  
  statusUpdateCountByDate: number;
}