import { useState } from "react";
import { LeadStatus } from "../../types";

interface DropdownProps {
  label: string;
  onSelect?: (value: string) => void;
}

function Dropdown({ label, onSelect }: DropdownProps) {
  const leadStatusOptions: LeadStatus[] = ["New", "Contacted", "Qualified", "Lost"];
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState<string | null>(null);

  const handleSelect = (value: string) => {
    setSelected(value);
    setIsOpen(false);
    if (onSelect) onSelect(value);
  };

  return (
    <div className="relative inline-block w-48">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-4 py-2 bg-gray-800 text-white rounded-md shadow hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
      >
        {selected || label}
      </button>

      {isOpen && (
        <ul className="absolute w-full mt-1 bg-white border border-gray-200 rounded-md shadow-lg z-10">
          {leadStatusOptions.map((option) => (
            <li
              key={option}
              className="bg-gray-800 px-4 py-2 hover:bg-indigo-500 hover:text-white cursor-pointer"
              onClick={() => handleSelect(option)}
            >
              {option}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Dropdown;