$("#test").click(function () {
    //$(location).attr("href","./pageChoice.html?select=1");
    alert("即將推出，目前僅開放複習");
})

$("#review").click(function () {
    $(location).attr("href","./pageChoice.html?select=2");
})

$("#creat").click(function () {
    $(location).attr("href","./pageChoice.html?select=3");
    //alert("即將推出，目前僅開放複習");

})