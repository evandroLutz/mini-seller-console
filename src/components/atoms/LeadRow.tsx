import { JSX } from "react";
import { Lead } from "../../types";
import { getLeadStatusIcon } from "../../utils/LeadStatusIcon";
import Badge from "./Badge";
import { useSelectedLead } from "../../contexts/SelectedLeadContext";

function LeadRow({ lead }: { lead: Lead }): JSX.Element {
  const { setSelectedLead } = useSelectedLead();
  const StatusIcon = getLeadStatusIcon(lead.status); 
  
  return (
    <div
      onClick={() => setSelectedLead(lead)}
      className="cursor-pointer bg-gray-800 p-4 rounded-xl mb-4 flex flex-col sm:flex-row sm:items-center gap-4 bg-white p-10 shadow-lg outline outline-black/5 dark:bg-slate-800 dark:shadow-none dark:-outline-offset-1 dark:outline-white/10"
    >

        {lead.name} - {lead.company} - {lead.email} - <Badge status={lead.status} />
        <StatusIcon className="h-6 w-6" />
        <div className="ml-auto text-sm text-gray-500 dark:text-gray-400">Created {lead.createdAt.toLocaleDateString()}</div>
        <div className="text-sm text-gray-500 dark:text-gray-400">Last Updated: {lead.updatedAt.toLocaleDateString()}</div>
        <div className="text-sm text-gray-500 dark:text-gray-400">Score: {lead.score}</div>
    </div>
  );
}

export default LeadRow;
