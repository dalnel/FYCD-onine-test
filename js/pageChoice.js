
$("#send").click(function (){

    if(parseInt($("#sp").val()) > parseInt($("#ep").val()))
    {
        alert("起始頁不得大於結束頁");
        var error = true;
    }
    else if($("#sp").val() == "" || $("#ep").val() == "" || $("#review_number").val() == "")
    {
        alert("頁數不可為空白");
        var error = true;
    }
    else
    {
        var error = false;
    }
    
    if(select == "1" && !error)
    {
        console.log("1");
        var sp = $("#sp").val();
        var ep = $("#ep").val();
        document.location.href ='test.html?sp=' + sp + '&ep=' + ep + '&rn=' + $("#review_number").val();     
    }
    else if(select == "2" && !error)
    {
        $(".test").hide();
        console.log("2");
        var sp = $("#sp").val();
        var ep = $("#ep").val();
        document.location.href ='review.html?sp=' + sp + '&ep=' + ep + '&rn=' + $("#review_number").val();      
    }
    else if(select == "3" && !error)
    {
        $(".test").hide();
        console.log("3");
        var sp = $("#sp").val();
        var ep = $("#ep").val();
        document.location.href ='creat.html?sp=' + sp + '&ep=' + ep + '&rn=' + $("#review_number").val();  
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

    if(vars[0].split("select=")[1] == "3")
    {
        $(".test").hide();
    }

    return vars[0].split("select=")[1];



}
var select = get()