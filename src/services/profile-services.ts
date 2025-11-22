"use client";
import client from "@/lib/apollo-client";
import { gql, ApolloError } from "@apollo/client";
import toast from "react-hot-toast";
import { MemberProfileDetails } from "@/types/types";

const GET_PROFILE_DETAILS = gql`
  query getuser {
    me {
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
    updateMe(input: $member) {
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
  me: MemberProfileDetails;
};

type MemberUpdateResponse = {
  updateMe: MemberProfileDetails;
};

function cleanInput(obj: any) {
  const cleaned: any = {};
  Object.keys(obj).forEach((key) => {
    if (key !== "__typename") cleaned[key] = obj[key];
  });
  return cleaned;
}

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
    try {
      const response = await client.query<MemberResponse>({
        query: GET_PROFILE_DETAILS,
        fetchPolicy: "no-cache",
      });
      return response.data.me;
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
      console.log("Error has Occurred while fetching image:", e);
      return "";
    }
  },

  async UpdateProfileDetails(
    member: MemberProfileDetails
  ): Promise<MemberProfileDetails | null> {
    const { memberId, role, createdAt, ...updateData } = member;
    const cleanedMember = cleanInput({ ...updateData });
    try {
      const response = await client.mutate<MemberUpdateResponse>({
        mutation: UPDATE_PROFILE_QUERY,
        variables: { member: cleanedMember },
      });
      return response.data ? response.data.updateMe : null;
    } catch (error) {
      handleApolloError(error, "UpdateProfileDetails");
      return null;
    }
  },
};
