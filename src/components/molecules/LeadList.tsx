import { JSX, useState, useEffect } from "react";
import { useLeads } from "../../contexts/LeadContext";
import LeadRow from "../atoms/LeadRow";
import Pagination from "../molecules/Pagination";
import LoaderSpinner from "../atoms/LoaderSpinner";

function LeadList(): JSX.Element {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const { leads, loading } = useLeads();

  useEffect(() => {
    setCurrentPage(1);
  }, [leads]);

  useEffect(() => {
    console.log('terminou de carregar', leads);
  }, [loading]);

  const totalPages = Math.ceil(leads.length / itemsPerPage);

  const currentItems = leads.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="p-4">
      <ul className="grid grid-cols-1 gap-6">
        {currentItems.length > 0 ? currentItems.map((lead) => (
          <li key={lead.id}>
            <LeadRow lead={lead} />
          </li>
        )): loading ? <LoaderSpinner/> : "no results"}
      </ul>

      {totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      )}
    </div>
  );
}

export default LeadList;
