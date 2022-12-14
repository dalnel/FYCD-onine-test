
$("#send").click(function (){
    
    if(select == "1")
    {
        console.log("1");
        //document.location.href ='review.html?sp=' + $("#sp").val() + '&ep=' + $("#ep").val() + '&rn=' + $("#review_number").val();  
    }
    else if(select == "2")
    {
        console.log("2");
        var sp = $("#sp").val() - 10;
        var ep = $("#ep").val() - 10
        document.location.href ='review.html?sp=' + sp + '&ep=' + ep + '&rn=' + $("#review_number").val();      
    }
    else if(select == "3")
    {
        console.log("3");
        var sp = $("#sp").val() - 10;
        var ep = $("#ep").val() - 10
        //document.location.href ='review.html?sp=' + sp + '&ep=' + ep + '&rn=' + $("#review_number").val();  
    }

})

function get() {
    var url = location.href;
    
    //取得問號之後的值
    var temp = url.split("?");

    //將值再度分開
    var vars = temp[1].split("&");

    //一一顯示出來
    for (var i = 0; i < vars.length; i++) {
     console.log(vars[i]);
     
    };
    console.log(vars[0].split("select=")[1]);
    return vars[0].split("select=")[1];



}
var select = get()