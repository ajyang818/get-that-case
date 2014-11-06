// No tabs or host permissions needed!
console.log("Test should be below");
console.log('Test: ' + $("h3").count);
console.log("Test should be above");
console.log('Activating browserAction block');
// console.log('Turning ' + tab.url + ' red!');

console.log('Activating add_icon.js');
var test = document.getElementById("allowAbsProduct0");
test.style.backgroundColor="green";

$(document).ready(function() {
  $('a').each(function(index, divBlock){
    $(divBlock).attr('style', "color: green");
  });
});

// chrome.tabs.executeScript(null, {file: "add_icon.js"});
