import { createContext, useContext, useState, ReactNode, useEffect, Dispatch, SetStateAction } from "react";
import { Lead } from "../types";
import leadsData from '../data/leads.json';
import convertDataLead from "../utils/convertDataLead";

interface LeadContextType {
  originalLeads: Lead[];
  leads: Lead[];
  setLeads: Dispatch<SetStateAction<Lead[]>>;
  setFilteredBySearch: Dispatch<SetStateAction<Lead[]>>;
  setFilteredByStatus: Dispatch<SetStateAction<Lead[]>>;
}

const LeadContext = createContext<LeadContextType | undefined>(undefined);

interface LeadProviderProps {
  children: ReactNode;
}

export const LeadProvider = ({ children }: LeadProviderProps) => {
    const sortedLeads = [...convertDataLead(leadsData)].sort((a, b) => b.score - a.score);
    const [originalLeads] = useState<Lead[]>(sortedLeads);
    const [filteredBySearch, setFilteredBySearch] = useState<Lead[]>(originalLeads);
    const [filteredByStatus, setFilteredByStatus] = useState<Lead[]>(originalLeads);

    const [leads, setLeads] = useState<Lead[]>(originalLeads);

    useEffect(() => {
        let updatedLeads = originalLeads;

        if (filteredBySearch.length !== originalLeads.length) {
            updatedLeads = updatedLeads.filter(lead => filteredBySearch.includes(lead));
        }

        if (filteredByStatus.length !== originalLeads.length) {
            updatedLeads = updatedLeads.filter(lead => filteredByStatus.includes(lead));
        }

        setLeads(updatedLeads);
    }, [filteredBySearch, filteredByStatus]);

  return (
    <LeadContext.Provider value={{ originalLeads, leads, setLeads, setFilteredBySearch, setFilteredByStatus }}>
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
