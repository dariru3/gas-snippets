/**
 * uncomment to send emails manually
 *
function onOpen() {
  const ui = SpreadsheetApp.getUi();
  ui.createMenu("Sheet To Email")
    .addItem("Send email", "sendEmail")
    .addToUi();
};
*/

function sendEmail() {
  //connect to spreadsheet
  const SpreadsheetName = "Sheet1";
  const Spreadsheet = SpreadsheetApp.getActiveSheet();
  const Sheet = Spreadsheet.getSheetByName(SpreadsheetName);

  const dataArray = Sheet.getDataRange().getValues();

  //name each column
  const emailCol = dataArray[0].indexOf("email");
  const nameCol = dataArray[0].indexOf("name");
  const item1Col = dataArray[0].indexOf("item1");
  const item2Col = dataArray[0].indexOf("item2");
  const item3Col = dataArray[0].indexOf("item3");
  //const mailFlagCol = dataArray[0].indexOf("mail flag"); //uncomment to use checkmarks to send emails
  const statusCol = dataArray[0].indexOf("status");

  //connect html file to email
  const emailTemplate = "emailTemplate";
  let templateIndex = HtmlService.createTemplateFromFile(emailTemplate);

  for (let i = 0; i < dataArray.length; i++) {
    if (dataArray[i][mailFlagCol] === true) {
      let emailAddress = dataArray[i][emailCol];
      let emailName = dataArray[i][nameCol];
      let emailItem1 = dataArray[i][item1Col];
      let emailItem2 = dataArray[i][item2Col];
      let emailItem3 = dataArray[i][item3Col];
      /* to convert date to text
      let dateString = emailItem3.toString()
      dateString = dateString.slice(0,15); //get only the first 15 characters
      */

      //match above email items to hmtl template body
      templateIndex.emailName = emailName;
      templateIndex.emailItem1 = emailItem1;
      templateIndex.emailItem2 = emailItem2;
      templateIndex.emailItem3 = emailItem3;

      let htmlBody = templateIndex.evaluate().getContent();
      let subject = "Subject line can also include " + emailItem1;
      let options = { htmlBody };
      MailApp.sendEmail(emailAddress,subject,_,options);
      //sheet.getRange(i+1, mailFlagCol+1).setValue(false);
      sheet.getRange(i+1, statusCol+1).setValue("Email sent")
      console.log("Email to " + emailAddress + " sent." );
    };
  };
};