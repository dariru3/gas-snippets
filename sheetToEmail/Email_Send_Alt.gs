/**
 * Example to use an Object to save sheet headers
 * and skip having to write extra code
 */
function sendEmailAlt(){
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Sheet1");
    const data = sheet.getDataRange().getValues();
    const lastCol = sheet.getLastColumn();
    const headersText = sheet.getRange(1,1,1,lastCol).getValues();
  
    const headersObj = {};
    for (let i = 0; i < headersText.length; i++) {
        const header = headersText[i];
        headersObj[`${header}_Col`] = data[0].indexOf(header);
    }

    for(i=1; i<data.length; i++){
      const emailAddress = data[i][headersObj['Email_Col']];
      const emailName = data[i][headersObj['Name_Col']];
      const emailItem1 = data[i][headersObj['Item 1_Col']];
      const emailItem2 = data[i][headersObj['Item 2_Col']];
      const emailItem3 = data[i][headersObj['Item 3_Col']];
      //etc...
    }
}