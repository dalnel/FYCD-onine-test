var el = $(".main");
let i = 0;
for(i  = 0; i <= 3; i++)
{
    var aa = `<section class="main">
    <p>
        <label>問題:${i} <h1 id="q${i}">q1</h1> </label> 
    </p>
    
    <p>
      <label>答案:</label>
      <div class="input_text">
        <input type="text" id="answer${i}" >
      </div>          
    </p>

    </section>`;
    el.append(aa);
}
