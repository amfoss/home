"use client";
import { useSelectedButton } from '@/context/SelectedButtonContext';
import AttendancePage from './attendance';
import LeaderboardPage from './cp-leaderboard';
import Dashboard from './dashboard';
const DashboardPage = () => {
    const { selectedButton } = useSelectedButton();

    return (
        <div className='bg-bgMainColor w-full min-h-full '>
            {selectedButton === "dashboard" && <Dashboard />}
            {selectedButton === "attendance" && <AttendancePage />}
            {selectedButton === "leaderboard" && <LeaderboardPage />}
        </div>
    );
};

export default DashboardPage;