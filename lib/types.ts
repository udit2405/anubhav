export type Role = "professional" | "client" | "admin";
export type ProStatus = "pending" | "approved" | "rejected" | "suspended";

export interface Professional {
  id: string; userId: string | null; name: string; photo: string | null;
  city: string; state: string; department: string; designation: string; lastPosted: string;
  yearsService: number; retirementYear: number; education: string; category: string;
  specializations: string[]; skills: string[]; services: string[]; pricingModels: string[];
  fee: number | null; feeNote: string; availability: string[]; summary: string; languages: string[];
  acceptEnquiries: boolean; whatsappOptIn: boolean;
  verified: boolean; featured: boolean; sample: boolean; status: ProStatus; visits: number; createdAt: string;
}
/** Private contact details. Never rendered on public pages; owner + admin only (RLS in Supabase). */
export interface ProPrivate { id: string; mobile: string; email: string; age: number | null; mobileVerified: boolean; emailVerified: boolean }
export interface ClientProfile { id: string; userId: string; name: string; email: string; mobile: string; org: string; type: string; city: string; state: string; createdAt: string; suspended: boolean }
export interface Requirement {
  id: string; clientId: string; clientName: string; title: string; description: string; category: string; department: string;
  specializations: string[]; skills: string[]; state: string; city: string; mode: "remote" | "onsite" | "either";
  duration: string; budgetType: string; budgetMin: number | null; budgetMax: number | null; urgency: string;
  status: "open" | "closed" | "removed"; createdAt: string;
}
export interface Enquiry {
  id: string; professionalId: string; professionalName: string; clientId: string; clientName: string; clientEmail: string; clientMobile: string;
  type: "contact" | "consultation" | "requirement"; subject: string; message: string; requirementId: string | null;
  status: "new" | "replied" | "closed"; reply: string; createdAt: string;
}
export interface SavedExpert { id: string; clientId: string; professionalId: string; createdAt: string }
export interface Review { id: string; professionalId: string; clientId: string | null; clientName: string; rating: number; text: string; sample: boolean; status: "approved" | "hidden"; createdAt: string }
export interface Report { id: string; professionalId: string; reporterName: string; reason: string; details: string; status: "open" | "resolved"; createdAt: string }
export interface VerificationDoc { id: string; professionalId: string; kind: string; fileName: string; path: string; status: "pending" | "verified" | "rejected"; createdAt: string }
export interface Department { id: string; name: string; tags: string[]; category: string }
export interface Category { id: string; name: string; icon: string; blurb: string }
export interface Specialization { id: string; name: string }
export interface Visit { id: string; professionalId: string; createdAt: string }
export interface AppUser { id: string; email: string; name: string; role: Role }

export type TableMap = {
  professionals: Professional; professionalPrivate: ProPrivate; clients: ClientProfile; requirements: Requirement; enquiries: Enquiry;
  saved: SavedExpert; reviews: Review; reports: Report; docs: VerificationDoc; departments: Department; categories: Category; specializations: Specialization;
};
export type TableName = keyof TableMap;
