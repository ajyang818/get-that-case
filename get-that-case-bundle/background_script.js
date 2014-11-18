// Background script that receives a signal that the user clicked on "Order now", and then
// pops open a new tab with the case request form. It will then try to fill in the form with the info it received.

// var logger = new Firebase("https://get-that-case.firebaseio.com/");

chrome.runtime.onMessage.addListener(

  function(request, sender, sendResponse) {

    var hbsEmail = "";

    chrome.cookies.getAll({name: "HBSCOOKIE"}, function(cookies){
        var hbsCookie = cookies[0],
            hbsCookieValue = hbsCookie.value;

        hbsEmail = hbsCookieValue.split(":")[0];
    });

    sendResponse({prodNum: request.prodNum, prodTitle: request.prodTitle});

    var requestFormUrl = 'https://inside.hbs.edu/Departments/KLS/Lists/HBP%20Case%20Request%20Form/Item/newifs.aspx';

    // We get this script to listen for a signal that the newly opened tab (case request form) is ready.
    // When we get that signal, this background script will send over the form data.

    // debugger;
    chrome.runtime.onConnect.addListener(function(port) {

      console.assert(port.name == "formStatus");
      port.onMessage.addListener(function(msg) {
        if (msg.status == "formReady") {
            chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
              chrome.tabs.sendMessage(tabs[0].id, {userEmail: hbsEmail, prodNum: request.prodNum, prodTitle: request.prodTitle, tabID: tabs[0].id}, function(response) {
                // The below is being called twice
                console.log("sent message for " + request.prodTitle + " to tab ID " + tabs[0].id);
              });
            });
            // // Log usage data to Firebase
            // var now = Date();
            // logger.push({user: hbsEmail, prodNum: request.prodNum, prodTitle: request.prodTitle, timestamp: now});
        }
      });


    });

    chrome.tabs.create({url: requestFormUrl});

});
