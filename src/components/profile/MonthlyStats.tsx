"use client";
import { ChevronLeft, ChevronRight, ChartLine } from 'lucide-react';

export type MonthlyStatsProps = {
    selectedMonthOffset: number;
    onMonthChange: (offset: number) => void;
    stats: {
        presentDays: number;
        absentDays: number;
        statusUpdates: number;
        attendanceRate: number;
        statusPercent: number;
        daysToConsider: number;
    } | null;
    loading?: boolean;
};

export const MonthlyStats = ({
    selectedMonthOffset,
    onMonthChange,
    stats,
    loading = false
}: MonthlyStatsProps) => {
    const currentMonthName = (() => {
        const date = new Date();
        date.setMonth(date.getMonth() + selectedMonthOffset);
        return date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
    })();

    return (
        <div className="bg-[#1a1a1a] flex flex-col lg:flex-row gap-4 rounded-lg p-6">
            <div className="flex items-center flex-row lg:flex-col justify-between">
                <div className="flex items-center gap-2">
                    <ChartLine />
                    <h3 className="text-xl font-semibold">{currentMonthName}</h3>
                </div>
                <div className="flex items-center gap-2">
                    <button
                        onClick={() => onMonthChange(selectedMonthOffset - 1)}
                        className="p-2 hover:bg-[#2a2a2a] rounded-lg transition-colors"
                        title="Previous month"
                    >
                        <ChevronLeft />
                    </button>
                    <button
                        onClick={() => onMonthChange(selectedMonthOffset + 1)}
                        disabled={selectedMonthOffset >= 0}
                        className="p-2 hover:bg-[#2a2a2a] rounded-lg transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                        title="Next month"
                    >
                        <ChevronRight />
                    </button>
                </div>
            </div>

            {loading || !stats ? (
                <div className="flex-1 flex items-center justify-center">
                    <div className="flex flex-col items-center gap-4">
                        <div className="w-12 h-12 border-4 border-gray-600 border-t-[#EBB500] rounded-full animate-spin"></div>
                        <div className="text-gray-500 text-sm">Loading stats...</div>
                    </div>
                </div>
            ) : (
                <div className="flex flex-1 flex-wrap justify-around gap-4 sm:gap-2">
                    <div className="text-center gap-1 flex flex-col items-center min-w-[120px]">
                        <div className={`text-2xl sm:text-3xl font-bold ${stats.absentDays <= 5 ? 'text-green-500' :
                                stats.absentDays <= 10 ? 'text-yellow-500' :
                                    'text-red-500'
                            }`}>
                            {stats.presentDays}
                        </div>
                        <div className="text-xs sm:text-sm text-gray-400">Days Present</div>
                    </div>

                    <div className="text-center gap-1 flex flex-col items-center min-w-[120px]">
                        <div className={`text-2xl sm:text-3xl font-bold ${stats.statusPercent >= 90 ? 'text-green-500' :
                                stats.statusPercent >= 40 ? 'text-yellow-500' :
                                    'text-red-500'
                            }`}>
                            {stats.statusUpdates}
                        </div>
                        <div className="text-xs sm:text-sm text-gray-400">Status Updates</div>
                    </div>

                    <div className="text-center gap-1 flex flex-col items-center min-w-[120px]">
                        <div className={`text-2xl sm:text-3xl font-bold ${stats.absentDays <= 5 ? 'text-green-500' :
                                stats.absentDays <= 10 ? 'text-yellow-500' :
                                    'text-red-500'
                            }`}>
                            {stats.attendanceRate}%
                        </div>
                        <div className="text-xs sm:text-sm text-gray-400">Attendance Rate</div>
                    </div>

                    <div className="text-center gap-1 flex flex-col items-center min-w-[120px]">
                        <div className={`text-2xl sm:text-3xl font-bold ${stats.statusPercent >= 90 ? 'text-green-500' :
                                stats.statusPercent >= 40 ? 'text-yellow-500' :
                                    'text-red-500'
                            }`}>
                            {stats.statusPercent}%
                        </div>
                        <div className="text-xs sm:text-sm text-gray-400">Status Rate</div>
                    </div>
                </div>
            )}
        </div>
    );
};
