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


export type AllMembersAttendanceResponse = {
  allMembers: Array<{
    name: string;
    year: number;
    attendance: {
      onDate: {
        timeIn: string | null;
        timeOut: string | null;
        isPresent: boolean;
      }
    }
  }>
}
export type GetMemberDetailsQueryResponse = {
  getMember: Member[];
};

// Represents the basic details of a member (aligned with dashboard.tsx)
export type MemberDetails = {
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

export type EnrichedMemberData = {
  id: string;
  name: string;
  year: string;
  statusStreak?: number;
  maxStatusStreak?: number;
  projects?: string[];

  attendanceRatio?: number;
  statusUpdateCountByDate?: number;
  presentCountByDate?: number;
  absentCountByDate?: number;
  attendanceMonth?: string;
}

export type AttendanceCountDetails = {
  id: string;
  name: string;
  presentCountByDate: number;
  absentCountByDate: number;
}

export type statusUpdateCountDetails = {
  id: string;
  name: string;  
  statusUpdateCountByDate: number;
  presentCountByDate: number;
  absentCountByDate: number;
}

export type MemberCountDetails = {
  id: string;
  name: string;
  year: string;
  presentCountByDate: number;
  absentCountByDate: number;
  statusUpdateCountByDate: number;
}

export type MemberProfileDetails = {
    memberId: number,
    year:number,
    name:string,
    track:string,
    groupId:number,
    role: string,
    sex: string,
    rollNo:string,
    hostel:string,
    githubUser:string,
    email:string,
    discordId:string,
    macAddress:string
    createdAt: string,
}



export type MemberCountQueryResult = {
  allMembers: {
    memberId: string;
    name: string;
    year: string;
    attendance: {
      presentCount: number;
      absentCount: number;
    };
    status: {
      updateCount: number;
    };
  }[];
}
