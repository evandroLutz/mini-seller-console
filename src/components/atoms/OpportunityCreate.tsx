import { JSX, useEffect, useState } from "react";
import SlideOverModal from "../molecules/SlideOverModal";
import { useSelectedLead } from "../../contexts/SelectedLeadContext";
import Dropdown from "./DropDown";
import Button from "./Button";
import { OpportunityStage } from "../../types";


function OpportunityCreate(): JSX.Element {

    const { selectedLead, isOpportunityCreating, setIsOpportunityCreating, setOpportunities } = useSelectedLead();

    const [stage, setStage] = useState<OpportunityStage>('New');
    const [name, setName] = useState<string>(selectedLead?.name || " ");
    const [accountName, setAccountName] = useState<string>(selectedLead?.company || " ");
    const [amount, setAmount] = useState<number | null>(0);

    const opportunityStage =  ['New','Qualified','Proposal','Negotiation','Closed Won','Closed Lost'];

    function persistOpportunity(): void {
        if(selectedLead === null) return;
        setOpportunities(prev => [...prev, {
            id: `opp-${Date.now()}`,         
            leadId: selectedLead.id,           
            name: name || selectedLead.name,   
            accountName: accountName || selectedLead.company, 
            stage,                             
            amount: amount ?? null,          
            createdAt: new Date(),
        }])
        setIsOpportunityCreating(false);
    }

    useEffect(() => {
        setName(selectedLead?.name || "");
        setAccountName(selectedLead?.company || "");
    }, [selectedLead]);

    return(
        <SlideOverModal isOpen={isOpportunityCreating} callback={() => setIsOpportunityCreating(false)}>
            <div>
                <h2 className="text-2xl font-bold mb-6">Create Oportunitty</h2>
                <div className="flex items-center gap-4 cursor-pointer mb-2">
                  <span className="font-semibold  min-w-[8rem]">Stage:</span>
                  <Dropdown onSelect={() => setStage} options={opportunityStage} label={stage} />
                </div>
                <div className="flex items-center gap-4 cursor-pointer mb-2">
                  <span className="font-semibold min-w-[8rem]">Name:</span>
                  <input onChange={(e) => setName(e.target.value)} value={name} type={"text"} className="w-full sm:w-auto px-3 py-2 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-slate-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"/>
                </div>
                <div className="flex items-center gap-4 cursor-pointer mb-2">
                  <span className="font-semibold min-w-[8rem]">Amount (optional):</span>
                  <input onChange={(e) => setAmount(parseInt(e.target.value))} type={"number"} className="w-full sm:w-auto px-3 py-2 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-slate-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"/>
                </div>
                <div className="flex items-center gap-4 cursor-pointer mb-2">
                  <span className="font-semibold min-w-[8rem]">Account Name:</span>
                  <input onChange={(e) => setAccountName(e.target.value)} value={accountName} type={"text"} className="w-full sm:w-auto px-3 py-2 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-slate-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"/>
                </div>
                <div className="flex gap-4 mt-6">
                    <Button onClick={() => persistOpportunity()} active={true} title={"Save Opportunity"} />
                    <Button onClick={() => setIsOpportunityCreating(false)} active={true} title={"Cancel"} />
              </div>
            </div>
        </SlideOverModal>
    );
}

export default OpportunityCreate;