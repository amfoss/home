import {AttendanceDetails} from "../types/types.tsx";
type AttendanceDetailRowProps = {
    titles: string[];
    loading: boolean;
    error: string | null;
    attendanceData: AttendanceDetails[];
    complete: boolean;
};

export const AttendanceDetailRow: React.FC<AttendanceDetailRowProps> = ({
                                                                     titles,
                                                                     loading,
                                                                     error,
                                                                     attendanceData,
                                                                     complete,
                                                                 }) => {
  return (
      <div className="bg-panelButtonColor w-full min-w-[8.5rem]  rounded-md  overflow-hidden">


        {/* Scrollable data section */}
        <div className="w-full h-[38rem] overflow-y-auto">
            <div className="flex-col min-w-full overflow-x-auto">
                <div className="min-w-full  relative">
                    {/* Sticky header */}
                    <div
                        className="flex w-fit min-[740px]:w-full p-2 sticky top-0 text-primaryYellow  text-xl h-24 bg-panelColor  flex-shrink-0 items-center justify-between">
                        {titles.map((title: string, index: number) => (
                            <div key={index} className="w-1/5 min-w-[8.5rem] p-2 text-center">
                                {title}
                            </div>
                        ))}
                    </div>
                </div>

                {loading ? (
                    <div className="text-center p-4">Loading...</div>
                ) : error ? (
                    <div className="text-center p-4 text-red-500">{error}</div>
                ) : attendanceData.length > 0 ? (
                    attendanceData.map((attendance: AttendanceDetails, index: number) => (
                        <div
                            className={`flex min-w-full p-2 text-center items-center font-bold tet ${
                                attendance.isPresent ? 'text-offWhite' : 'text-red-500'
                            }`}
                            key={index}
                        >
                            <div className="min-w-[8.5rem] px-4 w-1/5 truncate text-left" title={attendance.memberName}>
                                {attendance.memberName.length > 12
                                    ? attendance.memberName.substring(0, 12) + "..."
                                    : attendance.memberName}
                            </div>
                            <div className="min-w-[8.5rem] w-1/5 px-4 text-center">{attendance.year}</div>

                            {complete && (
                                <>
                                    <div className="min-w-[8.5rem] w-1/5 px-4 text-center">
                                        {attendance.date}
                                    </div>
                                    <div className="min-w-[8.5rem] w-1/5 px-4 text-center">
                                        {attendance.timein.substring(0, 8)}
                                    </div>
                                    <div className="min-w-[8.5rem] w-1/5 px-4 text-center">
                                        {attendance.timeout.substring(0, 8)}
                                    </div>
                                </>
                            )}

                        </div>
                    ))
                ) : (
                    <div className="text-center p-4">No attendance records found</div>
                )}
            </div>
        </div>
      </div>
  );
};
