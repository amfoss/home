"use client";

export type HeatmapGridProps = {
    title: string;
    monthlyRecords: boolean[][];
    monthsToDisplay: number;
    colorClass: string;
    shape?: 'rounded' | 'rounded-full';
    loading?: boolean;
};

export const HeatmapGrid = ({
    title,
    monthlyRecords,
    monthsToDisplay,
    colorClass,
    shape = 'rounded',
    loading = false
}: HeatmapGridProps) => {
    const getMonthLabels = () => {
        const currentMonth = new Date().getMonth();
        const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

        const orderedMonths: string[] = [];
        for (let i = 0; i < monthsToDisplay; i++) {
            const monthIndex = (currentMonth - (monthsToDisplay - 1) + i + 12) % 12;
            orderedMonths.push(months[monthIndex]);
        }

        return orderedMonths;
    };

    if (loading) {
        return (
            <div className="w-full lg:w-auto lg:max-w-fit lg:m-auto overflow-x-auto">
                <h3 className="text-xl font-semibold mb-4">{title}</h3>
                <div className="bg-[#1a1a1a] rounded-lg p-6 w-auto">
                    <div className="flex items-center justify-center min-h-[200px]">
                        <div className="flex flex-col items-center gap-4">
                            <div className="w-12 h-12 border-4 border-gray-600 border-t-[#EBB500] rounded-full animate-spin"></div>
                            <div className="text-gray-500 text-sm">Loading {title.toLowerCase()}...</div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="w-full lg:w-auto lg:max-w-fit lg:m-auto overflow-x-auto">
            <h3 className="text-xl font-semibold mb-4">{title}</h3>
            <div className="bg-[#1a1a1a] rounded-lg p-6 w-auto">
                <div className="flex gap-1">
                    <div className="flex flex-col justify-around text-xs text-gray-500 pr-2">
                        <span>Mon</span>
                        <span>Wed</span>
                        <span>Fri</span>
                    </div>

                    <div className="overflow-x-auto">
                        <div className="inline-flex flex-col gap-1">
                            <div className="flex gap-1">
                                {monthlyRecords.map((monthRecords, monthIndex) => {
                                    const daysInMonth = monthRecords.length;
                                    const weeksNeeded = Math.ceil(daysInMonth / 7);

                                    return (
                                        <div key={monthIndex} className="flex gap-1">
                                            {Array.from({ length: weeksNeeded }).map((_, weekIndex) => (
                                                <div key={weekIndex} className="flex flex-col gap-1">
                                                    {Array.from({ length: 7 }).map((_, dayIndex) => {
                                                        const recordIndex = weekIndex * 7 + dayIndex;
                                                        const hasRecord = recordIndex < daysInMonth;
                                                        const bgColor = hasRecord
                                                            ? monthRecords[recordIndex]
                                                                ? colorClass
                                                                : 'bg-gray-800'
                                                            : 'bg-gray-700';

                                                        return (
                                                            <div
                                                                key={dayIndex}
                                                                className={`w-4 h-4 ${shape} ${bgColor}`}
                                                                title={hasRecord
                                                                    ? `${monthRecords[recordIndex] ? 'Active' : 'Inactive'}`
                                                                    : 'No data'}
                                                            />
                                                        );
                                                    })}
                                                </div>
                                            ))}
                                        </div>
                                    );
                                })}
                            </div>

                            <div className="flex justify-around text-xs text-gray-500">
                                {getMonthLabels().map((month, index) => (
                                    <span key={index} className="text-center">{month}</span>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex items-center justify-end gap-2 mt-4 text-xs text-gray-500">
                    <span>Inactive</span>
                    <div className="flex gap-1">
                        <div className={`w-3 h-3 bg-gray-800 ${shape}`}></div>
                        <div className={`w-3 h-3 bg-gray-700 ${shape}`}></div>
                        <div className={`w-3 h-3 ${colorClass} ${shape}`}></div>
                    </div>
                    <span>Active</span>
                </div>
            </div>
        </div>
    );
};
