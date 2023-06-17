function startTimers() {
    doTmr(new Date('1/23/2023 20:00:00 UTC'), "tmr-starts", "Presale has STARTED. Refresh website!", true);
    // doTmr(new Date('1/25/2023 16:30:00 UTC'), "tmr-public", "Presale is PUBLIC");
    // doTmr(new Date('12/25/2023 16:00:00 UTC'), "tmr-ends", "Presale has ENDED! <br/> Launch Tomorrow 11pm UTC", true);
}



function doTmr(date, elementId, endMsg, doAlert) {
    var countDownDate = date.getTime();
    var element = document.getElementById(elementId);

    // Update the count down every 1 second
    var x = setInterval(function() {
        // Get today's date and time
        var now = new Date().getTime();

        // Find the distance between now and the count down date
        var distance = countDownDate - now;

        // Time calculations for days, hours, minutes and seconds
        var days = Math.floor(distance / (1000 * 60 * 60 * 24));
        var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        var seconds = Math.floor((distance % (1000 * 60)) / 1000);

        // Output the result in an element with id="demo"
        var hoursStr = getFormatted(hours);
        var minsStr = getFormatted(minutes);
        var secsStr = getFormatted(seconds);

        element.innerHTML = (days > 0 ? (days + "D ") : "") + hoursStr + ":" + minsStr + ":" + secsStr;

        // If the count down is over, write some text 
        if (distance < 0) {
            clearInterval(x);
            element.innerHTML = endMsg;
            setTimeout(function() {
                if (doAlert) {
                    //alert(endMsg);
                }
            }, 100);
        }
    }, 1000);
}

function getFormatted(t) {
    if (t < 10) {
        return "0" + t;
    }
    return t;
}
startTimers();