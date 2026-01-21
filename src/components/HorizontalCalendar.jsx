import { useState } from "react";
import dayjs from "dayjs";

const HorizontalCalendar = () => {
  const [currentMonth, setCurrentMonth] = useState(dayjs());
  const [selectedDay, setSelectedDay] = useState(dayjs().format("YYYY-MM-DD"));

  const startOfMonth = currentMonth.startOf("month");
  const daysInMonth = currentMonth.daysInMonth();

  const days = Array.from({ length: daysInMonth }, (_, i) =>
    startOfMonth.add(i, "day")
  );

  const today = dayjs().format("YYYY-MM-DD");

  const prevMonth = () => {
    setCurrentMonth(currentMonth.subtract(1, "month"));
  };

  const nextMonth = () => {
    setCurrentMonth(currentMonth.add(1, "month"));
  };

  return (
    <div className="w-full rounded-xl bg-[#f6f8ff] px-4 py-3">
      {/* Header */}
      <div className="mb-2 flex items-center justify-between">
        <span className="text-sm font-semibold text-gray-800">
          {currentMonth.format("MMMM")}
        </span>

        <div className="flex gap-2">
          <button onClick={prevMonth} className="flex h-7 w-7 items-center justify-center rounded-full bg-indigo-100 text-indigo-600">
            ‹
          </button>

          <button onClick={nextMonth} className="flex h-7 w-7 items-center justify-center rounded-full bg-indigo-100 text-indigo-600">
            ›
          </button>
        </div>
      </div>

      {/* Days */}
      <div className="flex gap-2 overflow-x-auto scrollbar-hide">
        {days.map((day) => {
          const isSelected =
            selectedDay === day.format("YYYY-MM-DD");
          const isToday =
            today === day.format("YYYY-MM-DD");

          return (
            <div
              key={day.format("YYYY-MM-DD")}
              onClick={() =>
                setSelectedDay(day.format("YYYY-MM-DD"))
              }
              className={`
                flex h-16 min-w-14 cursor-pointer flex-col
                items-center justify-center rounded-lg
                ${
                  isSelected
                    ? "bg-indigo-600 text-white"
                    : "bg-transparent text-gray-800"
                }
                ${
                  isToday && !isSelected
                    ? "border border-indigo-600"
                    : ""
                }
              `}
            >
              <span
                className={`text-[11px] ${
                  isSelected ? "text-white" : "text-gray-500"
                }`}
              >
                {day.format("ddd")}
              </span>

              <span className="text-sm font-medium">
                {day.format("D")}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default HorizontalCalendar;
