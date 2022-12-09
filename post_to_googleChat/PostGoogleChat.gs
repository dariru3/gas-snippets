function PostGoogleChat(url, thread, text) {  
  var payload = {
  "text" : text,
    "thread": {
      "name": thread
    }
  }
  var json = JSON.stringify(payload); //エンコード
  // ポストするためにヘッダーとかボディをまとめて入力する
  var options = {
    "method" : "POST",
    "contentType" : 'application/json; charset=utf-8',
    "payload" : json
  }
  var response = UrlFetchApp.fetch(url, options); //XMLHttpRequestが使えないのでこっちでポスト
  Logger.log(response);
}
