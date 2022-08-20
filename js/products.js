const productos = "https://japceibal.github.io/emercado-api/cats_products/101.json";

function showProductList(array){
    let newHtmlCode = '';
    for (let i = 0; i < array.length; i++) {
        let producto = array[i];
        newHtmlCode += `
        <div class="list-group-item list-group-item-action">
            <div class="row">
                <div class="col-3">
                    <img src="` + producto.image + `" alt="` + producto.description + `" class="img-thumbnail">
                </div>
                <div class="col">
                    <div class="d-flex w-100 justify-content-between">
                        <h4 class="mb-1 ">`+ producto.name + `</h4> 
                        <a  href="product-info.html" class=" list-group-item-action "></a>
                        <small class="text-muted">` + producto.currency + ' ' + producto.cost + `</small>
                    </div>
                    <div class="text-muted"> <h5>` + producto.description + `</h5></div>
                    </div>
                </div>
            </div>
        </div>`

        document.getElementById("contenedor_producto").innerHTML = newHtmlCode;
    }
}

document.addEventListener("DOMContentLoaded", function(e){
    getJSONData(productos).then(function(resultObj){
        if (resultObj.status === "ok")
        {
            showProductList(resultObj.data.products);
        }
    });
});

