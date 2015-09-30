// Content script that runs in the background when the user reaches the case search results page on the HBP website

window.addEventListener("load", myMain, false);

function myMain (evt) {
    var prodNums = $(this).find("dt:contains('Product #')");
    var jsInitChecktimer = setInterval(checkForJS_Finish, 111);
    var jsPeriodicChecktimer = setInterval(checkForJS_Finish, 2000);

    function checkForJS_Finish () {
        if (document.querySelector(".product-information") && !(document.querySelector('.gtc-link'))) {
            clearInterval(jsInitChecktimer);
            console.log("checkForJS_Finish ran");
            $("li.hbp-region").each(function(index, resultBlock) {
                var prodNumBlock = $(this).find(".productAvailabilityId"),
                    prodNum = prodNumBlock[0].textContent,
                    prodTitle = $(this).find(".title")[0].textContent;
                $(this).find("div.content-links").append("<li><a class='gtc-link' style='cursor:pointer' prodNum='" + prodNum + "' prodTitle=\"" + prodTitle + "\">Get That Case!</a></li>");
            });
        }

        $(document).ready(function () {
            $('.gtc-link').click(function() {
                var prodNum = $(this)[0].getAttribute("prodNum"),
                    prodTitle = $(this)[0].getAttribute("prodTitle");
                chrome.runtime.sendMessage({prodNum: prodNum, prodTitle: prodTitle}, function(response) {
                    // Activates popup.js, which is the background script, and passes along the relevant product number and title
                });
            });
        });

    }
}
