let fullAnswer = [];
let fuzzyAnswer = [];
let question = "";

$("#start").click(function () { 
    
    let sp = $("#sp").val();
    let ep = $("#ep").val();
    creatQuestion(sp, ep); 
});

function creatQuestion(sp,ep) {
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
            for (let i = 0; i <= 15; i++) {
                let j = getRandom(sp,ep); //隨機生成頁數
                let k = Object.keys(data[j].question).length;
                let l = Math.floor(Math.random() * k); //隨機生成上面頁數下的題數
                fullAnswer.push(data[j].answer_full[l]); //儲存完整的答案
                fuzzyAnswer.push(data[j].answer_fuzzy[l]); //儲存模糊答案
                console.log(data[j].question[l]);
                creat(data[j].question[l], i)
            }
        }
    })
}

function creat(question, i) {
    var el = $(".all");
    var aa = `<section class="main">
    <p>
        <label>問題: </label> 
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

    for(let i = 0; i <=15; i++)
    {
        let answer = $("#answer" + i).val();
        if (answer === fullAnswer[i]) {
            console.log("same");
            let a = $("#a" + i);
            let b = `<i class="fa-regular fa-circle-check fa-2x"></i>`;
            a.append(b)
        }
        else if (answer.includes(fuzzyAnswer[i])) {
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
    }
    $("#send").hide();

});

function getRandom(min,max){
    /*console.log(min);
    console.log(max);
    console.log(Math.floor(Math.random()*(max-min+1)+min));*/
    return Math.floor(Math.random()*(max-min+1)+min);
};