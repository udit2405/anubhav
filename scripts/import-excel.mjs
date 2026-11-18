// Converts data/experts.xlsx -> data/experts.json (what the website reads). Run: npm run import
// Columns starting with PRIVATE_ (mobile, email, age) are NEVER copied to the website data.
import XLSX from "xlsx"; import fs from "node:fs";
if (!fs.existsSync("data/experts.xlsx")) { console.log("data/experts.xlsx not found: using the existing data/experts.json."); process.exit(0); }
const wb = XLSX.readFile("data/experts.xlsx");
const sheet = (n) => (wb.Sheets[n] ? XLSX.utils.sheet_to_json(wb.Sheets[n], { defval: "" }) : []);
const list = (v) => String(v ?? "").split(/[;\n]/).map((s) => s.trim()).filter(Boolean);
const yes = (v, d = false) => (String(v).trim() === "" ? d : /^(y|yes|true|1)$/i.test(String(v).trim()));
const slug = (n) => String(n).toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "").slice(0, 50);
const seen = new Set(); const errors = []; const pros = [];
sheet("Experts").forEach((r, i) => {
  const row = i + 2; if (!String(r.name).trim()) return;
  const status = String(r.status || "approved").trim().toLowerCase();
  const need = ["designation", "department", "city", "state", "years_service", "retirement_year"].filter((k) => String(r[k]).trim() === "");
  if (need.length) { errors.push(`Row ${row} (${r.name}): missing ${need.join(", ")}`); return; }
  let id = String(r.id).trim() || slug(r.name + "-" + r.city); while (seen.has(id)) id += "-2"; seen.add(id);
  const photo = String(r.photo).trim();
  if (photo && !fs.existsSync("public/photos/" + photo)) errors.push(`Row ${row} (${r.name}): photo "${photo}" not found in public/photos/ (card will show initials)`);
  pros.push({ id, userId: null, name: String(r.name).trim(), photo: photo ? "/photos/" + photo : null, city: String(r.city).trim(), state: String(r.state).trim(), department: String(r.department).trim(), designation: String(r.designation).trim(),
    lastPosted: String(r.last_posted).trim(), yearsService: Number(r.years_service), retirementYear: Number(r.retirement_year), education: String(r.education).trim(), category: String(r.category).trim(),
    specializations: list(r.specializations), skills: list(r.skills), services: list(r.services), pricingModels: list(r.pricing_models), fee: r.fee === "" ? null : Number(r.fee), feeNote: String(r.fee_note).trim(),
    availability: list(r.availability), summary: String(r.summary).trim(), languages: list(r.languages), acceptEnquiries: yes(r.accept_enquiries, true), whatsappOptIn: false,
    verified: yes(r.verified), featured: yes(r.featured), sample: yes(r.sample), status: status === "approved" ? "approved" : "pending", visits: 0, createdAt: "2026-01-01T00:00:00Z" });
});
const reviews = sheet("Reviews").filter((r) => r.expert_id && r.text).map((r, i) => ({ id: "rv" + i, professionalId: String(r.expert_id).trim(), clientId: null, clientName: String(r.client_name), rating: Number(r.rating) || 5, text: String(r.text), sample: yes(r.sample), status: "approved", createdAt: "2026-01-01T00:00:00Z" }));
const live = pros.filter((p) => p.status === "approved");
fs.writeFileSync("data/experts.json", JSON.stringify({ professionals: live, reviews }, null, 1));
console.log(`Imported ${live.length} live experts (${pros.length - live.length} not approved, skipped) and ${reviews.length} reviews.`);
if (errors.length) console.log("\nNotes:\n" + errors.map((e) => " - " + e).join("\n"));
