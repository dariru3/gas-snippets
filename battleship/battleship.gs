/**
 * Function to add text to cell that has an (topHeader, leftHeader) coordinate
 * @param topHeader {string} Text in top row, e.g. x-coordinate
 * @param leftHeader {string} Text in left-most column, e.g. y-coordinate
 * @param comment {string} Text to add in (x,y) cell
 * @param sheetName {string} Name of target sheet
 */
function main(topHeader, leftHeader, comment, sheetName) {
//connect to target spreadsheet
const targetSpreadsheet_id = "1QLnJggsEnYd-RgcHIwnf4PrsuR6xc-eqFYIVEe6tsME";
//const targetSpreadsheet = SpreadsheetApp.getActiveSpreadsheet(); //use if script is in the target spreadsheet, remove line above
const targetSpreadsheet = SpreadsheetApp.openById(targetSpreadsheet_id);
const targetSheet = targetSpreadsheet.getSheetByName(sheetName);

//get data from target sheet
const sheet_values = targetSheet.getDataRange().getValues();
const topHeader_col = sheet_values[0].indexOf(topHeader);

let row = 0; // save row value here
//scan for 'leftHeader' parameter, save row number in 'row'
for(let i = 0; i < sheet_values.length; i++){
    for(let j = 0; j < sheet_values[i].length; j++){
    if(sheet_values[i][j] == leftHeader){
        row = i
    }
    }
}
console.log(row);

//paste 'comment' into cell with (topHeader,leftHeader) coordinates
targetSheet.getRange(row+1, topHeader_col + 1).setValue(comment);
}