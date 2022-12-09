function useGoogleTranslate() {
  const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  const sheetName = 'Sheet1';
  const sheet = spreadsheet.getSheetByName(sheetName);

  const sheetData = sheet.getDataRange().getValues();

  const startRow = 2;
  const originalTextCol = sheetData[0].indexOf('Original Text');
  const japaneseCol = sheetData[0].indexOf('To Japanese');
  const englishCol = sheetData[0].indexOf('To English');

  for (let i=1; i<sheetData.length; i++){
    let temp = '';
    if(sheetData[i][originalTextCol] !== '')
    temp = LanguageApp.translate(sheetData[i][originalTextCol],'en','ja');
    sheet.getRange(i+1, japaneseCol+1).setValue(temp);
    console.log('\"' + sheetData[i][originalTextCol] + '\" translates to \"' + temp + '\"');
    temp = '';
  }
}
