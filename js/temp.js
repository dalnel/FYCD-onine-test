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
    console.log(parseInt(vars[0].split("sp=")[1]));
    console.log(parseInt(vars[1].split("ep=")[1]));
    console.log(parseInt(vars[2].split("rn=")[1]));


}
var sp = get()
