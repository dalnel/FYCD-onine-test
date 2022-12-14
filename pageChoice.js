
$("#send").click(function (){
    document.location.href ='review.html?sp=' + $("#sp").val() + '&ep=' + $("#ep").val() + '&rn=' + $("#review_number").val();  
})