
chrome.runtime.onMessage.addListener(

  function(request, sender, sendResponse) {
    console.log("received message");
    console.log(sender.tab ?
                "from a content script:" + sender.tab.url :
                "from the extension");

    if (request.greeting == "hello") {
      sendResponse({farewell: "passing back the message!"});
    }

});

// chrome.tabs.executeScript(null, {file: "add_icon.js"});
// Request case form: https://inside.hbs.edu/Departments/KLS/Lists/HBP%20Case%20Request%20Form/Item/newifs.aspx
// $("input[originalid='V1_I1_T1']").val("blah")
// $("input[originalid='V1_I1_T2']").val("Prod num here")
// $("textarea[originalid='V1_I1_T3']").val("Case title here")
