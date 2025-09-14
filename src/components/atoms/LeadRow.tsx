import { JSX } from "react";
import { Lead } from "../../types";
import { getLeadStatusIcon } from "../../utils/LeadStatusIcon";
import Badge from "./Badge";

function LeadRow({ lead }: { lead: Lead }): JSX.Element {
  const StatusIcon = getLeadStatusIcon(lead.status);
  return (
    <div className="flex items-center gap-x-4 rounded-xl bg-white p-10 shadow-lg outline outline-black/5 dark:bg-slate-800 dark:shadow-none dark:-outline-offset-1 dark:outline-white/10">
        <StatusIcon className="h-6 w-6" />
        {lead.name} - {lead.company} - {lead.email} - <Badge status={lead.status} />
        <div className="ml-auto text-sm text-gray-500 dark:text-gray-400">Created {lead.createdAt.toLocaleDateString()}</div>
        <div className="text-sm text-gray-500 dark:text-gray-400">Last Updated: {lead.updatedAt.toLocaleDateString()}</div>
        <div className="text-sm text-gray-500 dark:text-gray-400">Score: {lead.score}</div>
    </div>
  );
}

export default LeadRow;
