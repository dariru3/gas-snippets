# pdu-gas_modules
Collection of GAS functions for modular use
# Contents
1. Export Sheet as PDF (export_as_pdf)
2. Google Translate class (google_translate)
3. Post to Google Chat (post_to_googleChat)
4. Scan Google Drive folder for files (scan_googleDrive_folder)
5. Google Sheet as Mail Merge (sheetToEmail)

# Misc/Helpful Code (scroll down)
1. Date format
2. Anchor link

TODO: clean up
1. ~~Export Sheet as PDF (export_as_pdf)~~
2. ~~Google Translate class (google_translate)~~
3. ~~Post to Google Chat (post_to_googleChat)~~
4. ~~Scan Google Drive folder for files (scan_googleDrive_folder)~~
5. Google Sheet as Mail Merge (sheetToEmail)
- link to variable creater spreadsheet

## Post to Google Chat
To add a webhook to a chat and how to respond to the same thread
see this Google help [page](https://developers.google.com/chat/how-tos/webhooks#apps-script).

## Misc/Helpful Code
### Format dates
```js
let dateFormat = Utilities.formateDate(dateVariable, 'Asia/Tokyo', 'mm/dd/yy');
```
### Create anchor link (for chat, etc)
```js
const sheetUrl = "https://google.com";
const linkToSheet = "<" + sheetUrl + "|リンク>";
```