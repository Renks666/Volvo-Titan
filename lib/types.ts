export type LeadStatus = "new" | "processed";

export interface LeadRecord {
  id: string;
  name: string | null;
  phone: string;
  model: string | null;
  service: string | null;
  comment: string | null;
  status: LeadStatus;
  created_at: string;
}

export interface LeadFormValues {
  name: string;
  phone: string;
  model: string;
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

export interface ReviewRecord {
  id: string;
  author_name: string;
  vehicle_model: string | null;
  rating: number;
  review_text: string;
  review_date: string;
  is_visible: boolean;
  created_at: string;
}

export interface YandexOrgRating {
  value: number;
  count: number;
}
