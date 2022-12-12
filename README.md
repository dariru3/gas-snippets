# pdu-gas_modules
Collection of GAS functions for modular use
# Contents
1. Export Sheet as PDF (export_as_pdf)
2. Google Translate class (google_translate)
3. Post to Google Chat (post_to_googleChat)
4. Scan Google Drive folder for files (scan_googleDrive_folder)
5. Google Sheet as Mail Merge (sheetToEmail)

TODO: clean up
1. ~~Export Sheet as PDF (export_as_pdf)~~
2. ~~Google Translate class (google_translate)~~
3. Post to Google Chat (post_to_googleChat)
- how to add bot to Google Chat Space
- how to get chat url
- how to get personal id
4. Scan Google Drive folder for files (scan_googleDrive_folder)
5. Google Sheet as Mail Merge (sheetToEmail)

# Post to Google Chat
How to find chat thread
1. Use script to initiate thread (leave "thread" variable blank)
2. View log response
```
"thread": {
    "name": "spaces/AAAAAAAAA/threads/THREAD_ID",
```
3. Insert as "thread" variable everything in quotes after `"name":`