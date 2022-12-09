/**
 * Function to export sheet or sheets as PDF
 * and save them in a particular folder.
 * @param folderId {string} Folder ID for saving exported PDF
 * @param ssId {string} Source spreadsheet ID
 * @param sheetId {string} Source sheet ID
 * @param filenames {string} Filename of exported PDF
 * @returns PDF file
 */
function exportAsPdf(folderId, ssId, sheetId, filenames) {
  var folder   = DriveApp.getFolderById(folderId);
  var url    = 'https://docs.google.com/spreadsheets/d/'+ ssId +'/export?';
  var opts   = {
    exportFormat: 'pdf',     // ファイル形式の指定 pdf / csv / xls / xlsx
    format:       'pdf',     // ファイル形式の指定 pdf / csv / xls / xlsx
    size:         'A4',      // 用紙サイズの指定 legal / letter / A4
    portrait:     'true',    // true → 縦向き、false → 横向き
    //scale:        '4',       // 1: Normal 100%, 2: Fit to width, 3: Fit to height, 4: Fit to Page
    fitw:         'true',    // 幅を用紙に合わせるか
    sheetnames:   'false',   // シート名を PDF 上部に表示するか
    printtitle:   'false',   // スプレッドシート名を PDF 上部に表示するか
    pagenumbers:  'false',   // ページ番号の有無
    gridlines:    'false',   // グリッドラインの表示有無
    fzr:          'false',   // 固定行の表示有無
    //range :       'A1%3AA1', // 対象範囲「%3A」 = :, A1:A1  
    gid:           sheetId      // シート ID を指定 (指定のない場合、スプレッドシート全体をダウンロード)
  };
  var urlExt = [];
  for(optName in opts){
    urlExt.push(optName + '=' + opts[optName]);
  }
  var options  = urlExt.join('&');
  var token    = ScriptApp.getOAuthToken();
  var response = UrlFetchApp.fetch(url + options, {
      headers: {
        'Authorization': 'Bearer ' +  token
      }
    });
  var blob = response.getBlob().setName(filenames + '.pdf');
  var newPdf = folder.createFile(blob);
  return newPdf;
} 