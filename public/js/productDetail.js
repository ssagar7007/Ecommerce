const productDetail = document.getElementById("parent")


productDetail.addEventListener("click", function (e) {
    console.log("parent clicked.....",e.target.value)

    if (e.target.className === "btn btn-primary detail-btn") {
        getSingleProductDetail(e.target.value);
    }
    
})


function getSingleProductDetail(id) {
    var request = new XMLHttpRequest();
    request.open("POST", "/singleProductDetail");
    request.setRequestHeader("Content-Type","application/json");
    request.send( JSON.stringify({id : id}));
    request.addEventListener("load", function () {
        
        const result = request.response;
        
        const result2 = JSON.parse(result)
        const detail = result2.data[0]
        console.log(detail);
        alert(detail.name + "\n" + detail.description);

         
    })

}


