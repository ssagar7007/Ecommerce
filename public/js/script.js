var loadbtn = document.getElementById("load");
var para = document.getElementById("parent");
var productlist = [];

loadbtn.addEventListener("click", function ()
{
    var request = new XMLHttpRequest();
   
    request.open("GET", "/loadmore");
    request.send();
    request.addEventListener("load", function ()
    {  
        var data = JSON.parse(request.responseText);
        if (!data.loadmore)
        {
            loadbtn.disabled = true;  
        }
            showproduct(data.data);
            console.log(data.data);
        
        
    })
})

function showproduct(product)
{   
    
    product.forEach(element => {
        

        var card = document.createElement("div");
        card.classList.add("card","card-border");
        card.style.flex = "1 0 21% ";
        card.style.margin = "5px";

        var image = document.createElement("img");
        image.classList.add("card-img-top");
        image.setAttribute("src", element.image);
        image.setAttribute("width", "150px");
        image.setAttribute("height", "200px");

        var inner = document.createElement("div");
        inner.classList.add("card-body");
       
        var name = document.createElement("h5");
        name.classList.add("card-title");
        name.innerText = element.name;

        var detail = document.createElement("button");
        detail.classList.add("btn", "btn-primary","detail-btn");
        detail.setAttribute("value",element._id)
        detail.id = element._id;
        detail.innerText = "Details";


        inner.appendChild(name);
        inner.appendChild(detail);

        card.appendChild(image);
        card.appendChild(inner);


        
        para.appendChild(card);
    });
   
}