// No tabs or host permissions needed!
console.log("Test should be below");
console.log('Test: ' + $("h3").count);
console.log("Test should be above");
console.log('Activating browserAction block');
// console.log('Turning ' + tab.url + ' red!');

console.log('Activating add_icon.js');
var test = document.getElementById("allowAbsProduct0");
// test.style.backgroundColor="green";

$(document).ready(function() {
  $('a').each(function(index, divBlock){
    $(divBlock).attr('style', "color: green");
  });

  $("div:regex(id, allowAbsProduct\\d)").each(function(index, resultBlock) {
      var prodNums = $(this).find("h3:contains('Product number')");
      if (prodNums.length == 1) {
        var prodNumBlock = prodNums[0],
            prodNumText = prodNumBlock.parentElement.textContent,
            prodNum = prodNumText.replace("Product Number:", "");  // Results in the pure product number

        // Adds link to ordering
        $(this).find("div:contains('English PDF')").append("<br /><a class='click-test' href='#'>Order Now</a>");
      }
  });
  // debugger;

});

$(document).ready(function () {
  $('.click-test').click(function() {
    chrome.runtime.sendMessage({greeting: "hello"}, function(response) {
      console.log(response.farewell);
    });
  });
});

// chrome.runtime.onMessage.addListener(
//   function(request, sender, sendResponse) {
//     console.log(sender.tab ?
//                 "from a content script:" + sender.tab.url :
//                 "from the extension");
//     if (request.greeting == "hello")
//       sendResponse({farewell: "received message!"});
// });

// chrome.tabs.executeScript(null, {file: "add_icon.js"});
// Request case form: https://inside.hbs.edu/Departments/KLS/Lists/HBP%20Case%20Request%20Form/Item/newifs.aspx
// $("input[originalid='V1_I1_T1']").val("blah")
// $("input[originalid='V1_I1_T2']").val("Prod num here")
// $("textarea[originalid='V1_I1_T3']").val("Case title here")

// To-Do:
// 1. Figure out how to open the request page in the popup window
// 2. Upon click, open popup
// 3. Fill in form with information from sendMessage
