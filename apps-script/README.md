# Lead collector (Google Sheet + instant email)
1. New Google Sheet → **Extensions → Apps Script** → paste `Code.gs`. Set `NOTIFY_EMAIL`.
2. **Deploy → New deployment → Web app**: Execute as *Me*, access *Anyone*. Authorise when asked.
3. Copy the web-app URL. In GitHub: repo **Settings → Secrets and variables → Actions → Variables → New** `LEADS_URL` = that URL.
4. Push any change (or re-run the Pages workflow). Every form on the site now records a row in your Sheet (tab per lead type: callback, expert, saathi_booking, saathi_helper, contact) and emails you.
Test: open the web-app URL in a browser; it should say "Anubhav lead collector is running."
