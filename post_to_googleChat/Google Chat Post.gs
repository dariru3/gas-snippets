/**
 * Function to post messages into Google Chat. 
 * Thread ID optional.
 * @param url {string} Google Chat webhook url
 * @param thread {string} Optional. Thread id. Find in log after inital post (see https://qiita.com/ysk1025/items/033857046456ab964537).
 * @param text {string} Message to post
 */
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
  Logger.log(response); //Find thread id here
}
