//Global variables: connect to spreadsheet
const ss = SpreadsheetApp.getActiveSpreadsheet();
const sheetName = 'Sheet1'; //sheet to collect list of files in Google Drive folder
const sh = ss.getSheetByName(sheetName);
//end of global variables

/**
 * Function to list file IDs of all files in a Google Drive folder
 * @param folderId {string} ID of Google Drive folder to scan
 */
function scanGoogleDriveFolder(folderId){
  //connect to save folder using the folder ID
  const folder = DriveApp.getFolderById(folderId);

  //check last row in the first column
  const lastRow = sh.getRange(1,1).getNextDataCell(SpreadsheetApp.Direction.UP).getRow(); //get last row of column A

  //get file id numbers currently listed in spreadsheet
  const currentFileIds = sh.getRange(1, 1,lastRow).getValues(); //assuming list start from A1

  let listGdriveFiles = []; //save list of file IDs in Google Drive folder here
  const files = folder.getFiles();
  while (files.hasNext()){
    let file = files.next();
    let row = []; //temp holder
    let fileId = file.getId();
    let filename = file.getName();
    row.push(fileId,filename,ppId,dateCreated); //not sure pushing to row first is necessary...
    listGdriveFiles.push(row);
  }
  
  //compare Google Drive files with list already in sheet
  for(let i = 0; i < currentFileIds.length; i++){
    for(let j = 0; j < listGdriveFiles.length; j++){
      if(currentFileIds[i]==listGdriveFiles[j][0]){ //comparing only file ID
        listGdriveFiles.splice(j,1); //remove file info if match found
        break;
      }
    }
  };
  
  //paste modified Google Drive folder file ID list starting from the bottom of the current list in spreadsheet
  if(listGdriveFiles.length > 0){ //check if there are any new files to add
    sh.getRange(lastRow+1, 1, listGdriveFiles.length, listGdriveFiles[0].length).setValues(listGdriveFiles);
  } else {
    console.log("No new files");
  };
}
