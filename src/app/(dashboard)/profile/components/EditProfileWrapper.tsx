import { GetProfileService } from '@/services/profile-services';
import EditProfileComponent from './EditProfileComponent';

type EditProfileWrapperProps = {
  onCancel: () => void;
}

export default async function EditProfileWrapper({ onCancel }: EditProfileWrapperProps) {
  let initialProfileData = null;
  let isUserEnrolling = true;

  try {
    initialProfileData = await GetProfileService.getProfileDetails();
    if (initialProfileData) {
      isUserEnrolling = false; 
    }
  } catch (error) {
    console.error("Error fetching profile on server:", error);

  }

  return (
    <EditProfileComponent
      onCancel={onCancel}
      initialData={initialProfileData}
      initialEnrollingState={isUserEnrolling}
    />
  );
}
