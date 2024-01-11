import React, {type JSX} from "react";

interface SelectProps {
  label:String
  options: { value: string; label: string }[];
  value: string;
  onChange: (value: string) => void;
}

const Select: React.FC<SelectProps> = ({ label,options, value, onChange }):JSX.Element => {
  return (
    <div className="mb-4 flex">
      <label
        className="block text-sm font-bold mr-2 w-24 text-sm text-gray-700"
        htmlFor= {`${label}`}
      >
        {label}
      </label>
      <select
        className="flex-grow px-3 py-2 border border-zinc-300 rounded outline-none w-72"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      >
        <option>{""}</option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Select;
