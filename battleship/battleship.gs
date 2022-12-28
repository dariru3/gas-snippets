/**
 * Function to add text to cell that has an (topHeader, leftHeader) coordinate
 * @param topHeader {string} Text in top row, e.g. x-coordinate
 * @param leftHeader {string} Text in left-most column, e.g. y-coordinate
 * @param comment {string} Text to add in (x,y) cell
 * @param sheetName {string} Name of target sheet
 */
function main(topHeader, leftHeader, comment) {
//connect to target spreadsheet
const targetSpreadsheet = SpreadsheetApp.getActiveSpreadsheet();
const targetSheetName = "Sheet1";
const targetSheet = targetSpreadsheet.getSheetByName(targetSheetName);
const sheet_values = targetSheet.getDataRange().getValues();
//get 'x' coordinate
const topHeader_col = sheet_values[0].indexOf(topHeader);
//get 'y' coordinate: scan for 'leftHeader' parameter, save row number in 'row'
let row = 0; // save row value here
for(let i = 0; i < sheet_values.length; i++){
    for(let j = 0; j < sheet_values[i].length; j++){
        if(sheet_values[i][j] == leftHeader){
            row = i
        }
    }
}
//paste 'comment' into cell with (topHeader,leftHeader) coordinates
targetSheet.getRange(row+1, topHeader_col + 1).setValue(comment);
}