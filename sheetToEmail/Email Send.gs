function sendEmail() {
  //connect to spreadsheet
  const SpreadsheetName = "Sheet1";
  const Spreadsheet = SpreadsheetApp.getActiveSheet();
  const Sheet = Spreadsheet.getSheetByName(SpreadsheetName);
  //scan data on sheet
  const dataArray = Sheet.getDataRange().getValues();

  //match columns with column headers (examples)
  const emailCol = dataArray[0].indexOf("email");
  const nameCol = dataArray[0].indexOf("name");
  const item1Col = dataArray[0].indexOf("item1");
  const item2Col = dataArray[0].indexOf("item2");
  const item3Col = dataArray[0].indexOf("item3");
  const statusCol = dataArray[0].indexOf("status");

  //connect html file as email body
  const emailTemplate = "Email Template"; //html filename along with this script
  let templateIndex = HtmlService.createTemplateFromFile(emailTemplate);

  for (let i = 0; i < dataArray.length; i++) {
    let emailAddress = dataArray[i][emailCol];
    let emailName = dataArray[i][nameCol];
    let emailItem1 = dataArray[i][item1Col];
    let emailItem2 = dataArray[i][item2Col];
    let emailItem3 = dataArray[i][item3Col];

    //match above email items to html tags, e.g. <? =emailName ?>
    templateIndex.emailName = emailName;
    templateIndex.emailItem1 = emailItem1;
    templateIndex.emailItem2 = emailItem2;
    templateIndex.emailItem3 = emailItem3;

    //Gmail settings
    let htmlBody = templateIndex.evaluate().getContent();
    let subject = "Subject line can also include " + emailItem1; //example
    let options = { htmlBody };
    //more options: https://developers.google.com/apps-script/reference/gmail/gmail-app#sendemailrecipient,-subject,-body,-options

    //send email
    GmailApp.sendEmail(emailAddress,subject,htmlBody,options);
    sheet.getRange(i+1, statusCol+1).setValue("Email sent") //UX: let user know status of email
    console.log("Email to " + emailAddress + " sent." );
  };
};