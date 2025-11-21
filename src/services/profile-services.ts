"use client";
import client from "@/lib/apollo-client";
import { gql, ApolloError } from "@apollo/client";
import toast from "react-hot-toast";
import { MemberProfileDetails } from "@/types/types";

const GET_PROFILE_DETAILS = gql`
  query getuser($id: Int) {
    member(memberId: $id) {
      memberId
      name
      track
      year
      role
      groupId
      sex
      githubUser
      rollNo
      hostel
      email
      discordId
      macAddress
      createdAt
    }
  }
`;

const UPDATE_PROFILE_QUERY = gql`
  mutation ($member: UpdateMemberInput!) {
    updateMember(input: $member) {
      memberId
      name
      track
      year
      groupId
      sex
      rollNo
      hostel
      email
      githubUser
      discordId
      macAddress
    }
  }
`;

type MemberResponse = {
  member: MemberProfileDetails;
};

type MemberUpdateResponse = {
  updateMember: MemberProfileDetails;
};

function cleanInput(obj: any) {
  const cleaned: any = {};
  Object.keys(obj).forEach((key) => {
    if (key !== "__typename") cleaned[key] = obj[key];
  });
  return cleaned;
}

// Temporary until auth integration
const test_user = 1;

function handleApolloError(error: unknown, context: string) {
  if (error instanceof ApolloError) {
    if (error.graphQLErrors.length > 0) {
      const gqlMessage = error.graphQLErrors.map((e) => e.message).join(", ");
      console.error(`[GraphQL Error] (${context}):`, gqlMessage);
      toast.error(`GraphQL Error: ${gqlMessage}`);
    }
    if (error.networkError) {
      console.error(`[Network Error] (${context}):`, error.networkError);
      toast.error("Network error. Please check your internet connection.");
    }
  } else {
    console.error(`[Unknown Error] (${context}):`, error);
    toast.error("An unexpected error occurred.");
  }
}

export const GetProfileService = {
  async getProfileDetails(): Promise<MemberProfileDetails | null> {
    if (test_user == null) return null;
    try {
      const response = await client.query<MemberResponse>({
        query: GET_PROFILE_DETAILS,
        variables: { id: test_user },
        fetchPolicy: "no-cache",
      });
      return response.data.member;
    } catch (error) {
      handleApolloError(error, "getProfileDetails");
      return null;
    }
  },
  async HandleProfileImage(member: MemberProfileDetails): Promise<string> {
    type githubRes = {
      avatar_url: string;
    };
    if (!member.githubUser || member?.githubUser != "") return "";
    try {
      const response = await fetch(
        "https://api.github.com/users/" + member.githubUser,
      );
      if (response.ok) {
        const data: githubRes = await response.json();
        return data.avatar_url;
      } else {
        console.log("Error fetching Profile Image!" + response.status);
        return "";
      }
    } catch (e) {
      console.log("Error has Occured while fetching image:", e);
      return "";
    }
  },

  async UpdateProfileDetails(
    member: MemberProfileDetails,
  ): Promise<MemberProfileDetails | null> {
    const cleanedMember = cleanInput({ ...member, memberId: test_user });
    try {
      const response = await client.mutate<MemberUpdateResponse>({
        mutation: UPDATE_PROFILE_QUERY,
        variables: { member: cleanedMember },
      });
      return response.data ? response.data.updateMember : null;
    } catch (error) {
      handleApolloError(error, "UpdateProfileDetails");
      return null;
    }
  },
};
