import { createContext, useContext, useState, ReactNode } from "react";
import { Lead, LeadStatus } from "../types";
import leadsData from '../data/leads.json';

const leadDataConverted: Lead[] = leadsData.map((lead) => ({
    ...lead,
    status: lead.status as LeadStatus,
    createdAt: new Date(lead.createdAt),
    updatedAt: new Date(lead.updatedAt),
}));

interface LeadContextType {
  leads: Lead[];
  setLeads: React.Dispatch<React.SetStateAction<Lead[]>>;
}

const LeadContext = createContext<LeadContextType | undefined>(undefined);

interface LeadProviderProps {
  children: ReactNode;
}

export const LeadProvider = ({ children }: LeadProviderProps) => {
  const [leads, setLeads] = useState<Lead[]>(leadDataConverted);

  return (
    <LeadContext.Provider value={{ leads, setLeads }}>
      {children}
    </LeadContext.Provider>
  );
};

export const useLeads = () => {
  const context = useContext(LeadContext);
  if (!context) {
    throw new Error("useLeads must be used within a LeadProvider");
  }
  return context;
};
