import { JSX } from "react";
import { LeadStatus } from "../../types";

function Badge({status}: {status: LeadStatus}): JSX.Element | null {
  switch (status) {
    case "New":
      return <span className="inline-flex items-center rounded-md bg-blue-400/10 px-2 py-1 text-xs font-medium text-blue-400 inset-ring inset-ring-blue-400/30">New</span>;
    case "Contacted":
      return <span className="inline-flex items-center rounded-md bg-yellow-400/10 px-2 py-1 text-xs font-medium text-yellow-400 inset-ring inset-ring-yellow-400/30">Contacted</span>;
    case "Qualified":
      return <span className="inline-flex items-center rounded-md bg-green-400/10 px-2 py-1 text-xs font-medium text-green-400 inset-ring inset-ring-green-400/30">Qualified</span>;
    case "Lost":
      return <span className="inline-flex items-center rounded-md bg-red-400/10 px-2 py-1 text-xs font-medium text-red-400 inset-ring inset-ring-red-400/30">Lost</span>;
    default:
      return null;
  }
}
export default Badge;