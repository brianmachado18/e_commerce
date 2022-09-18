//modificado para entrega 2
const URL_PRDUCTOS = `https://japceibal.github.io/emercado-api/cats_products/${localStorage.getItem('catID')}.json`;

//entrega2
const ORDER_ASC_BY_PRICE = "Precio";
const ORDER_DESC_BY_PRICE = "precio";
const ORDER_BY_PROD_COUNT = "Cant.";

let productos = [];

function sortProducts(criterio, array){
    let resultado = [];

    if(criterio === ORDER_ASC_BY_PRICE){
        resultado = array.sort((a, b)=>{
            if(a.cost < b.cost){return -1;}
            if(a.cost > b.cost){return 1;}
            return 0;
        });
    }else if(criterio === ORDER_DESC_BY_PRICE){
        resultado = array.sort((a, b)=>{
            if (a.cost > b.cost) {return -1;}
            if (a.cost < b.cost) {return 1;}
            return 0;
        });
    }else if (criterio === ORDER_BY_PROD_COUNT){
        resultado = array.sort((a, b)=>{
            let aCount = parseInt(a.soldCount);
            let bCount = parseInt(b.soldCount);
            if (aCount > bCount) {return -1;}
            if (aCount < bCount) {return 1;}
            return 0;
        });
    }
    return resultado;
}

rangeFilterCount.addEventListener('click', ()=>{
    showProductList(productos.filter((e)=>{return e.cost >= rangeFilterCountMin.value && e.cost <= rangeFilterCountMax.value;}));
});

clearRangeFilter.addEventListener('click', ()=>{
    window.location.href = "products.html";
});

sortAsc.addEventListener('click', ()=>{
    showProductList(sortProducts(ORDER_ASC_BY_PRICE, productos));
});

sortDesc.addEventListener('click', ()=>{
    showProductList(sortProducts(ORDER_DESC_BY_PRICE, productos));
});

sortCount.addEventListener('click', ()=>{
    showProductList(sortProducts(ORDER_BY_PROD_COUNT, productos));
});

function setProductID(id) {
    localStorage.setItem("productID", id);
    window.location = "product-info.html"
}

function showProductList(array){
    let newHtmlCode = '';
    for (let i = 0; i < array.length; i++) {
        let producto = array[i];
        newHtmlCode += `
        <div onclick="setProductID(${producto.id})" class="list-group-item list-group-item-action cursor-active">
            <div class="row">
                <div class="col-3">
                    <img src="` + producto.image + `" alt="` + producto.description + `" class="img-thumbnail">
                </div>
                <div class="col">
                    <div class="d-flex w-100 justify-content-between">
                        <h4 class="mb-1 ">`+ producto.name + `</h4> 
                        <small class="text-muted">` + producto.currency + ' ' + producto.cost +`</small>
                    </div>
                    <div class="text-muted"> <h5>` + producto.description + `</h5></div>
                    </div>
                </div>
            </div>
        </div>`

        document.getElementById("contenedor_producto").innerHTML = newHtmlCode;
    }
}


document.addEventListener("DOMContentLoaded", ()=>{
    getJSONData(URL_PRDUCTOS).then(function(resultObj){
        if (resultObj.status === "ok")
        {
            showProductList(resultObj.data.products);
            resultObj.data.products.forEach(element => {
                productos.push(element);
            });
        }
    });

    //entrega 2
    email.innerHTML = `<p class="nav-link">${localStorage.getItem('user')}</p>`;
});

