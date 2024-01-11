import React, { type JSX } from "react";

interface InputProps {
  lable: String;
  value: string;
  onChange: (value: string) => void;
}
const InputFields: React.FC<InputProps> = ({
  lable,
  value,
  onChange,
}): JSX.Element => {
  return (
    <>
      <div className="mb-4 flex">
        <label
          className="block text-sm font-bold mr-2 w-24 text-sm text-gray-700 "
          htmlFor="title"
        >
          {lable}
        </label>
        <input
          className="flex-grow px-3 py-2 border border-zinc-300 rounded outline-none w-72"
          type="text"
          name="title"
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
      </div>
    </>
  );
};

export default InputFields;
