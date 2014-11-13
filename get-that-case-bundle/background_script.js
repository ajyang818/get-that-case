// Background script that receives a signal that the user clicked on "Order now", and then
// pops open a new tab with the case request form. It will then try to fill in the form with the info it received.

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
    chrome.tabs.create({url: requestFormUrl});

    function sendInfoToForm() {
        chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
          chrome.tabs.sendMessage(tabs[0].id, {userEmail: hbsEmail, prodNum: request.prodNum, prodTitle: request.prodTitle}, function(response) {
          });
        });
    }

    window.setTimeout(sendInfoToForm, 1500);

});
