# pdu-gas_modules
Collection of GAS functions for modular use
# Contents (files)
1. Export Sheet as PDF (export_as_pdf)
2. Google Translate class (google_translate)
3. Post to Google Chat (post_to_googleChat)
4. Scan Google Drive folder for files (scan_googleDrive_folder)
5. Google Sheet as Mail Merge (sheetToEmail)
6. Find and set cell value with top header, left column ([battleship](https://en.wikipedia.org/wiki/Battleship_(game)))
7. Show pop-up alert window

# Misc/Helpful Code (scroll down)
1. Post to Google Chat
2. Date format
3. Anchor link
4. Show toast message (small, temporary pop-up message)

## Post to Google Chat
To add a webhook to a chat and how to respond to the same thread
see this Google help [page](https://developers.google.com/chat/how-tos/webhooks#apps-script).

## Format dates
```js
let dateFormat = Utilities.formateDate(dateVariable, 'Asia/Tokyo', 'mm/dd/yy');
```
## Create anchor link (for chat, etc)
```js
const sheetUrl = "https://google.com";
const linkToSheet = "<" + sheetUrl + "|リンク>";
```

## Show toast message
```js
SpreadsheetApp.getActiveSpreadsheet().toast('Task started', 'Status', 3);
```
[source](https://developers.google.com/apps-script/reference/spreadsheet/spreadsheet#toastmsg)
