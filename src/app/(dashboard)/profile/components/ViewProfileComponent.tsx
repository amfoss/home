"use client";
import React, { useEffect, useState } from 'react';
import { GetProfileService } from '@/services/profile-services';
import { MemberProfileDetails } from '@/types/types';

type ViewProfileProps = {
  onEdit: () => void;
}

export default function ViewProfileComponent({ onEdit }: ViewProfileProps) {
  const [profileData, setProfileData] = useState<MemberProfileDetails>({
    memberId:0,
    groupId:1,
    githubUser:"",
    year:1,
    name: "",
    role: "",
    rollNo: "",
    sex: "",
    track: "",
    email: "",
    hostel: '',
    discordId: '',
    macAddress: '',
    createdAt: '',
  });
  const [previewUrl, setPreviewUrl] = useState<string>("/placeholder.webp");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(()=>{
    async function getProfileDetails() {
      const member = await GetProfileService.getProfileDetails();
     if(member){
        setProfileData(member);
        const url = await GetProfileService.HandleProfileImage(member);
        if(url != "") setPreviewUrl(url);
        setIsLoading(false);
     }
     else {
      setIsLoading(false);
     }
    }
    getProfileDetails();
  },[])

 if (!isLoading) { return (
    <div className="container mx-auto px-4 py-8">
      <div className="bg-panelColor rounded-lg shadow-md p-6 mb-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-white">Profile Details</h1>
        </div>
        
        <div className="flex flex-col md:flex-row gap-6">
          <div className="flex-shrink-0">
            <img 
              src={previewUrl} 
              alt={profileData.name} 
              className="w-32 h-32 rounded-full object-cover border-2 border-primaryYellow"
            />
          </div>
          
          <div className="flex-grow">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-gray-400 text-sm">Name</p>
                <p className="text-white text-lg">{profileData.name}</p>
              </div>
              <div>
                <p className="text-gray-400 text-sm">Username</p>
                <p className="text-white text-lg">{profileData.name}</p>
              </div>
              <div>
                <p className="text-gray-400 text-sm">Email</p>
                <p className="text-white text-lg">{profileData.email}</p>
              </div>
              <div>
                <p className="text-gray-400 text-sm">Role</p>
                <p className="text-white text-lg">{profileData.role.toLowerCase()}</p>
              </div>
              <div>
                <p className="text-gray-400 text-sm">Member Since</p>
                <p className="text-white text-lg">
                  <p className="text-white text-lg">
                    {new Date(profileData.createdAt).toLocaleString("en-US", { month: "short" }) +
                      ", " +
                      new Date(profileData.createdAt).getFullYear()}
                  </p>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="bg-panelColor rounded-lg shadow-md p-6 mb-6">
        <h2 className="text-xl font-semibold text-white mb-4">Stats</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-panelButtonColor p-4 rounded-lg">
            <p className="text-gray-400 text-sm">Attendance Rate</p>
            <p className="text-primaryYellow text-xl font-bold">85%</p>
          </div>
          <div className="bg-panelButtonColor p-4 rounded-lg">
            <p className="text-gray-400 text-sm">CP Score</p>
            <p className="text-primaryYellow text-xl font-bold">750</p>
          </div>
          <div className="bg-panelButtonColor p-4 rounded-lg">
            <p className="text-gray-400 text-sm">Contributions</p>
            <p className="text-primaryYellow text-xl font-bold">24</p>
          </div>
        </div>
      </div>
      
      {/* Add Edit button */}
      <div className="mt-6 flex justify-end">
        <button 
          onClick={() => {
            if (onEdit) {
              onEdit();
            } else {
              // If onEdit is not provided, use direct navigation to main route with query param
              // This should only happen when the component is used directly in a route
              window.location.href = '/profile?mode=edit';
            }
          }}
          className="bg-primaryYellow hover:bg-yellow-600 text-black font-bold py-2 px-4 rounded"
        >
          Edit Profile
        </button>
      </div>
    </div>
  );
}else {
    return(
      <div className="flex items-center justify-center w-full min-h-screen">
        <h1 className="text-white text-lg font-medium">Loading...</h1>
      </div>
    )
  }
}
