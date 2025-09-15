import { JSX } from "react";
import { useLocalStorage } from "../../hooks/useLocalStorage";
import { Opportunity } from "../../types";
import { useSelectedLead } from "../../contexts/SelectedLeadContext";

function OpportunityList(): JSX.Element {

  const { opportunities } = useSelectedLead();

  if (opportunities.length === 0) {
    return <p className="text-gray-500 p-4">No opportunities yet.</p>;
  }

  return (
    <div className="overflow-x-auto p-4">
      <table className="min-w-full border border-gray-300 dark:border-gray-600 rounded-md">
        <thead className="bg-gray-100 dark:bg-slate-700">
          <tr>
            <th className="px-4 py-2 text-left">Name</th>
            <th className="px-4 py-2 text-left">Account</th>
            <th className="px-4 py-2 text-left">Stage</th>
            <th className="px-4 py-2 text-left">Amount</th>
            <th className="px-4 py-2 text-left">Created At</th>
          </tr>
        </thead>
        <tbody>
          {opportunities.map((opp) => (
            <tr key={opp.id} className="border-t border-gray-200 dark:border-gray-600">
              <td className="px-4 py-2">{opp.name}</td>
              <td className="px-4 py-2">{opp.accountName}</td>
              <td className="px-4 py-2">{opp.stage}</td>
              <td className="px-4 py-2">{opp.amount ?? "-"}</td>
              <td className="px-4 py-2">{new Date(opp.createdAt).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default OpportunityList;
