// Content script that runs in the background when the user reaches the case search results page on the HBP website

$(document).ready(function() {

  $("div:regex(id, allowAbsProduct\\d)").each(function(index, resultBlock) {
      var prodNums = $(this).find("h3:contains('Product number')");
      if (prodNums.length == 1) {
        var prodNumBlock = prodNums[0],
            prodNumText = prodNumBlock.parentElement.textContent,
            prodNum = prodNumText.replace("Product number:", ""),
            prodTitle = $(this).find("td.titleBlock").find("h1 a")[0].textContent;  // Results in the pure product number

        $(this).find("div:contains('English PDF')").append("<br /><a class='click-test' href='#' prodNum='" + prodNum + "' prodTitle='" + prodTitle + "'>Get That Case!</a>");
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
