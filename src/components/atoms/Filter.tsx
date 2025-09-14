import { JSX, useEffect, useState } from "react";
import { LeadStatus } from '../../types';
import { useLeads } from "../../contexts/LeadContext";
import leadsData from '../../data/leads.json';
import convertDataLead from "../../utils/convertDataLead";


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
  }, [selectedStatus]);

  
  const toggleOption = (option: string) => {
    if (selectedStatus.includes(option)) {
      setSelectedStatus(selectedStatus.filter((item) => item !== option));
    } else {
      setSelectedStatus([...selectedStatus, option]);
    }
  };

  return (
    <div className="flex flex-wrap gap-3">
      {statusOptions.map((option) => {
        const isChecked = selectedStatus.includes(option);
        return (
          <label
            key={option}
            htmlFor={option} // associa ao input
            className={`flex items-center cursor-pointer rounded-lg px-4 py-2 border transition-colors 
              ${isChecked 
                ? "bg-blue-600 text-white border-blue-600" 
                : "bg-white text-gray-800 border-gray-300 hover:bg-gray-100"} 
              dark:border-gray-700 dark:bg-slate-800 dark:text-gray-200 dark:hover:bg-slate-700`}
          >
            <input
              id={option} // precisa ter o mesmo valor
              type="checkbox"
              checked={isChecked}
              onChange={() => toggleOption(option)}
              className="hidden"
            />
            <span className="ml-2">{option}</span>
          </label>
        );
      })}
    </div>
  );
}

export default Filter;
