import { LucideIcon, UserPlus, PhoneCall, CheckCircle, XCircle } from "lucide-react";
import { LeadStatus } from "../types";

export const getLeadStatusIcon = (status: LeadStatus): LucideIcon => {
  switch (status) {
    case "New":
      return UserPlus;       
    case "Contacted":
      return PhoneCall;      
    case "Qualified":
      return CheckCircle;    
    case "Lost":
      return XCircle;
    default:
      return UserPlus;
  }
};
