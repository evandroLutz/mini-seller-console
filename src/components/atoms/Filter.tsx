import { JSX, useEffect, useState } from "react";
import { LeadStatus } from '../../types';
import { useLeads } from "../../contexts/LeadContext";

const statusOptions = ["New", "Contacted", "Qualified", "Lost"];

function Filter(): JSX.Element {
  const [selectedStatus, setSelectedStatus] = useState<string[]>([]);
  const { originalLeads, setFilteredByStatus } = useLeads();

  useEffect(() => {
    if (selectedStatus.length === 0) {
      setFilteredByStatus(originalLeads);
    } else {
      const filteredLeads = originalLeads.filter((lead: any) =>
        (selectedStatus as LeadStatus[]).includes(lead.status)
      );
      setFilteredByStatus(filteredLeads);
    }
  }, [selectedStatus, originalLeads, setFilteredByStatus]);

  const toggleOption = (option: string) => {
    setSelectedStatus((prev) =>
      prev.includes(option) ? prev.filter((item) => item !== option) : [...prev, option]
    );
  };

  return (
    <div className="flex flex-wrap gap-3">
      {statusOptions.map((option) => {
        const isChecked = selectedStatus.includes(option);
        const inputId = `status-${option}`;

        return (
          <label
            key={option}
            htmlFor={inputId}
            className={`flex items-center select-none cursor-pointer rounded-lg px-4 py-2 border transition-all duration-200
            ${isChecked 
              ? "bg-gradient-to-r from-blue-500 to-indigo-600 text-white border-blue-600 shadow-lg scale-105" 
              : "bg-white text-gray-800 border-gray-300 hover:bg-gray-100 dark:border-gray-700 dark:bg-slate-800 dark:text-gray-200 dark:hover:bg-slate-700"}
            `}
          >
            <input
              id={inputId}
              type="checkbox"
              checked={isChecked}
              onChange={() => toggleOption(option)}
              className="sr-only"
            />
            <span>{option}</span>
          </label>
        );
      })}
    </div>
  );
}

export default Filter;
