"use client";
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { GetProfileService } from '@/services/profile-services';
import { MemberProfileDetails } from '@/types/types';
import toast from 'react-hot-toast';


type EditProfileProps = {
  onCancel: () => void;
}

export default function EditProfileComponent({ onCancel }: EditProfileProps) {
  const router = useRouter();

  const [profileData, setProfileData] = useState<MemberProfileDetails>({
    memberId:0,
    name: "",
    rollNo: "",
    sex: "",
    track: "",
    email: "",
    hostel: '',
    discordId: '',
    macAddress: '',
  });
  const tracks = ['Web', 'Systems', 'AI', 'Mobile'];


  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [GenToggle, setGenToggle] = useState([false, false]);
  const [previewUrl, setPreviewUrl] = useState<string>("/placeholder.webp");
  const [isUserEnrolling, setUserEnrolling] = useState(true);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setProfileData({
      ...profileData,
      [name]: value
    });
  };

  useEffect(()=>{
    async function getProfileDetails() {
      const member = await GetProfileService.getProfileDetails();
      setGenToggle([member?.sex == "M",member?.sex == "F"]);
     if(member){
        setProfileData(member);
        setIsLoading(false);
     }
     else console.log("Error Fetching User Data!");
    }
    getProfileDetails();
  },[])

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
    async function Update() {
      let data = await GetProfileService.UpdateProfileDetails(profileData);
      if(data){
        setProfileData(data);
        handleCancel();
      }
      else{
        console.log("Error in Updating User");
      }
      setIsSubmitting(false);
    }
    Update();
  };

  const handleCancel = () => {
    if (onCancel) {
      onCancel();
    } else {
      // Always navigate to the main profile route
      router.push('/profile');
    }
  };

  const trackUi: JSX.Element[] = tracks.map((track) => (
    <option key={track} value={track}>
      {track}
    </option>
  ));

  if(!isLoading){
      return (
    <div className="container mx-auto px-4 py-8">
      {isUserEnrolling ? (
      <h1 className="text-2xl font-bold text-white mb-2">SetUp Profile</h1>
      ) : (
      <h1 className="text-2xl font-bold text-white mb-2">Update Profile</h1>
      )}
      <hr />
      <form onSubmit={handleSubmit}>
      <div className="bg-panelColor rounded-lg mt-6 shadow-md p-6">
        <h1 className="text-2xl font-bold text-white mb-6">Personal Details</h1>
        <div className="flex flex-col md:flex-row gap-6 mb-6">
        <div className="flex-shrink-0">
          <div className="relative">
          <img
            src={previewUrl}
            alt={profileData.name}
            className={`w-32 h-32 rounded-full object-cover border-2 border-primaryYellow`}
          />
          <label
            htmlFor="profileImage"
            className={`absolute bottom-0 right-0 bg-primaryYellow p-2 rounded-full cursor-pointer`}
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
            disabled={!isUserEnrolling}
            value={profileData.name}
            onChange={handleChange}
            className={`w-full px-3 py-2 bg-bgMainColor text-white border border-gray-700 rounded-md focus:outline-none focus:border-primaryYellow ${!isUserEnrolling ? 'opacity-50 cursor-not-allowed' : ''}`}
            />
          </div>
          <div>
            <label className="block text-gray-400 text-sm mb-1">Gender</label>
            <div className="grid grid-cols-2  gap-3 mt-2 w-full">
            {['Male', 'Female'].map((label, idx) => (
              <button
              key={label}
              type="button"
              disabled={!isUserEnrolling}
              className={`w-full px-4 py-2 h-10 rounded-full transition-colors border border-gray-700 font-semibold truncate
              ${GenToggle[idx] ? 'bg-primaryYellow text-black shadow-lg' : 'bg-bgMainColor text-white hover:bg-gray-800'}
              ${!isUserEnrolling ? 'opacity-50 cursor-not-allowed' : ''}
              `}
              onClick={() => {
                setGenToggle([idx === 0, idx === 1]);
                setProfileData({ ...profileData, sex: label == 'Male' ? 'M' : 'F' });
              }}
              >
              {label}
              </button>
            ))}
          </div>
          </div>
          <div>
            <label className="block text-gray-400 text-sm mb-1">Track</label>
            <select
            name="track"
            value={profileData.track}
            onChange={(e) => setProfileData({ ...profileData, track: e.target.value })}
            disabled={!isUserEnrolling}
            className={`w-full px-3 py-2 bg-bgMainColor text-white border border-gray-700 rounded-md focus:outline-none focus:border-primaryYellow ${!isUserEnrolling ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
            {trackUi}
            </select>
          </div>
          <div>
            <label className="block text-gray-400 text-sm mb-1">Roll Number</label>
            <input
            type="text"
            disabled={!isUserEnrolling}
            name="rollNo"
            value={profileData.rollNo}
            onChange={handleChange}
            className={`w-full px-3 py-2 bg-bgMainColor text-white border border-gray-700 rounded-md focus:outline-none focus:border-primaryYellow ${!isUserEnrolling ? 'opacity-50 cursor-not-allowed' : ''}`}
            />
          </div>
          </div>
        </div>
        </div>
      </div>

        <div className="bg-panelColor rounded-lg lg:mt-16 sm:mt-8 shadow-md p-6">
          <h1 className="text-2xl font-bold text-white mb-6">Additional Details</h1>
          <div className="flex flex-col md:flex-row gap-6 mb-6">
            <div className="flex-grow">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-gray-400 text-sm mb-1">Hostel</label>
                  <input
                    type="text"
                    name="hostel"
                    value={profileData.hostel}
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
                <div>
                  <label className="block text-gray-400 text-sm mb-1">Discord Id</label>
                  <input
                    type="text"
                    name="discordId"
                    value={profileData.discordId}
                    onChange={handleChange}
                    className="w-full px-3 py-2 bg-bgMainColor text-white border border-gray-700 rounded-md focus:outline-none focus:border-primaryYellow"
                  />
                </div>
                <div>
                  <label className="block text-gray-400 text-sm mb-1">Mac Address</label>
                  <input
                    type="text"
                    name="macAddress"
                    value={profileData.macAddress}
                    onChange={handleChange}
                    className="w-full px-3 py-2 bg-bgMainColor text-white border border-gray-700 rounded-md focus:outline-none focus:border-primaryYellow"
                  />
                </div>
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
        </div>
      </form>

    </div>
  );
  }else{
    return(
      <div className="flex items-center justify-center w-full min-h-screen">
        <h1 className="text-white text-lg font-medium">Loading...</h1>
      </div>
    )
  }

}
