// Content script that lives on the case request form website. This is activated by popup.js, and
// attempts to fill in the form on the page with the right info.

$(document).ready(function() {


  chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {

      sendResponse({status: "Received case details"});

      $("input[originalid='V1_I1_T1']").val(request.userEmail);
      $("input[originalid='V1_I1_T2']").val(request.prodNum);
      $("textarea[originalid='V1_I1_T3']").val(request.prodTitle);

      // Log usage data to Firebase
      var logger = new Firebase("https://get-that-case.firebaseio.com/");
      var now = Date();
      console.log("About to log " + request.prodTitle + "; I am tab ID " + request.tabID);
      logger.push({user: request.userEmail, prodNum: request.prodNum, prodTitle: request.prodTitle, timestamp: now});

  });

  // After the page is loaded and the listener is readied, we can tell
  // the background script that we're ready to receive the form info
  var port = chrome.runtime.connect({name: "formStatus"});
  port.postMessage({status: "formReady"});
  port.disconnect();

});
