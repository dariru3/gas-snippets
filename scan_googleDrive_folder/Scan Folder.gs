//Global variables
const ss = SpreadsheetApp.getActiveSpreadsheet();
const sheetName = 'Emailer';
const sh = ss.getSheetByName(sheetName);
//end of global variables

function list_all_files(){
  //connect to save folder
  const folderId = '17eNXY3UduyPdqBYj1GJElPjajuU0Igy8'; //UPDATE save folder
  const folder = DriveApp.getFolderById(folderId);
  const folderName = DriveApp.getFolderById(folderId).getName()

  //check last row in column B
  const lastRow = sh.getRange(1,2).getNextDataCell(SpreadsheetApp.Direction.DOWN).getRow();

  //get current list of id numbers
  const currentData = sh.getRange(1, 2,lastRow).getValues()
  console.log("current data:", currentData);

  let listGdriveFiles = []; //save list of files in Google Folder here
  ss.toast(folderName, "Scanning");
  const files = folder.getFiles();
  while (files.hasNext()){
    file = files.next();
    let row = []; //temp holder
    let fileId = file.getId();
    let filename = file.getName();
    let ppId = filename.split(" ").slice(-1).toString().split(".").slice(0,1); //get participant number at end of filename
    let dateCreated = file.getDateCreated();
    dateCreated = Utilities.formatDate(dateCreated,"Asia/Tokyo", "yyyy/MM/dd");
    row.push(fileId,filename,ppId,dateCreated);
    listGdriveFiles.push(row);
  }
  console.log("source data:", listGdriveFiles);
  
  //compare Google Drive files with list already in sheet, "current data"
  for(let i = 0; i < currentData.length; i++){
    for(let j = 0; j < listGdriveFiles.length; j++){
      if(currentData[i]==listGdriveFiles[j][0]){
        console.log("match found!", currentData[i], listGdriveFiles[j]);
        listGdriveFiles.splice(j,1); //remove file info if match found
        break;
      }
    }
  }
  
  console.log("list:", listGdriveFiles);
  if(listGdriveFiles.length > 0){
    sh.getRange(lastRow+1, 2, listGdriveFiles.length, listGdriveFiles[0].length).setValues(listGdriveFiles);
  } else {
    console.log("No new files")
  }
  SpreadsheetApp.flush()
  addCheckboxes();
  showAlert(listGdriveFiles.length, "scan");
}

function addCheckboxes(){
  const sheetData = sh.getDataRange().getValues();
  const dataCol = sheetData[0].indexOf("File ID");
  const checkboxCol = sheetData[0].indexOf("Check to send");
  console.log("Adding checkboxes..."); //happens to quickly for a toast
  for(let i = 0; i < sheetData.length; i++){
    if(sheetData[i][dataCol] !== "" && sheetData[i][checkboxCol] == ""){
      sh.getRange(i+1, checkboxCol+1).insertCheckboxes();
    }
  }
}
