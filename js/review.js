let fullAnswer = [];
let fuzzyAnswer = [];
let fuzzy_temp =[];
let question = "";


function creatQuestion(sp,ep, rn) {
    $.ajax({
        url: "../QA_new.json",//同文件夕下的json文件路径
        type: "GET",//请求方式为get
        dataType: "json", //返回数据格式为json
        success: function (data) {//请求成功完成后要执行的方法 
            console.log("---------");
            //console.log(count2);
            /*$("#q1").text(data[0].question[0]);
            $("#a1_full").text(data[0].answer_full[0]);
            $("#a1_fuzzy").text(data[0].answer_fuzzy[0]);*/
            for (let i = 0; i < rn; i++) {
                let j = getRandom(sp,ep); //隨機生成頁數
                let k = Object.keys(data[j].question).length;
                let l = Math.floor(Math.random() * k); //隨機生成上面頁數下的題數
                fullAnswer.push(data[j].answer_full[l]); //儲存完整的答案

                //console.log(data[j].question[l], data[j].answer_fuzzy[l] ,k, l);
                for(let y = 0; y < data[j].answer_fuzzy[l].length; y ++)
                {
                    fuzzy_temp.push(data[j].answer_fuzzy[l][y]);
                } //儲存模糊答案

                creat(data[j].question[l], i, data[j].answer_full[l], fuzzy_temp, data[j].page)
                fuzzy_temp = [];
            }
        }
    })
}

function creat(question, i, answer_full, answer_fuzzy, p) {
    var el = $(".all");
    var aa = `<section class="main">
    <p>
        <label style="font-size:17px">問題(P${p})：</label> 
    </p>
    <h1 id="q${i}">${question}</h1> 

    <p id="a${i}">
        <label>答案:</label>
    </p> 

    <div>
    <h1 id="afl_${i}">${answer_full}</h1>
    </div> 

    <p id="a${i}">
    <label>關鍵詞:</label>
    </p> 
    
    <div>
    <h1 id="afz_${i}">${answer_fuzzy}</h1>
    </div>                   
     
    </section>`;
    el.append(aa);
}

$("#send").click(function () {

    $(".all").html("");
    init();

});

function getRandom(min,max){
    /*console.log(min);
    console.log(max);
    console.log(Math.floor(Math.random()*(max-min+1)+min));*/
    return Math.floor(Math.random()*(max-min+1)+min);
};

function init() {
    var url = location.href;
    
    //取得問號之後的值
    var temp = url.split("?");

    //將值再度分開
    var vars = temp[1].split("&");

    //一一顯示出來
    for (var i = 0; i < vars.length; i++) {
     console.log(vars[i]);   
    };
    /*console.log(vars[0].split("sp=")[1]);
    console.log(vars[1].split("ep=")[1]);
    console.log(vars[2].split("rn=")[1]);*/
    let sp = vars[0].split("sp=")[1];
    let ep = vars[1].split("ep=")[1];
    let rn = vars[2].split("rn=")[1];

    creatQuestion(sp, ep, rn);
}

init();