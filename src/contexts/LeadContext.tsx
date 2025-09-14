import { createContext, useContext, useState, ReactNode, useEffect, Dispatch, SetStateAction } from "react";
import { Lead, LeadStatus } from "../types";
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
    const [originalLeads] = useState<Lead[]>(convertDataLead(leadsData)); // nunca muda
    const [filteredBySearch, setFilteredBySearch] = useState<Lead[]>(originalLeads);
    const [filteredByStatus, setFilteredByStatus] = useState<Lead[]>(originalLeads);

    const [leads, setLeads] = useState<Lead[]>(originalLeads);

    useEffect(() => {
        let updatedLeads = originalLeads;

        if (filteredBySearch.length !== originalLeads.length) {
            console.log('search', filteredBySearch);
            updatedLeads = updatedLeads.filter(lead => filteredBySearch.includes(lead));
        }

        if (filteredByStatus.length !== originalLeads.length) {
            console.log('status', filteredByStatus);
            updatedLeads = updatedLeads.filter(lead => filteredByStatus.includes(lead));
        }

        console.log('setou!');

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
