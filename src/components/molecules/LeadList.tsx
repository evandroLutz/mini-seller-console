import { JSX } from "react";
import { useLeads } from "../../contexts/LeadContext";
import LeadRow from "../atoms/LeadRow";

function LeadList(): JSX.Element {
  const { leads } = useLeads();

  return (
    <ul className="grid grid-cols-1 gap-6 p-4">
        {leads.map(lead => (
            <li key={lead.id}>
             <LeadRow lead={lead} />
            </li>
        ))}
    </ul>
  );
}

export default LeadList;