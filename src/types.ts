export type LeadStatus = 'New' | 'Contacted' | 'Qualified' | 'Lost';

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
  stage: 'New' | 'In Progress' | 'Closed';
  amount?: number | null;
  createdAt: Date;
  updatedAt: Date;
}