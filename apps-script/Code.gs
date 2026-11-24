/**
 * Anubhav lead collector (Google Apps Script).
 * 1. Create a Google Sheet named "Anubhav Leads".  2. Extensions → Apps Script → paste this file.
 * 3. Set NOTIFY_EMAIL below.  4. Deploy → New deployment → Web app → Execute as: Me, Who has access: Anyone.
 * 5. Copy the Web app URL into the GitHub repo variable LEADS_URL (Settings → Secrets and variables → Actions → Variables).
 * Each lead type (plan, expert, saathi_booking, saathi_helper, contact) gets its own tab. New fields add columns automatically.
 */
var NOTIFY_EMAIL = "you@example.com";   // <-- change: instant email on every new lead ("" to disable)

function doPost(e) {
  var lock = LockService.getScriptLock(); lock.waitLock(20000);
  try {
    var d = JSON.parse(e.postData.contents);
    var type = String(d.type || "other").replace(/[^a-z0-9_]/gi, "_");
    var ss = SpreadsheetApp.getActiveSpreadsheet();
    var sh = ss.getSheetByName(type) || ss.insertSheet(type);
    var lastCol = Math.max(sh.getLastColumn(), 1);
    var headers = sh.getLastRow() ? sh.getRange(1, 1, 1, lastCol).getValues()[0].filter(String) : [];
    Object.keys(d).forEach(function (k) { if (headers.indexOf(k) < 0) headers.push(k); });
    sh.getRange(1, 1, 1, headers.length).setValues([headers]).setFontWeight("bold");
    sh.appendRow(headers.map(function (h) { var v = d[h]; return Array.isArray(v) ? v.join("; ") : (v === undefined ? "" : v); }));
    if (NOTIFY_EMAIL) {
      var hot = d.lead_score ? " [" + d.lead_score + "]" : "";
      var body = Object.keys(d).map(function (k) { return k + ": " + (Array.isArray(d[k]) ? d[k].join("; ") : d[k]); }).join("\n");
      MailApp.sendEmail(NOTIFY_EMAIL, "New Anubhav lead: " + type + hot + (d.name ? " - " + d.name : ""), body);
    }
    return ContentService.createTextOutput("ok");
  } catch (err) { return ContentService.createTextOutput("error: " + err); }
  finally { lock.releaseLock(); }
}
function doGet() { return ContentService.createTextOutput("Anubhav lead collector is running."); }
