import { Lead, LeadStatus } from "../types";

function convertDataLead(leadsData: any[]): Lead[] {
  return leadsData.map((lead) => ({
    ...lead,
    status: lead.status as LeadStatus,
    createdAt: new Date(lead.createdAt),
    updatedAt: new Date(lead.updatedAt),
  }));
}

export default convertDataLead;

