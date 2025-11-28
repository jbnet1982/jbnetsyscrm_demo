export interface Deal {
  id: number;
  name: string;
  stage: 'Lead' | 'Qualified' | 'Proposal' | 'Won' | 'Lost';
  value: number;
  closeDate: Date;
  contactId: number;
  companyId: number;
}