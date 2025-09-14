import { createContext, useContext, useState, ReactNode, useEffect, Dispatch, SetStateAction, useMemo } from "react";
import { Lead } from "../types";
import leadsData from '../data/leads.json';
import convertDataLead from "../utils/convertDataLead";
import { useLocalStorage } from "../hooks/useLocalStorage";

interface LeadContextType {
  originalLeads: Lead[];
  setOriginalLeads:  Dispatch<SetStateAction<Lead[]>>;
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
    const [originalLeadsRaw, setOriginalLeads] = useLocalStorage<Lead[]>(
      "leads-list",
      sortedLeads);

    const originalLeads = useMemo(() => 
      originalLeadsRaw.map(lead => ({
        ...lead,
        createdAt: new Date(lead.createdAt),
        updatedAt: new Date(lead.updatedAt),
      })), [originalLeadsRaw]
    );
    
    const [filteredBySearch, setFilteredBySearch] = useState<Lead[]>(originalLeads);
    const [filteredByStatus, setFilteredByStatus] = useState<Lead[]>(originalLeads);

    const [leads, setLeads] = useState<Lead[]>(originalLeads);

    useEffect(() => {
      let updatedLeads = originalLeads;

      if (filteredBySearch.length !== originalLeads.length) {
        updatedLeads = updatedLeads.filter(lead =>
          filteredBySearch.some(f => f.id === lead.id)
        );
      }

      if (filteredByStatus.length !== originalLeads.length) {
        updatedLeads = updatedLeads.filter(lead =>
          filteredByStatus.some(f => f.id === lead.id)
        );
      }

      setLeads(updatedLeads);
    }, [filteredBySearch, filteredByStatus, originalLeads]);

  return (
    <LeadContext.Provider value={{ originalLeads, setOriginalLeads, leads, setLeads, setFilteredBySearch, setFilteredByStatus }}>
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
