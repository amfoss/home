"use client";
import client from "@/lib/apollo-client";
import { gql } from "@apollo/client";
import toast from 'react-hot-toast'
import {
  MemberProfileDetails
} from "@/types/types";


const GET_PROFILE_DETAILS = gql`
  query getuser($id:Int){
    member(memberId:$id){
      memberId,
      name,
      track,
      sex,
      rollNo,
      hostel,
      email,
      discordId,
      macAddress
    }
  }
`;

const UPDATE_PROFILE_QUERY = gql`
mutation($member:UpdateMemberInput!){
  updateMember(input:$member){
      memberId,
      name,
      track,
      sex,
      rollNo,
      hostel,
      email,
      discordId,
      macAddress
  }
}`;

type memberResponse = {
  member: MemberProfileDetails;
}

type memberUpdateResponse = {
  updateMember: MemberProfileDetails;
}

function cleanInput(obj: any) {
  const cleaned: any = {};
  Object.keys(obj).forEach((key) => {
    if (key !== "__typename") cleaned[key] = obj[key];
  });
  return cleaned;
}

//For auth integration change this variable so it has memberId of logged in user
const test_user = 5331495;
//----------------------------------------


export const GetProfileService = {
  async getProfileDetails() : Promise<MemberProfileDetails| null>{
    try {
      const response = await client.query<memberResponse>({
        query: GET_PROFILE_DETAILS,
        variables: { id:test_user},
      });
      return response.data.member;
    } catch (error) {
      console.error("Error fetching attendance details:", error);
      toast.error("Failed to fetch attendance data");
      return null;
    }
  },


  async UpdateProfileDetails(member:MemberProfileDetails) : Promise<MemberProfileDetails | null>{
    const cleanedMember = cleanInput(member);
    member.memberId = test_user;
    try {
      const response = await client.mutate<memberUpdateResponse>({
        mutation: UPDATE_PROFILE_QUERY,
        variables: {member:cleanedMember},
      });
      return response.data ?  response.data?.updateMember : null;
    } catch (error) {
      console.error("Error fetching attendance details:", error);
      toast.error("Failed to fetch attendance data");
      return null;
    }
  },
};