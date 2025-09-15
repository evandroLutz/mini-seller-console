import { JSX, useEffect, useState } from "react";
import { useSelectedLead } from "../../contexts/SelectedLeadContext";
import { XIcon, Edit, Calendar } from "lucide-react";
import validateEmail from '../../utils/validateEmail';
import Button from "../atoms/Button";
import { useLeads } from "../../contexts/LeadContext";
import Dropdown from "../atoms/DropDown";
import { LeadStatus } from "../../types";
import OpportunityCreate from "../atoms/OpportunityCreate";
import SlideOverModal from "./SlideOverModal";

function LeadEdit(): JSX.Element {
  const { selectedLead, setSelectedLead, setIsOpportunityCreating } = useSelectedLead();
  const { setOriginalLeads } = useLeads();

  const [isEditingEmail, setIsEditingEmail] = useState<boolean>(false);
  
  const [isEditingStatus, setIsEditingStatus] = useState<boolean>(false);

  const [email, setEmail] = useState(selectedLead?.email);

  const [status, setStatus] = useState(selectedLead?.status);

  const [emailError, setEmailError] = useState<string | null>(null);

  const leadStatusOptions: LeadStatus[] = ["New", "Contacted", "Qualified", "Lost"];

  const reset = () => {
    setIsEditingEmail(false);
    setIsEditingStatus(false);
    setSelectedLead(null)
    setEmailError(null);
  }

  useEffect(() => {
    setEmail(selectedLead?.email || "");
    setStatus(selectedLead?.status)
  }, [selectedLead, isEditingEmail, isEditingStatus]);

  function updateEmailById(id: string, email: string): void {
    setOriginalLeads(prevLeads => 
      prevLeads.map(lead =>
        lead.id === id ? { ...lead, email, updatedAt: new Date()} : lead
      )
    );

    if (selectedLead?.id === id) {
      setSelectedLead(prev => prev ? { ...prev, email, updatedAt: new Date() } : null);
    }
    setIsEditingEmail(false);
  }

  function updateStatusById(id: string, status: LeadStatus): void {
    setOriginalLeads(prevLeads =>
      prevLeads.map(lead =>
        lead.id === id ? { ...lead, status, updatedAt: new Date() } : lead
      )
    );

    if (selectedLead?.id === id) {
      setSelectedLead(prev => prev ? { ...prev, status, updatedAt: new Date() } : null);
    }

    setIsEditingStatus(false);
  };


  return (
    <SlideOverModal callback={reset} isOpen={selectedLead !== null} >
      {selectedLead && (
        <>
          <h2 className="text-2xl font-bold mb-6">{selectedLead.name}</h2>
          <p className="mb-2">
            <span className="font-semibold">Company:</span> {selectedLead.company}
          </p>
          {
              isEditingEmail ?
              <> 
                <input
                  type="email"
                  inputMode="email"
                  value={email}
                  onChange={(e) => {
                    const error = validateEmail(e.target.value);
                    setEmailError(error);
                    setEmail(e.target.value);
                  }}
                  className={`w-full rounded-md border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-opacity-75
                  ${emailError ? "border-red-500 focus:ring-red-300" : "border-gray-200 focus:ring-indigo-300"}`}
                  placeholder="user@example.com"
                />
                <div className="text-red-600 text-sm mt-1 font-medium italic">
                  {emailError}
                </div>
                <div className="flex gap-4">
                  <Button onClick={() => updateEmailById(selectedLead.id, email ? email: '')} active={!emailError} title={"Save Email"} />
                  <Button onClick={() => setIsEditingEmail(false)} active={true} title={"Cancel"} />
                </div>
              </>
              : 
              <p onClick={() => setIsEditingEmail(true)} className="flex items-center gap-4 cursor-pointer mb-2">
                  <span className="font-semibold">Email:</span> {email}
                  <Edit className="h-4 w-4" />
              </p>
          }
          {
            isEditingStatus ?
            <>
              <Dropdown
                options={leadStatusOptions}
                label={status || selectedLead.status}
                onSelect={(value: string) => setStatus(value as LeadStatus)}
              />
              <div className="flex gap-4">
                <Button onClick={() => updateStatusById(selectedLead.id, status || 'New')} active={true} title={"Save Status"} />
                <Button onClick={() => setIsEditingStatus(false)} active={true} title={"Cancel"} />
              </div>
            </>
            
            :
              <p onClick={() => setIsEditingStatus(true)}  className="flex items-center gap-4 cursor-pointer mb-2">
                <span className="font-semibold">Status:</span> {selectedLead.status}
                <Edit className="h-4 w-4" />
              </p>
          }
          <p className="mb-2">
            <span className="font-semibold">Score:</span> {selectedLead.score}
          </p>
          <div className="flex flex-col gap-4 text-sm text-gray-400">
            <div className="flex items-center gap-4">
              Created: {selectedLead.createdAt.toLocaleDateString()} <br />
              <Calendar className="h-4 w-4" />
            </div>
            <div className="flex items-center gap-4">
              Last Updated: {selectedLead.updatedAt.toLocaleDateString()}
              <Calendar className="h-4 w-4" />
            </div>
            <Button onClick={() => setIsOpportunityCreating(true)} active={true} title={"Convert to Oportunitty"} />
            <OpportunityCreate />
          </div>
        </>
      )}
    </SlideOverModal>
);
}

export default LeadEdit;