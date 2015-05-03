// Content script that runs in the background when the user reaches the case search results page on the HBP website

$(document).ready(function() {

  $("tr.searchResult").each(function(index, resultBlock) {
      var prodNums = $(this).find("dt:contains('Product #')");
      if (prodNums.length == 1) {
        var prodNumBlock = prodNums.next(),
            prodNumText = prodNumBlock[0].textContent,
            prodNum = prodNumText.replace("Product number:", ""),
            prodTitle = $(this).find("p.title")[1].textContent;
        // debugger;
        $(this).find("ul.teaching-supplements").append("<li><a class='click-test' style='cursor:pointer' prodNum='" + prodNum + "' prodTitle=\"" + prodTitle + "\">Get That Case!</a></li>");
      }
  });

});

$(document).ready(function () {
  $('.click-test').click(function() {
    var prodNum = $(this)[0].getAttribute("prodNum"),
        prodTitle = $(this)[0].getAttribute("prodTitle");

    chrome.runtime.sendMessage({prodNum: prodNum, prodTitle: prodTitle}, function(response) {
      // Activates popup.js, which is the background script, and passes along the relevant product number and title
    });
  });
});

// window.addEventListener ("load", myMain, false);

// function myMain (evt) {
//   debugger;
// }
