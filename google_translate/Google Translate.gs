/**
 * Function to translate text in spreadsheet from source language to target language
 * @param sourceHeader {string} Name of column header to get original text
 * @param targetHeader {string} Name of column header to paste translated text
 */
function useGoogleTranslate(sourceHeader, targetHeader) {
  //connect to spreadsheet
  const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  const sheetName = 'Sheet1';
  const sheet = spreadsheet.getSheetByName(sheetName);
  const sheetData = sheet.getDataRange().getValues();

  //use column headers to get and set text
  const originalTextCol = sheetData[0].indexOf(sourceHeader);
  const translatedTextCol = sheetData[0].indexOf(targetHeader);

  //scan for text to translate
  for (let i=1; i<sheetData.length; i++){
    if(sheetData[i][originalTextCol] == ''){
      continue
    }
    let temp = LanguageApp.translate(sheetData[i][originalTextCol],'ja','en'); //translate from Japanese (ja) to English (en)
    console.log('Original: ', sheetData[i][originalTextCol], 'n\Translation: ', temp);
    sheet.getRange(i+1, translatedTextCol+1).setValue(temp);
    temp = '';
  }
}
