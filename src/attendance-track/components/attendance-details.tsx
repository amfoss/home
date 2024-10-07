import { AttendanceDetails } from "../types/types";

export const AttendanceDetailRow: React.FC<AttendanceDetails> = ({
  memberName,
  year,
  timein,
  timeout,
  date,
  isPresent,
}) => {

  return (
    <div
      className={`h-20 font-jetbrains grid grid-cols-5 gap-4 content-center text-xl px-4 truncate ${
        isPresent ? "text-offWhite" : "text-red-500"
      }`}
    >
      <div className="px-4 truncate text-left">
        {memberName.length > 12
          ? memberName.substring(0, 12) + "..."
          : memberName.padEnd(12, " ")}
      </div>
      <div className="px-4 text-center">{year}</div>
      <div className="px-4 text-center">{timein}</div>
      <div className="px-4 text-center">{timeout}</div>
      <div className="px-4 text-center">{date}</div>
    </div>
  );
};
