import { ChangeEvent, JSX, useEffect, useState } from "react";
import { useLeads } from "../../contexts/LeadContext";
import leadsData from '../../data/leads.json';
import convertDataLead from "../../utils/convertDataLead";

function SearchBar(): JSX.Element {
  const [searchTerm, setSearchTerm] = useState("");
  const { setLeads } = useLeads();

  const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };


  useEffect(() => {
    const filteredLeads = leadsData.filter((lead: { name: string; company: string }) =>
      lead.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lead.company.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setLeads(convertDataLead(filteredLeads));
  }, [searchTerm]);



  return (
    <div className="w-200 mb-4">
      <input
        type="text"
        placeholder="Search by name or company..."
        className="w-full p-2 border border-gray-300 rounded"
        value={searchTerm}
        onChange={handleSearchChange}
      />
    </div>
  );
}

export default SearchBar;