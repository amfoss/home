// Type for the AttendanceDetails object returned by the query
export type AttendanceDetails = {
    memberName: string;
    year: number;
    timeIn: string;
    timeOut: string;
    date: string;
  };
  
  // Type for the Member object
  export type Member = {
    id: number;
    name: string;
    year: number;
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
    getAttendanceDetails: AttendanceDetails[];
  };
  