import React, {type JSX} from "react";

interface DaysSelectorProps {
  selectedDay: string;
  onChange: (selectedDay: string) => void;
}

const daysOfWeek = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

const DaysSelector: React.FC<DaysSelectorProps> = ({
  selectedDay,
  onChange,
}):JSX.Element => {
  const toggleDay = (day: string) => {
    const updatedDay = selectedDay === day ? "" : day;
    onChange(updatedDay);
  };

  return (
    <div className="flex">
      {daysOfWeek.map((day) => (
        <div
          key={day}
          className={`h-8 w-8 rounded-full border border-zinc-300 p-1 mx-2 text-center ${
            selectedDay === day ? "bg-gray-300" : ""
          } cursor-pointer`}
          onClick={() => toggleDay(day)}
        >
          {day.substr(0, 1)}
        </div>
      ))}
    </div>
  );
};

export default DaysSelector;
