import { ChangeEvent, JSX, useState, useEffect } from "react";
import { useLeads } from "../../contexts/LeadContext";
import { XIcon } from "lucide-react";

function SearchBar(): JSX.Element {
  const [searchTerm, setSearchTerm] = useState("");
  const { originalLeads, setFilteredBySearch } = useLeads();

  const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  useEffect(() => {
    const filteredLeads = originalLeads.filter((lead) =>
      lead.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lead.company.toLowerCase().includes(searchTerm.toLowerCase())
    );

    setFilteredBySearch(filteredLeads);
  }, [searchTerm]);

  return (
    <div className="relative w-full sm:w-80 mb-4">
      <input
        type="text"
        placeholder="Search by name or company..."
        className="w-full p-2 border border-gray-300 rounded"
        value={searchTerm}
        onChange={handleSearchChange}
      />
      {searchTerm && (
        <XIcon
          onClick={() => setSearchTerm("")}
          className="cursor-pointer absolute right-2 top-1/2 transform -translate-y-1/2"
        />
      )}
    </div>
  );
}

export default SearchBar;
