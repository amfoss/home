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
}
