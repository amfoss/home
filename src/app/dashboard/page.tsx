"use client";
import { useSelectedButton } from '@/context/SelectedButtonContext';
import AttendancePage from './attendance';
import LeaderboardPage from './cp-leaderboard';
import ProfilePage from './profile';
const DashboardPage = () => {
    const { selectedButton } = useSelectedButton();

    return (
        <div className='bg-bgMainColor w-full min-h-full'>
            {selectedButton === "attendance" && <AttendancePage />}
            {selectedButton === "leaderboard" && <LeaderboardPage />}
            {selectedButton === "profile" && <ProfilePage />}
        </div>
    );
};

export default DashboardPage;
