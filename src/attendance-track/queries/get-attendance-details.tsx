import { gql } from '@apollo/client';

// GraphQL query to fetch attendance details by date
const GET_ATTENDANCE_DETAILS_QUERY = gql`
  query GetAttendanceDetails($date: String!) {
    getAttendanceDetails(date: $date) {
      memberName
      year
      timeIn
      timeOut
      date
    }
  }
`;
