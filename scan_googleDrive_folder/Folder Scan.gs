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
  const folderName = DriveApp.getFolderById(folderId).getName()

  //check last row in the first column
  const lastRow = sh.getRange(1,1).getNextDataCell(SpreadsheetApp.Direction.DOWN).getRow(); //start at A1 (1,1) and look down

  //get file id numbers currently listed in spreadsheet
  const currentFileIds = sh.getRange(1, 1,lastRow).getValues(); //assuming list start from A1
  console.log("current file IDs:", currentFileIds);

  let listGdriveFiles = []; //save list of file IDs in Google Drive folder here
  ss.toast(folderName, "Scanning"); //UX
  const files = folder.getFiles();
  while (files.hasNext()){
    let file = files.next();
    let row = []; //temp holder
    let fileId = file.getId();
    let filename = file.getName();
    let ppId = filename.split(" ").slice(-1).toString().split(".").slice(0,1); //optional: example of how to identify a file by using the end of the filename
    let dateCreated = file.getDateCreated(); //optional
    //dateCreated = Utilities.formatDate(dateCreated,"Asia/Tokyo", "yyyy/MM/dd");
    row.push(fileId,filename,ppId,dateCreated); //not sure pushing to row first is necessary...
    listGdriveFiles.push(row);
  }
  console.log("source data: ", listGdriveFiles);
  
  //compare Google Drive files with list already in sheet
  for(let i = 0; i < currentFileIds.length; i++){
    for(let j = 0; j < listGdriveFiles.length; j++){
      if(currentFileIds[i]==listGdriveFiles[j][0]){ //comparing only file ID
        console.log("match found!", currentFileIds[i], listGdriveFiles[j]);
        listGdriveFiles.splice(j,1); //remove file info if match found
        break;
      }
    }
  };
  
  console.log("modified list: ", listGdriveFiles);
  //paste modified Google Drive folder file ID list starting from the bottom of the current list in spreadsheet
  if(listGdriveFiles.length > 0){ //check if there are any new files to add
    sh.getRange(lastRow+1, 1, listGdriveFiles.length, listGdriveFiles[0].length).setValues(listGdriveFiles);
    ss.toast(listGdriveFiles.length, "Number of files added") //UX
  } else {
    console.log("No new files");
    ss.toast("No new files"); //UX
  };
}
