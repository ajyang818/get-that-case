// Content script that lives on the case request form website. This is activated by popup.js, and
// attempts to fill in the form on the page with the right info.

$(document).ready(function() {

  chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {

      sendResponse({status: "Received case details"});

      $("input[originalid='V1_I1_T1']").val(request.userEmail);
      $("input[originalid='V1_I1_T2']").val(request.prodNum);
      $("textarea[originalid='V1_I1_T3']").val(request.prodTitle);

  });
});
