/**
 * Function to post messages into Google Chat. 
 * Thread name is optional.
 * @param url {string} Google Chat webhook url
 * @param text {string} Message to post
 * @param threadName {string} Optional. Can be any string.
 */
function postGoogleChat(url, text, threadName) {
  url = threadName ? url+"&threadKey="+threadName : url;
  const options = {
    "method" : "POST",
    "headers": {
      "Content-Type" : 'application/json; charset=UTF-8'
    },
    "payload": JSON.stringify({
      "text": text
    })
  };
  const response = UrlFetchApp.fetch(url, options);
  Logger.log(response);
}
