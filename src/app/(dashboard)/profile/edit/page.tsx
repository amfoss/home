"use client";
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { GetProfileService } from '@/services/profile-services';
import { MemberProfileDetails } from '@/types/types';
import toast from 'react-hot-toast';
import { ArrowLeft } from 'lucide-react';

export default function EditProfilePage() {
  const router = useRouter();

  const [profileData, setProfileData] = useState<MemberProfileDetails>({
    memberId: 0,
    role: '',
    createdAt: '',
    groupId: 1,
    githubUser: "",
    year: 1,
    name: "",
    rollNo: "",
    sex: "",
    track: "",
    email: "",
    hostel: '',
    discordId: '',
    macAddress: '',
  });

  const tracks = ['Web', 'Systems', 'AI', 'Mobile', 'Inductee'];

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [GenToggle, setGenToggle] = useState([false, false]);
  const [previewUrl, setPreviewUrl] = useState<string>("/placeholder.webp");
  const [isUserEnrolling, setUserEnrolling] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setProfileData({
      ...profileData,
      [name]: value
    });
  };

  useEffect(() => {
    async function getProfileDetails() {
      try {
        const member = await GetProfileService.getProfileDetails();
        if (member) {
          setProfileData(member);
          GetProfileService.HandleProfileImage(member).then((url) => {
            if (url != "") setPreviewUrl(url);
          }).catch(() => { });

          if (!member.rollNo) {
            setUserEnrolling(true);
          } else {
            setGenToggle([member?.sex == "M", member?.sex == "F"]);
          }
        } else {
          setUserEnrolling(true);
          toast.success("Setting up your profile for the first time");
        }
      } catch {
        toast.error("Failed to load profile data");
      } finally {
        setIsLoading(false);
      }
    }
    getProfileDetails();
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    const data = await GetProfileService.UpdateProfileDetails(profileData);
    if (data) {
      setProfileData(data);
      toast.success("Profile updated successfully");
      router.push('/profile');
    }
    else {
      toast.error("Error in Updating User");
    }
    setIsSubmitting(false);
  };

  const handleCancel = () => {
    router.push('/profile');
  };

  const trackUi: JSX.Element[] = tracks.map((track) => (
    <option key={track} value={track}>
      {track}
    </option>
  ));

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] text-white p-8">
        <div className="h-8 bg-gray-700 rounded w-48 mb-4 shimmer"></div>
        <hr className="mb-6" />

        <div className="bg-panelColor rounded-lg shadow-md p-6 mb-6">
          <div className="h-8 bg-gray-700 rounded w-56 mb-6 shimmer"></div>

          <div className="flex flex-col md:flex-row gap-6 mb-6">
            <div className="flex-shrink-0">
              <div className="w-32 h-32 bg-gray-700 rounded-full shimmer"></div>
            </div>

            <div className="flex-grow">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[1, 2, 3, 4, 5, 6].map((item) => (
                  <div key={item}>
                    <div className="h-4 bg-gray-700 rounded w-24 mb-2 shimmer"></div>
                    <div className="h-10 bg-gray-700 rounded w-full shimmer"></div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="bg-panelColor rounded-lg shadow-md p-6">
          <div className="h-8 bg-gray-700 rounded w-56 mb-6 shimmer"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            {[1, 2, 3, 4].map((item) => (
              <div key={item}>
                <div className="h-4 bg-gray-700 rounded w-24 mb-2 shimmer"></div>
                <div className="h-10 bg-gray-700 rounded w-full shimmer"></div>
              </div>
            ))}
          </div>

          <div className="flex justify-end space-x-4">
            <div className="h-10 bg-gray-700 rounded w-24 shimmer"></div>
            <div className="h-10 bg-gray-700 rounded w-32 shimmer"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white p-8">
      <div className="mb-8 flex items-center gap-4 border-b border-gray-800 pb-4">
        <button
          onClick={handleCancel}
          className="text-white hover:text-gray-300 transition-colors"
        >
          <ArrowLeft size={24} />
        </button>
        {isUserEnrolling ? (
          <h1 className="text-2xl font-light">Setup Profile</h1>
        ) : (
          <h1 className="text-2xl font-light">Edit Profile</h1>
        )}
      </div>

      <form onSubmit={handleSubmit}>
        <div className="bg-panelColor rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-xl font-semibold text-white mb-6">Personal Details</h2>
          <div className="flex flex-col md:flex-row gap-6 mb-6">
            <div className="flex-shrink-0">
              <div className="relative">
                <Image
                  src={previewUrl}
                  alt={profileData.name || 'Profile picture'}
                  width={128}
                  height={128}
                  className="rounded-full object-cover border-2 border-primaryYellow"
                />
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
                <div className='flex w-full justify-evenly'>
                  <div className='w-full'>
                    <label className="block text-gray-400 text-sm mb-1">Year</label>
                    <button
                      type="button"
                      disabled={!isUserEnrolling}
                      className={`px-4 w-full py-2 h-10  bg-bgMainColor hover:bg-primaryYellow hover:text-black rounded-md transition-colors border border-gray-700 font-semibold 
              ${!isUserEnrolling ? 'opacity-50 cursor-not-allowed' : ''}`}
                      onClick={() => {
                        const nextYear = (profileData.year % 4) + 1;
                        setProfileData({ ...profileData, year: nextYear });
                      }}
                    >
                      {profileData.year === 1 ? '1st Year' : profileData.year === 2 ? '2nd Year' : profileData.year === 3 ? '3rd Year' : '4th Year'}
                    </button>
                  </div>
                  <div className='w-10'></div>
                  <div className='w-full'>
                    <label className="block text-gray-400 text-sm mb-1">Group</label>
                    <button
                      type="button"
                      disabled={!isUserEnrolling}
                      className={`px-4 py-2 w-full h-10 bg-bgMainColor hover:bg-primaryYellow hover:text-black rounded-md transition-colors border border-gray-700 font-semibold 
              ${!isUserEnrolling ? 'opacity-50 cursor-not-allowed' : ''}`}
                      onClick={() => {
                        const nextGroup = (profileData.groupId % 4) + 1;
                        setProfileData({ ...profileData, groupId: nextGroup });
                      }}
                    >
                      {profileData.groupId === 1 ? 'Group 1' : profileData.groupId === 2 ? 'Group 2' : profileData.groupId === 3 ? 'Group 3' : 'Group 4'}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-panelColor rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold text-white mb-6">Additional Details</h2>
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
}
