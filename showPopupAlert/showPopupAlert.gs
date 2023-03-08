// source: https://developers.google.com/apps-script/guides/dialogs

function onOpen() {
    SpreadsheetApp.getUi() // Or DocumentApp or SlidesApp or FormApp.
        .createMenu('Custom Menu')
        .addItem('Show alert', 'showPopupAlert')
        .addToUi();
  }
  
  function showPopupAlert() {
    const ui = SpreadsheetApp.getUi(); // Same variations.
  
    const result = ui.alert(
       'Please confirm',
       'Are you sure you want to continue?',
        ui.ButtonSet.YES_NO);
  
    // Process the user's response.
    if (result == ui.Button.YES) {
      // User clicked "Yes".
      ui.alert('Confirmation received.');
    } else {
      // User clicked "No" or X in the title bar.
      ui.alert('Permission denied.');
    }
  }