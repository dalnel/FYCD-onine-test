let fullAnswer = [];
let fuzzyAnswer = [];
let question = "";
let rn;
$("#send").hide();

function creatQuestion(page,questionNumber,length, rn) {
    $.ajax({
        url: "QA.json",//同文件夹下的json文件路径
        type: "GET",//请求方式为get
        dataType: "json", //返回数据格式为json
        success: function (data) {//请求成功完成后要执行的方法 
            console.log(data);
            var count = Object.keys(data).length;
            var count2 = Object.keys(data[0].question).length;
            console.log("---------");
            for (let i = 0; i < rn; i++) {
                let j = getRandom(0,length); //隨機生成頁數
                let p = parseInt(page[j]) - 10; //讀取考古題生成頁數，並轉換成該頁數所在的陣列位置
                let q = parseInt(questionNumber[j]); //讀取考古題的題號
                fullAnswer.push(data[p].answer_full[q]); //儲存完整的答案
                fuzzyAnswer.push(data[p].answer_fuzzy[q]); //儲存模糊答案
                console.log(fuzzyAnswer[i]);
                creat(data[p].question[q], i, fullAnswer[i]);
            }
        }
    })
}

function creat(question, i, fullA) {
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
    
    <div class="test_ans" style="display:none">
        <p>正確解答: </p>
        <h1>${fullA}</h1>
    </div> 
    </section>`;
    el.append(aa);
}

$("#send").click(function() {
    
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
    $(".test_ans").toggle();

});

$("#retest").click(function () {

    $(".all").html("");
    const page = ["10", "11", "11", "12", "13", "14", "14", "16", "17", "20", "20", "20", "21", "23", "23", "24", "26", "26", "27", "28", "28", "28", "28", "28", "29", "29", "29", "29", "31", "33", "36", "36", "39", "40", "43", "43", "46", "48", "48", "51", "53", "56", "60", "64", "65", "69", "70", "71", "76", "79", "79", "81", "82", "82", "83", "83", "86", "87", "87", "88", "90", "90", "91", "92", "93", "94", "94", "95", "95", "95", "98", "99", "100", "101", "102", "102", "102", "103", "105", "106", "106", "106", "107", "109", "110", "110", "110", "111", "112", "112", "113", "113", "115", "115", "116", "117", "118", "119", "119", "119", "120", "120", "120", "121", "121", "121", "121", "121", "122", "122", "124", "124", "124", "125", "125", "126", "126", "128", "128", "128", "129", "131", "132", "132", "132", "133", "134", "135", "135", "136", "136", "141", "141", "142", "142", "145", "145", "147", "148", "149", "151", "151", "152", "155", "158", "158", "158", "159", "159", "160", "165", "168", "168", "169", "169", "170", "171"];
    const questionNumber = [ "2", "0", "1", "3", "2", "0", "2", "1", "0", "2", "3", "5", "3", "1", "4", "0", "0", "1", "1", "0", "1", "2", "3", "4", "0", "1", "3", "5", "0", "0", "2", "3", "2", "1", "1", "3", "1", "0", "2", "3", "1", "2", "0", "0", "0", "0", "2", "1", "0", "2", "4", "3", "2", "3", "0", "3", "0", "2", "3", "4", "0", "1", "2", "0", "3", "2", "4", "0", "1", "2", "2", "4", "0", "4", "1", "2", "3", "1", "0", "0", "2", "3", "3", "0", "0", "1", "5", "0", "1", "3", "1", "4", "2", "4", "1", "1", "2", "0", "1", "2", "2", "3", "4", "0", "1", "2", "3", "4", "0", "2", "0", "3", "5", "0", "4", "0", "1", "0", "1", "4", "1", "0", "0", "1", "2", "4", "2", "2", "3", "1", "2", "2", "3", "0", "2", "2", "3", "3", "5", "0", "0", "1", "0", "0", "0", "1", "2", "0", "3", "1", "1", "0", "2", "0", "3", "2", "3"];
    let length = page.length; //總共題數
    fullAnswer = [];
    fuzzyAnswer = [];

    $("#retest").hide();
    $("#send").show();
    rn = 20;
    creatQuestion(page, questionNumber, length, rn); 

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