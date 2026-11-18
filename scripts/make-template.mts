// Creates an EMPTY data/experts.xlsx (headers only). Run: node scripts/make-template.mts
import * as XLSX from "xlsx";
const cols = ["id", "status", "sample", "verified", "featured", "name", "designation", "department", "last_posted", "years_service", "retirement_year", "city", "state", "education", "category", "specializations", "skills", "services", "pricing_models", "fee", "fee_note", "availability", "languages", "summary", "photo", "accept_enquiries", "PRIVATE_mobile", "PRIVATE_email", "PRIVATE_age"];
const wb = XLSX.utils.book_new();
XLSX.utils.book_append_sheet(wb, XLSX.utils.aoa_to_sheet([cols]), "Experts");
XLSX.utils.book_append_sheet(wb, XLSX.utils.aoa_to_sheet([["expert_id", "client_name", "rating", "text", "sample"]]), "Reviews");
XLSX.writeFile(wb, "data/experts.xlsx"); console.log("wrote empty data/experts.xlsx");
