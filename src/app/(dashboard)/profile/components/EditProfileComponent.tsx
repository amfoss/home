"use client";
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

type ProfileData = {
  name: string;
  email: string;
  username: string;
  bio: string;
  profileImage: string;
}

type EditProfileProps = {
  onCancel: () => void;
}

export default function EditProfileComponent({ onCancel }: EditProfileProps) {
  const router = useRouter();
  
  const [profileData, setProfileData] = useState<ProfileData>({
    name: "John Doe",
    email: "johndoe@example.com",
    username: "johndoe",
    bio: "just a random code to have a profile structure to later code on",
    profileImage: "/placeholder.webp"
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string>(profileData.profileImage);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setProfileData({
      ...profileData,
      [name]: value
    });
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const fileUrl = URL.createObjectURL(file);
      setPreviewUrl(fileUrl);
      
      // You would typically upload the image to your server here
      // and then update the profileData with the returned URL
      // For this demo, we'll just update the preview
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      // Always redirect back to the main profile page after successful update
      router.push('/profile');
    }, 1000);
  };

  const handleCancel = () => {
    if (onCancel) {
      onCancel();
    } else {
      // Always navigate to the main profile route
      router.push('/profile');
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="bg-panelColor rounded-lg shadow-md p-6">
        <h1 className="text-2xl font-bold text-white mb-6">Edit Profile</h1>
        
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col md:flex-row gap-6 mb-6">
            <div className="flex-shrink-0">
              <div className="relative">
                <img 
                  src={previewUrl} 
                  alt={profileData.name} 
                  className="w-32 h-32 rounded-full object-cover border-2 border-primaryYellow"
                />
                <label 
                  htmlFor="profileImage"
                  className="absolute bottom-0 right-0 bg-primaryYellow p-2 rounded-full cursor-pointer"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                  </svg>
                  <input 
                    id="profileImage"
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="hidden"
                  />
                </label>
              </div>
            </div>
            
            <div className="flex-grow">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-gray-400 text-sm mb-1">Name</label>
                  <input 
                    type="text"
                    name="name"
                    value={profileData.name}
                    onChange={handleChange}
                    className="w-full px-3 py-2 bg-bgMainColor text-white border border-gray-700 rounded-md focus:outline-none focus:border-primaryYellow"
                  />
                </div>
                <div>
                  <label className="block text-gray-400 text-sm mb-1">Username</label>
                  <input 
                    type="text"
                    name="username"
                    value={profileData.username}
                    onChange={handleChange}
                    className="w-full px-3 py-2 bg-bgMainColor text-white border border-gray-700 rounded-md focus:outline-none focus:border-primaryYellow"
                  />
                </div>
                <div>
                  <label className="block text-gray-400 text-sm mb-1">Email</label>
                  <input 
                    type="email"
                    name="email"
                    value={profileData.email}
                    onChange={handleChange}
                    className="w-full px-3 py-2 bg-bgMainColor text-white border border-gray-700 rounded-md focus:outline-none focus:border-primaryYellow"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-gray-400 text-sm mb-1">Bio</label>
                <textarea 
                  name="bio"
                  value={profileData.bio}
                  onChange={handleChange}
                  rows={4}
                  className="w-full px-3 py-2 bg-bgMainColor text-white border border-gray-700 rounded-md focus:outline-none focus:border-primaryYellow"
                />
              </div>
            </div>
          </div>
          
          <div className="flex justify-end space-x-4">
            <button 
              onClick={handleCancel}
              type="button"
              className="px-4 py-2 border border-gray-600 text-white rounded-md hover:bg-gray-800 transition-colors"
            >
              Cancel
            </button>
            <button 
              type="submit" 
              className="px-4 py-2 bg-primaryYellow text-black rounded-md hover:bg-opacity-90 transition-colors"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
