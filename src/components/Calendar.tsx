import { ChevronLeft, ChevronRight } from "lucide-react";
import React, { useRef, useState, useEffect } from "react";

interface CalendarProps {
  onDateClick: (date: Date) => void;
}

const Calendar: React.FC<CalendarProps> = ({ onDateClick }) => {
  const currentYear = new Date().getFullYear();
  const initialYear = 2024;
  const years = [];
  for (let i = currentYear; i >= initialYear; i--) {
    years.push(i);
  }
  const [month, setMonth] = useState(new Date().getMonth());
  const [year, setYear] = useState(new Date().getFullYear());

  const monthMap: { [key: number]: string } = {
    0: "January",
    1: "February",
    2: "March",
    3: "April",
    4: "May",
    5: "June",
    6: "July",
    7: "August",
    8: "September",
    9: "October",
    10: "November",
    11: "December",
  };
  const monthValues = Object.values(monthMap);

  const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  const generateWeekDates = (baseDate: Date, count: number) => {
    const pastWeekDates = [];
    for (let i = 0; i < count; i++) {
      const day = new Date(baseDate);
      day.setDate(baseDate.getDate() - i);
      pastWeekDates.push(day);
    }

    return pastWeekDates.reverse();
  };

  const [currentDate, setCurrentDate] = useState(new Date()); // Tracks the selected date
  const [visibleDates, setVisibleDates] = useState(
    generateWeekDates(new Date(), 10)
  ); // Initial number of visible dates
  const [daysToDisplay, setDaysToDisplay] = useState(10); // Default to 10 days
  const today = new Date();

  // Dynamically set the number of visible days based on screen size
  const updateDaysToDisplay = () => {
    const width = window.innerWidth;
    if (width < 430) {
      setDaysToDisplay(3);
    } else if (width < 530) {
      setDaysToDisplay(4);
    } else if (width < 600) {
      setDaysToDisplay(5);
    } else if (width < 690) {
      // Small screens (sm)
      setDaysToDisplay(6); // Show 5 days
    } else if (width < 1024) {
      // Medium screens (md)
      setDaysToDisplay(7); // Show 7 days
    } else if (width < 1440) {
      // Large screens (lg)
      setDaysToDisplay(10); // Show 10 days
    } else {
      setDaysToDisplay(13);
    }
  };

  // Call the function on initial render and whenever the window is resized
  useEffect(() => {
    updateDaysToDisplay();
    window.addEventListener("resize", updateDaysToDisplay);
    return () => {
      window.removeEventListener("resize", updateDaysToDisplay);
    };
  }, []);

  useEffect(() => {
    setVisibleDates(generateWeekDates(new Date(), daysToDisplay)); // Update the visible dates
  }, [daysToDisplay]);

  const handlePreviousDay = () => {
    setVisibleDates((prevDates) => {
      const newDay = new Date(prevDates[0]);
      newDay.setDate(newDay.getDate() - 1);

      return [newDay, ...prevDates.slice(0, -1)];
    });

    setCurrentDate((prevDate) => {
      const newDate = new Date(prevDate);
      newDate.setDate(prevDate.getDate() - 1);
      return newDate;
    });
  };

  const handleNextDay = () => {
    setVisibleDates((prevDates) => {
      const newDay = new Date(prevDates[prevDates.length - 1]);
      newDay.setDate(newDay.getDate() + 1);
      return [...prevDates.slice(1), newDay];
    });

    setCurrentDate((prevDate) => {
      const newDate = new Date(prevDate);
      newDate.setDate(prevDate.getDate() + 1);
      return newDate;
    });
  };
  const handleDateClick = (date: Date) => {
    onDateClick(date);
    setCurrentDate(date);
    setMonth(date.getMonth());
    setYear(date.getFullYear());
  };

  const pressTimerRef = useRef<NodeJS.Timeout | null>(null);
  const [isLongPressing, setIsLongPressing] = useState(false);
  const LONG_PRESS_THRESHOLD = 1000; // 1 second threshold for long press

  const handlePressStart = () => {
    pressTimerRef.current = setTimeout(() => {
      setIsLongPressing(true);
      setMonth(new Date().getMonth()); // Reset to current month
      setYear(new Date().getFullYear()); // Reset to current year
      setCurrentDate(new Date()); // Set to today's date
      setVisibleDates(generateWeekDates(new Date(), daysToDisplay)); // Refresh the visible dates
    }, LONG_PRESS_THRESHOLD);
  };

  const handlePressEnd = () => {
    if (pressTimerRef.current) {
      clearTimeout(pressTimerRef.current);
      pressTimerRef.current = null;
      
    }
    setIsLongPressing(false);
  };
  
  const handleSelectMonth = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setMonth(Number(event?.target?.value));
    setVisibleDates(generateWeekDates(new Date(year, Number(event?.target?.value), 1), daysToDisplay));
  };

  const handleSelectYear = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setYear(Number(event?.target?.value));
    setVisibleDates(generateWeekDates(new Date(Number(event?.target?.value), month, 1), daysToDisplay));
  };

  const isNextDisabled =
    visibleDates[visibleDates.length - 1].toDateString() ===
    today.toDateString();
  return (
    <div className="text-white">
      {/* Calendar Header */}
      <div className="flex mb-2 justify-between items-center">
        <h2 className="text-lg font-semibold">
          <label className=" bg-panelButtonColor rounded-md p-2">
            <select
              name={monthMap[currentDate.getMonth()]}
              value={month}
              onChange={handleSelectMonth}
              className="bg-panelButtonColor text-primaryYellow rounded-md outline-none bg-transparent appearance-none "
            >
              {monthValues.map((month, index) => (
                <option key={month} value={index} >
                  {month}
                </option>
              ))}
            </select>
            <select
              name={currentDate.getFullYear().toString()}
              value={year}
              onChange={handleSelectYear}
              className="bg-panelButtonColor text-primaryYellow rounded-md outline-none appearance-none"
            >
              {years.map((year, index) => (
                <option key={index} value={year}>
                  {year}
                </option>
              ))}
            </select>
          </label>
        </h2>
        <div className="flex space-x-2">
          <button onClick={handlePreviousDay} className="text-white">
            <ChevronLeft className="aspect-square w-12 h-12" />
          </button>
          <button
            onMouseDown={handlePressStart}
            onMouseUp={handlePressEnd}
            onMouseLeave={handlePressEnd}
            onClick={!isLongPressing ? handleNextDay : undefined}
            disabled={isNextDisabled}
            className={`text-white aspect-square ${
              isNextDisabled ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            <ChevronRight className="aspect-square w-12 h-12" />
          </button>
        </div>
      </div>
      <div className="ml-5 flex justify-between overflow-x-hidden overflow-y-visible">
        {visibleDates.map((dateObj, index) => (
          <div
            key={index}
            className={`relative m-1 flex flex-col items-center p-3 aspect-square w-16 h-16 rounded-lg transition-transform duration-300 bg-panelButtonColor ${
              dateObj.toDateString() === currentDate.toDateString()
                ? "border border-yellow-500"
                : ""
            }`}
            onClick={() => handleDateClick(dateObj)}
          >
            <span className="text-xs font-light text-primaryYellow">
              {weekdays[dateObj.getDay()]}
            </span>
            <span className="text-lg font-bold mt-1">{dateObj.getDate()}</span>
            {/* Circle indicator only for today's date */}
            {dateObj.toDateString() === today.toDateString() && (
              <div className="absolute top-full left-1/2 w-2 h-2 bg-primaryYellow rounded-full transform -translate-x-1/2 -translate-y-1/2"></div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Calendar;
