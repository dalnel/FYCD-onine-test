let fullAnswer = [];
let fuzzyAnswer = [];
let question = "";
let rn;
$("#send").hide();
$("#retest").hide();

function creatQuestion(sp,ep,rn) {
    $.ajax({
        url: "QA.json",//同文件夹下的json文件路径
        type: "GET",//请求方式为get
        dataType: "json", //返回数据格式为json
        success: function (data) {//请求成功完成后要执行的方法 
            console.log(data);
            var count = Object.keys(data).length;
            var count2 = Object.keys(data[0].question).length;
            console.log("---------");
            //console.log(count2);
            /*$("#q1").text(data[0].question[0]);
            $("#a1_full").text(data[0].answer_full[0]);
            $("#a1_fuzzy").text(data[0].answer_fuzzy[0]);*/
            for (let i = 0; i < rn; i++) {
                let j = getRandom(sp,ep); //隨機生成頁數
                let k = Object.keys(data[j].question).length;
                let l = Math.floor(Math.random() * k); //隨機生成上面頁數下的"題數"
                fullAnswer.push(data[j].answer_full[l]); //儲存完整的答案
                fuzzyAnswer.push(data[j].answer_fuzzy[l]); //儲存模糊答案
                console.log(fuzzyAnswer[i]);
                creat(data[j].question[l], i);
            }
        }
    })
}

function creat(question, i) {
    var el = $(".all");
    var aa = `<section class="main">
    <p>
        <label>${i+1}.問題: </label> 
    </p>
    <h1 id="q${i}">${question}</h1> 

    <p id="a${i}">
        <label>答案:</label>
    </p> 

    <div class="input_text">
        <input type="text" id="answer${i}" >
    </div>          
     
    </section>`;
    el.append(aa);
}

$("#send").click(function () {
    
    let sp = $("#sp").val();
    let ep = $("#ep").val(); //((ep - sp) + 1)

    for(let i = 0; i < rn; i++)
    {
        let answer = $("#answer" + i).val();
        let rate = 0; //答對率

        if(answer === fullAnswer[i])
        {
            let correctRate = 1;
            rightAnswer(correctRate, i);
        }
        else
        {
            for(let j = 0; j <= fuzzyAnswer[i].length; j++)
            {
                //console.log(fuzzyAnswer[j].length);
                console.log(fuzzyAnswer[i][j]);
                if(answer.includes(fuzzyAnswer[i][j]))
                {
                    rate = rate + 1;
                }
            }
            let correctRate = rate / fuzzyAnswer[i].length;
            console.log(correctRate);
            rightAnswer(correctRate, i);
        }
        
   
    }
    $("#send").hide();
    $("#retest").show();

});

$("#retest").click(function () {

    $(".all").html("");
    $("#retest").hide();
    $("#send").show();
    init();

});

function getRandom(min,max){
    /*console.log(min);
    console.log(max);
    console.log(Math.floor(Math.random()*(max-min+1)+min));*/
    return Math.floor(Math.random()*(max-min+1)+min);
};

function rightAnswer(correctRate, i){

    if (correctRate == 1) {
        console.log("same");
        let a = $("#a" + i);
        let b = `<i class="fa-regular fa-circle-check fa-2x"></i>`;
        a.append(b)
    }
    else if (correctRate >= 0.5) {
        console.log("fuzzy answer");
        let a = $("#a" + i);
        let b = `<i class="fa-regular fa-circle-check fa-2x"></i>`;
        a.append(b)
    }
    else {
        console.log("wrong");
        let a = $("#a" + i);
        let b = `<i class="fa-regular fa-circle-xmark fa-2x"></i>`;
        a.append(b)
    }    

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
     rn = vars[2].split("rn=")[1];
    $("#send").show();
    creatQuestion(sp, ep, rn);
};

init();