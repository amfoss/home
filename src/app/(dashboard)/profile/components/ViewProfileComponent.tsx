"use client";
import React from 'react';

type ProfileData = {
  name: string;
  email: string;
  username: string;
  role: string;
  joinDate: string;
  profileImage: string;
  bio: string;
}

type ViewProfileProps = {
  onEdit: () => void;
}

export default function ViewProfileComponent({ onEdit }: ViewProfileProps) {
  // Mock profile data - replace with real data fetching
  const profileData: ProfileData = {
    name: "John Doe",
    email: "johndoe@example.com",
    username: "johndoe",
    role: "Member",
    joinDate: "Jan 2023",
    profileImage: "/placeholder.webp",
    bio: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nunc vel ultricies lacinia, nisl nisi aliquam nisl."
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="bg-panelColor rounded-lg shadow-md p-6 mb-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-white">Profile Details</h1>
        </div>
        
        <div className="flex flex-col md:flex-row gap-6">
          <div className="flex-shrink-0">
            <img 
              src={profileData.profileImage} 
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
                <p className="text-white text-lg">{profileData.username}</p>
              </div>
              <div>
                <p className="text-gray-400 text-sm">Email</p>
                <p className="text-white text-lg">{profileData.email}</p>
              </div>
              <div>
                <p className="text-gray-400 text-sm">Role</p>
                <p className="text-white text-lg">{profileData.role}</p>
              </div>
              <div>
                <p className="text-gray-400 text-sm">Member Since</p>
                <p className="text-white text-lg">{profileData.joinDate}</p>
              </div>
            </div>
            
            <div className="mt-4">
              <p className="text-gray-400 text-sm">Bio</p>
              <p className="text-white">{profileData.bio}</p>
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
}
