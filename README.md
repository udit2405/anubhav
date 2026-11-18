# Anubhav: marketplace for retired professionals

Static Next.js + Tailwind site. **No database.** Your Excel file is the data.

## Adding or editing experts (your workflow)
1. Open `data/experts.xlsx`, sheet **Experts**. One row per person. Paste in the details from their WhatsApp/email registration.
2. Put their photo in `public/photos/` and write its file name in the `photo` column (e.g. `rajesh.jpg`). No photo = initials are shown.
3. Run `npm run import` (also runs automatically on `npm run build`). It prints any problems, such as missing fields or photos.
4. Commit and push `data/experts.json` (and any new photos). The host rebuilds the site.

**`data/experts.xlsx` is deliberately NOT in git** because it holds private phone numbers and emails. Keep it on your computer and back it up yourself (e.g. Google Drive). Only `data/experts.json`, which contains public fields only, is committed.

Column notes: `status` = approved to publish (anything else is hidden). `verified`, `featured`, `sample` = yes/no. Lists (`specializations`, `skills`, `services`, `pricing_models`, `availability`, `languages`) are separated by `;`. Use the category and specialization names already in the sample rows so filters work.
**`PRIVATE_mobile`, `PRIVATE_email`, `PRIVATE_age` stay in Excel only. The import never copies them to the website.**
Sheet **Reviews** (optional): `expert_id`, `client_name`, `rating`, `text`, `sample`.
`data/experts.xlsx` is empty (headers only). The site shows a “onboarding our first experts” message until you add approved rows.

## How registrations and enquiries reach you
Forms (register, contact, enquiry, requirement, report) build a message that the visitor sends to you on WhatsApp or email (or copies/downloads). Set your number and email in `.env.local` (see `.env.example`).

## Run
```
npm install && npm run dev     # http://localhost:3210
npm run build && npm start
```
`lib/match.ts` is the matching engine (swap for AI later). `lib/i18n.ts` holds the Hindi toggle strings.
