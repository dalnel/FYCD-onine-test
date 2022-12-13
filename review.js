let fullAnswer = [];
let fuzzyAnswer = [];
let fuzzy_temp =[];
let question = "";

$("#start").click(function () { 
    
    let sp = $("#sp").val();
    let ep = $("#ep").val();
    let rn = $("#review_number").val();
    $(".all").html("");
    creatQuestion(sp, ep, rn); 
});

function creatQuestion(sp,ep, rn) {
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
                let l = Math.floor(Math.random() * k); //隨機生成上面頁數下的題數
                fullAnswer.push(data[j].answer_full[l]); //儲存完整的答案

                //console.log(data[j].question[l], data[j].answer_fuzzy[l] ,k, l);
                for(let y = 0; y < data[j].answer_fuzzy[l].length; y ++)
                {
                    fuzzy_temp.push(data[j].answer_fuzzy[l][y]);
                } //儲存模糊答案

                creat(data[j].question[l], i, data[j].answer_full[l], fuzzy_temp)
                fuzzy_temp = [];
            }
        }
    })
}

function creat(question, i, answer_full, answer_fuzzy) {
    var el = $(".all");
    var aa = `<section class="main">
    <p>
        <label>問題: </label> 
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

    let sp = $("#sp").val();
    let ep = $("#ep").val();
    let rn = $("#review_number").val();
    $(".all").html("");
    creatQuestion(sp, ep, rn); 

});

function getRandom(min,max){
    /*console.log(min);
    console.log(max);
    console.log(Math.floor(Math.random()*(max-min+1)+min));*/
    return Math.floor(Math.random()*(max-min+1)+min);
};