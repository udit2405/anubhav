import type { Category, Department, Specialization } from "./types";

export const CATEGORIES: Category[] = [
  { id: "admin", name: "Administration & Governance", icon: "🏛️", blurb: "Policy, district administration, public programmes" },
  { id: "eng", name: "Engineering & Infrastructure", icon: "🏗️", blurb: "Civil, electrical, roads, buildings, water" },
  { id: "fin", name: "Finance & Banking", icon: "🏦", blurb: "Banking, audit, accounts, credit, taxation" },
  { id: "def", name: "Defence & Security", icon: "🛡️", blurb: "Armed forces, security, logistics, training" },
  { id: "legal", name: "Legal & Compliance", icon: "⚖️", blurb: "Law, regulation, contracts, vigilance" },
  { id: "health", name: "Healthcare", icon: "🩺", blurb: "Doctors, hospital administration, public health" },
  { id: "edu", name: "Education & Research", icon: "🎓", blurb: "Teaching, curriculum, science and research" },
  { id: "rail", name: "Railway & Transportation", icon: "🚆", blurb: "Railways, roadways, logistics, traffic" },
  { id: "proc", name: "Procurement & Operations", icon: "📦", blurb: "Tenders, purchasing, stores, supply chain" },
  { id: "it", name: "Technology & IT", icon: "💻", blurb: "e-Governance, systems, data, telecom" },
  { id: "hr", name: "Human Resources", icon: "🤝", blurb: "Recruitment, training, labour and service matters" },
  { id: "consult", name: "Consulting & Advisory", icon: "🧭", blurb: "Strategy, business advisory, mentoring" },
];
export const CATEGORY_NAMES = CATEGORIES.map((c) => c.name);
const C = Object.fromEntries(CATEGORIES.map((c) => [c.id, c.name]));

type D = [string, string[], string]; // name, tags, category id
const RAW: D[] = [
  ["Indian Railways", ["rail", "railway", "irse", "irps"], "rail"], ["Railway Board", ["rail", "railway"], "rail"],
  ["Railway Protection Force", ["rail", "railway", "rpf", "security"], "def"], ["Railway Recruitment Board", ["rail", "railway", "rrb", "recruitment"], "hr"],
  ["Ministry of Defence", ["def", "defence", "defense", "mod"], "def"], ["Indian Army", ["def", "defence", "army"], "def"],
  ["Indian Air Force", ["def", "defence", "iaf", "air"], "def"], ["Indian Navy", ["def", "defence", "navy"], "def"],
  ["Defence Research and Development Organisation", ["def", "defence", "drdo", "scientist"], "edu"],
  ["Ordnance Factory Board", ["def", "defence", "ordnance"], "def"], ["Border Security Force", ["def", "defence", "bsf", "paramilitary"], "def"],
  ["Central Reserve Police Force", ["def", "defence", "crpf", "paramilitary"], "def"],
  ["State Bank of India", ["bank", "sbi", "banking"], "fin"], ["Reserve Bank of India", ["bank", "rbi", "banking", "central bank"], "fin"],
  ["Punjab National Bank", ["bank", "pnb", "banking"], "fin"], ["Bank of Baroda", ["bank", "bob", "banking"], "fin"],
  ["Canara Bank", ["bank", "banking"], "fin"], ["Bank of India", ["bank", "boi", "banking"], "fin"], ["Union Bank of India", ["bank", "banking"], "fin"],
  ["Central Bank of India", ["bank", "banking"], "fin"], ["Indian Overseas Bank", ["bank", "iob", "banking"], "fin"], ["UCO Bank", ["bank", "banking"], "fin"],
  ["Life Insurance Corporation of India", ["insurance", "lic"], "fin"], ["General Insurance Corporation", ["insurance", "gic"], "fin"],
  ["NABARD", ["bank", "agriculture", "rural", "development bank"], "fin"], ["Income Tax Department", ["tax", "income tax", "cbdt"], "fin"],
  ["Central Board of Indirect Taxes and Customs", ["tax", "customs", "gst", "excise", "cbic"], "fin"], ["Comptroller and Auditor General of India", ["audit", "cag", "accounts"], "fin"],
  ["Indian Audit and Accounts Department", ["audit", "accounts", "iaad"], "fin"],
  ["Indian Administrative Service (IAS)", ["ias", "civil services", "administration", "collector"], "admin"], ["Indian Police Service (IPS)", ["ips", "police", "civil services"], "admin"],
  ["Indian Foreign Service (IFS)", ["ifs", "diplomat", "foreign", "civil services"], "admin"], ["Rajasthan Administrative Service (RAS)", ["ras", "rajasthan", "administration", "state services"], "admin"],
  ["Government of Rajasthan", ["rajasthan", "state government", "state"], "admin"], ["Government of Uttar Pradesh", ["uttar pradesh", "up", "state government"], "admin"],
  ["Government of Madhya Pradesh", ["madhya pradesh", "mp", "state government"], "admin"], ["Government of Maharashtra", ["maharashtra", "state government"], "admin"],
  ["Government of Gujarat", ["gujarat", "state government"], "admin"], ["Government of Punjab", ["punjab", "state government"], "admin"],
  ["Government of Karnataka", ["karnataka", "state government"], "admin"], ["Government of Tamil Nadu", ["tamil nadu", "state government"], "admin"],
  ["Government of West Bengal", ["west bengal", "bengal", "state government"], "admin"], ["Government of Bihar", ["bihar", "state government"], "admin"],
  ["Government of Haryana", ["haryana", "state government"], "admin"], ["Government of Kerala", ["kerala", "state government"], "admin"],
  ["Government of India (Central Secretariat)", ["central government", "secretariat", "ministry"], "admin"], ["District Administration", ["collectorate", "district", "revenue"], "admin"],
  ["Revenue Department", ["revenue", "tehsil", "patwari"], "admin"], ["Municipal Corporation", ["municipal", "nagar nigam", "urban local body"], "admin"],
  ["Urban Development Authority", ["uda", "jda", "urban", "town planning"], "eng"], ["Jaipur Development Authority", ["jda", "urban", "town planning"], "eng"],
  ["Panchayati Raj Department", ["panchayat", "rural", "gram"], "admin"], ["Rural Development Department", ["rural", "mgnrega", "gram"], "admin"],
  ["Public Works Department (PWD)", ["pwd", "public works", "civil", "roads", "buildings"], "eng"], ["Central Public Works Department (CPWD)", ["cpwd", "pwd", "public works", "civil"], "eng"],
  ["Public Health Engineering Department (PHED)", ["phed", "water", "public health engineering"], "eng"], ["Irrigation Department", ["irrigation", "water resources", "canal"], "eng"],
  ["National Highways Authority of India", ["nhai", "highway", "roads"], "eng"], ["Water Resources Department", ["water", "irrigation", "dam"], "eng"],
  ["State Electricity Board", ["electricity", "power", "discom", "rvpn", "vidyut"], "eng"], ["Power Grid Corporation of India", ["power", "electricity", "grid"], "eng"],
  ["National Thermal Power Corporation (NTPC)", ["ntpc", "power", "thermal"], "eng"], ["Bharat Heavy Electricals Limited (BHEL)", ["bhel", "heavy", "engineering"], "eng"],
  ["Oil and Natural Gas Corporation (ONGC)", ["ongc", "oil", "gas", "petroleum"], "eng"], ["Indian Oil Corporation", ["iocl", "oil", "petroleum"], "eng"],
  ["Steel Authority of India (SAIL)", ["sail", "steel", "psu"], "eng"], ["Coal India Limited", ["coal", "mining", "psu"], "eng"],
  ["Bharat Sanchar Nigam Limited (BSNL)", ["bsnl", "telecom", "telephone"], "it"], ["Department of Telecommunications", ["telecom", "dot"], "it"],
  ["National Informatics Centre (NIC)", ["nic", "e-governance", "it", "informatics"], "it"], ["Department of Information Technology", ["it", "e-governance", "technology"], "it"],
  ["Indian Space Research Organisation (ISRO)", ["isro", "space", "scientist"], "edu"], ["Council of Scientific and Industrial Research (CSIR)", ["csir", "scientist", "research"], "edu"],
  ["Indian Council of Agricultural Research (ICAR)", ["icar", "agriculture", "scientist", "research"], "edu"], ["Bhabha Atomic Research Centre (BARC)", ["barc", "atomic", "scientist"], "edu"],
  ["Indian Council of Medical Research (ICMR)", ["icmr", "medical", "research"], "health"],
  ["Government Hospital", ["hospital", "medical", "doctor", "health"], "health"], ["Medical and Health Department", ["medical", "health", "doctor", "cmo"], "health"],
  ["AIIMS", ["aiims", "hospital", "medical"], "health"], ["Employees' State Insurance Corporation", ["esic", "esi", "insurance", "hospital"], "health"],
  ["Government College", ["college", "professor", "education", "teacher"], "edu"], ["Government School", ["school", "teacher", "principal", "education"], "edu"],
  ["Department of Education", ["education", "teacher", "school", "dpi"], "edu"], ["University (State / Central)", ["university", "professor", "education"], "edu"],
  ["University Grants Commission", ["ugc", "university", "education"], "edu"], ["NCERT", ["ncert", "education", "curriculum"], "edu"],
  ["Kendriya Vidyalaya Sangathan", ["kvs", "kendriya", "school", "teacher"], "edu"],
  ["High Court", ["court", "judge", "judiciary", "legal"], "legal"], ["District and Sessions Court", ["court", "judge", "judiciary", "legal"], "legal"],
  ["Supreme Court of India", ["court", "judge", "judiciary", "legal"], "legal"], ["Law and Judicial Department", ["law", "legal", "judicial"], "legal"],
  ["Central Vigilance Commission", ["cvc", "vigilance", "compliance"], "legal"], ["Lokayukta", ["vigilance", "anti corruption", "ombudsman"], "legal"],
  ["Anti-Corruption Bureau", ["acb", "vigilance", "police"], "legal"], ["Central Bureau of Investigation", ["cbi", "investigation", "police"], "legal"],
  ["Securities and Exchange Board of India", ["sebi", "securities", "regulator"], "legal"], ["Competition Commission of India", ["cci", "regulator"], "legal"],
  ["Directorate General of Supplies and Disposals", ["dgsd", "procurement", "supplies", "stores"], "proc"], ["Government e-Marketplace (GeM)", ["gem", "procurement", "tender", "e-marketplace"], "proc"],
  ["Food Corporation of India", ["fci", "food", "grain", "warehouse"], "proc"], ["Central Warehousing Corporation", ["cwc", "warehouse", "logistics"], "proc"],
  ["Stores and Purchase Department", ["stores", "purchase", "procurement"], "proc"],
  ["India Post", ["post", "postal", "dak"], "admin"], ["State Road Transport Corporation", ["srtc", "rsrtc", "roadways", "bus", "transport"], "rail"],
  ["Airports Authority of India", ["aai", "airport", "aviation"], "rail"], ["Civil Aviation Department", ["aviation", "dgca"], "rail"],
  ["Transport Department", ["transport", "rto", "vehicle"], "rail"], ["Container Corporation of India", ["concor", "logistics", "container"], "rail"],
  ["Shipping Corporation of India", ["sci", "shipping", "port"], "rail"], ["Port Trust", ["port", "shipping", "maritime"], "rail"],
  ["Labour Department", ["labour", "labor", "hr", "industrial relations"], "hr"], ["Employees' Provident Fund Organisation", ["epfo", "pf", "provident"], "hr"],
  ["Union Public Service Commission", ["upsc", "recruitment"], "hr"], ["State Public Service Commission", ["rpsc", "psc", "recruitment"], "hr"],
  ["Department of Personnel and Training", ["dopt", "personnel", "training"], "hr"], ["Forest Department", ["forest", "wildlife", "environment"], "admin"],
  ["Agriculture Department", ["agriculture", "farming", "krishi"], "admin"], ["Cooperative Department", ["cooperative", "society"], "admin"],
  ["Statistics Department (NSSO / DES)", ["statistics", "nsso", "survey", "data"], "consult"], ["Planning Commission / NITI Aayog", ["niti", "planning", "policy"], "consult"],
  ["Tourism Department", ["tourism", "heritage"], "admin"], ["Police Department (State)", ["police", "sp", "dsp", "law and order"], "admin"],
  ["Fire Services", ["fire", "disaster"], "admin"], ["Disaster Management Authority", ["disaster", "ndma", "sdma"], "admin"],
];
export const DEPARTMENTS: Department[] = RAW.map(([name, tags, cat], i) => ({ id: "d" + (i + 1), name, tags, category: C[cat] }));

export const SPECIALIZATIONS: Specialization[] = [
  "Government Tendering", "Project Management", "Civil Engineering", "Financial Advisory", "Procurement", "Regulatory Compliance", "Government Liaison",
  "Infrastructure Planning", "Auditing", "Training", "Strategic Consulting", "Documentation", "Administration", "Banking Operations", "Credit & Loan Appraisal",
  "Electrical Engineering", "Mechanical Engineering", "Railway Operations", "Track & Bridge Engineering", "Defence Logistics", "Security Management",
  "Legal Drafting", "Vigilance & Inquiry", "Public Health", "Hospital Administration", "Curriculum Development", "Research & Development", "Quality Assurance",
  "Land & Revenue Matters", "Urban Planning", "Water Supply & Irrigation", "e-Governance & IT", "HR & Service Matters", "Taxation (Income Tax / GST)", "Disaster Management",
  "Mentoring & Career Guidance", "Policy Analysis", "Contract Management", "Environmental Clearances", "Agriculture & Rural Development",
].map((name, i) => ({ id: "s" + (i + 1), name }));

export const SERVICES = ["Freelance Consulting", "One-on-One Consultation", "Project-Based Work", "Mentorship", "Training and Workshops", "Technical Advisory", "Documentation Support", "Part-Time Employment", "Full-Time Employment", "Business Advisory"];
export const PRICING = ["Free Services", "Hourly Charges", "Per Consultation", "Project-Based Pricing", "Monthly Retainer", "Negotiable"];
export const AVAILABILITY = ["Available Immediately", "Available Part-Time", "Available Remotely", "Available for On-Site Projects", "Available for Travel"];
export const QUALIFICATIONS = ["Diploma", "Graduate (B.A./B.Sc./B.Com.)", "B.E. / B.Tech.", "M.E. / M.Tech.", "MBBS / MD / MS", "LLB / LLM", "MBA / PGDM", "Post-graduate (M.A./M.Sc./M.Com.)", "Ph.D.", "CA / CMA / CS", "Other"];
export const DESIGNATIONS = ["Executive Engineer", "Superintending Engineer", "Chief Engineer", "Assistant Engineer", "Bank Manager", "Chief Manager", "Deputy General Manager", "General Manager", "Administrative Officer", "District Collector", "Additional Collector", "Section Officer", "Deputy Secretary", "Joint Secretary", "Senior Scientist", "Scientist 'G'", "Colonel", "Brigadier", "Lieutenant Colonel", "Wing Commander", "Commodore", "Chief Medical Officer", "Principal", "Professor", "Senior Accounts Officer", "Chief Accounts Officer", "Station Master", "Divisional Railway Manager", "Judge", "Superintendent of Police", "Inspector General"];
export const STATES = ["Andhra Pradesh", "Assam", "Bihar", "Chandigarh", "Chhattisgarh", "Delhi", "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jammu & Kashmir", "Jharkhand", "Karnataka", "Kerala", "Madhya Pradesh", "Maharashtra", "Odisha", "Punjab", "Rajasthan", "Tamil Nadu", "Telangana", "Uttar Pradesh", "Uttarakhand", "West Bengal", "Other"];
export const CITIES = ["Jaipur", "Jodhpur", "Udaipur", "Kota", "Ajmer", "Bikaner", "Delhi", "New Delhi", "Gurugram", "Noida", "Lucknow", "Kanpur", "Bhopal", "Indore", "Mumbai", "Pune", "Nagpur", "Ahmedabad", "Chandigarh", "Bengaluru", "Chennai", "Hyderabad", "Kolkata", "Patna", "Ranchi", "Dehradun", "Bhubaneswar"];
export const EXAMPLE_SEARCHES = ["Retired railway engineers", "Retired IAS officers in Rajasthan", "Retired bank managers", "Government procurement consultants", "Retired civil engineers in Jaipur", "Retired defence officers", "Retired government accountants"];
export const DISCLAIMER = "Listed professionals are independent individuals. They do not represent, and are not endorsed by, any government department, bank, PSU or organisation they previously served.";
export const CLIENT_DRAFT = "anubhav:clientdraft:v1";
