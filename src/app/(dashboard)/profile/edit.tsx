"use client";
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

interface ProfileData {
  name: string;
  email: string;
  username: string;
  bio: string;
  profileImage: string;
}

export default function EditProfile() {
  const router = useRouter();
  
  const [profileData, setProfileData] = useState<ProfileData>({
    name: "John Doe",
    email: "johndoe@example.com",
    username: "johndoe",
    bio: "just a random code to have a profile structure to later code on",
    profileImage: "/placeholder.webp"
  });

  const [isUploading, setIsUploading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setProfileData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      // In a real app, you would handle file upload to your server/storage
      setIsUploading(true);
      // Mock file upload delay
      setTimeout(() => {
        // Only create object URL on the client side
        if (typeof window !== 'undefined') {
          setProfileData(prev => ({
            ...prev,
            profileImage: URL.createObjectURL(e.target.files![0])
          }));
        }
        setIsUploading(false);
      }, 1000);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, you would send the updated data to your API
    console.log("Updated profile data:", profileData);
    
    // Simulate API call
    setTimeout(() => {
      // Navigate back to view profile after "saving"
      router.push('/profile');
    }, 1000);
  };

  const handleCancel = () => {
    router.push('/profile');
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="bg-panelColor rounded-lg shadow-md p-6 mb-6">
        <h1 className="text-2xl font-bold text-white mb-6">Edit Profile</h1>
        
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col md:flex-row gap-6 mb-6">
            {/* Profile Image Upload */}
            <div className="flex-shrink-0">
              <div className="relative w-32 h-32">
                <img 
                  src={profileData.profileImage} 
                  alt={profileData.name} 
                  className="w-32 h-32 rounded-full object-cover border-2 border-primaryYellow"
                />
                <label 
                  htmlFor="profileImage" 
                  className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 rounded-full cursor-pointer hover:bg-opacity-70 transition-opacity"
                >
                  {isUploading ? (
                    <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primaryYellow"></div>
                  ) : (
                    <span className="text-xs text-white text-center">Change Photo</span>
                  )}
                </label>
                <input 
                  type="file" 
                  id="profileImage" 
                  name="profileImage" 
                  accept="image/*" 
                  className="hidden"
                  onChange={handleFileChange}
                  disabled={isUploading}
                />
              </div>
            </div>
            
            {/* Profile Details Form */}
            <div className="flex-grow">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="name" className="block text-gray-400 text-sm mb-1">Name</label>
                  <input 
                    type="text" 
                    id="name" 
                    name="name" 
                    value={profileData.name} 
                    onChange={handleChange}
                    className="w-full bg-panelButtonColor text-white border border-gray-700 rounded-md py-2 px-3 focus:outline-none focus:border-primaryYellow"
                  />
                </div>
                <div>
                  <label htmlFor="username" className="block text-gray-400 text-sm mb-1">Username</label>
                  <input 
                    type="text" 
                    id="username" 
                    name="username" 
                    value={profileData.username} 
                    onChange={handleChange}
                    className="w-full bg-panelButtonColor text-white border border-gray-700 rounded-md py-2 px-3 focus:outline-none focus:border-primaryYellow"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-gray-400 text-sm mb-1">Email</label>
                  <input 
                    type="email" 
                    id="email" 
                    name="email" 
                    value={profileData.email} 
                    onChange={handleChange}
                    className="w-full bg-panelButtonColor text-white border border-gray-700 rounded-md py-2 px-3 focus:outline-none focus:border-primaryYellow"
                  />
                </div>
              </div>
              
              <div className="mt-4">
                <label htmlFor="bio" className="block text-gray-400 text-sm mb-1">Bio</label>
                <textarea 
                  id="bio" 
                  name="bio" 
                  value={profileData.bio} 
                  onChange={handleChange}
                  rows={3}
                  className="w-full bg-panelButtonColor text-white border border-gray-700 rounded-md py-2 px-3 focus:outline-none focus:border-primaryYellow"
                ></textarea>
              </div>
            </div>
          </div>
          
          <div className="flex justify-end space-x-4">
            <button 
              type="button" 
              onClick={handleCancel}
              className="px-4 py-2 border border-gray-600 text-white rounded-md hover:bg-gray-800 transition-colors"
            >
              Cancel
            </button>
            <button 
              type="submit" 
              className="px-4 py-2 bg-primaryYellow text-black rounded-md hover:bg-opacity-90 transition-colors"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
