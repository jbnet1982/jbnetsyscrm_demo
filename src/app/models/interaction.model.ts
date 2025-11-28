export interface Interaction {
  id: number;
  interactionTypeId: number;
  notes: string;
  date: Date;
  dealId?: number;
  contactId: number;
}