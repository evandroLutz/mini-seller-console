export type LeadStatus = 'New' | 'Contacted' | 'Qualified' | 'Lost';
export type OpportunityStage = | 'New' | 'Qualified' | 'Proposal' | 'Negotiation' | 'Closed Won' | 'Closed Lost';
export interface Lead {
  id: string;
  name: string;
  company: string;
  email: string;
  phone?: string;
  status: LeadStatus;
  createdAt: Date;
  updatedAt: Date;
  source: string;
  score: number;
}

export interface Opportunity {
  id: string;
  leadId: string;
  stage: 'New' | 'Qualified' | 'Proposal' | 'Negotiation' | 'Closed Won' | 'Closed Lost';
  name: string,
  accountName: string,
  amount?: number | null;
  createdAt: Date;
}