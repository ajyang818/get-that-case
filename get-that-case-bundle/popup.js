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
        $(this).find("div:contains('English PDF')").append("<br /><a href='#'>Order Now</a>");
      }
  });
});

// chrome.tabs.executeScript(null, {file: "add_icon.js"});
