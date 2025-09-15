import { createContext, useContext, useState, ReactNode, Dispatch, SetStateAction } from "react";
import { Lead } from "../types";

interface LeadSelectionContextType {
  selectedLead: Lead | null;
  setSelectedLead: Dispatch<SetStateAction<Lead | null>>;
  isOpportunityCreating : boolean,
  setIsOpportunityCreating: Dispatch<boolean>;
}

const LeadSelectionContext = createContext<LeadSelectionContextType | undefined>(undefined);

interface LeadSelectionProviderProps {
  children: ReactNode;
}

export const LeadSelectionProvider = ({ children }: LeadSelectionProviderProps) => {
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [isOpportunityCreating, setIsOpportunityCreating] = useState<boolean>(false);

  return (
    <LeadSelectionContext.Provider value={{ selectedLead, setSelectedLead, isOpportunityCreating, setIsOpportunityCreating }}>
      {children}
    </LeadSelectionContext.Provider>
  );
};

export const useSelectedLead = () => {
  const context = useContext(LeadSelectionContext);
  if (!context) {
    throw new Error("useSelectedLead must be used within a LeadSelectionProvider");
  }
  return context;
};
