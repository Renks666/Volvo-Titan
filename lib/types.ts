export type LeadStatus = "new" | "processed";

export interface LeadRecord {
  id: string;
  name: string | null;
  phone: string;
  service: string | null;
  comment: string | null;
  status: LeadStatus;
  created_at: string;
}

export interface LeadFormValues {
  name: string;
  phone: string;
  service: string;
  comment: string;
}

export interface ActionResult {
  success: boolean;
  message: string;
}

export interface AuthActionState {
  success: boolean;
  message: string;
}
