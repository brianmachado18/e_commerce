const URL_PRDUCTO = `https://japceibal.github.io/emercado-api/products/${localStorage.getItem('productID')}.json`;
const URL_COMMENTS = `https://japceibal.github.io/emercado-api/products_comments/${localStorage.getItem('productID')}.json`


function showProductInfo(e){
    informacion.innerHTML = `
    <div class="text-center p-4">
      <h2>Descripción del Producto</h2>
      <p class="lead">
        Encontrarás aquí toda la información del producto seleccionado.
      </p>
    </div>
    <h3>`+ e.name +`</h3>
    <hr class="my-3">
    <dl>
      <dt>Descripción</dt>
      <dd>
        <p>`+ e.description +`</p>
      </dd>
      <dt>Categoria</dt>
      <dd>
        <p>`+ e.category +`</p>
      </dd>
      <dt>Precio</dt>
      <dd>
        <p>`+ e.currency +' '+ e.cost +`</p>
      </dd>
      <dt>Cantidad de Vendidos</dt>
      <dd>
        <p>`+ e.soldCount +`</p>
      </dd>
      <dt>Imagenes ilustrativas</dt>
      <dd>
        <p class='row' id='imgs'></p>
      </dd>
      </dl>
      <div id='puntuacion'>
         
      </div>
      <div id='productComments'>
         
      </div>
      `
}

function showImages(a){
    a.forEach(element => {
        imgs.innerHTML  += `
    <div class="col-lg-3 col-md-4 col-6">
        <div class="d-block mb-4 h-100">
          <a>  <img class="img-fluid img-thumbnail"  src="` + element + `" alt=""> </a>
        </div>
    </div>
    `;
});
}

function showComments(a){
    let comments = " ";
    let estrella = "";

    a.forEach(element => {
        for (let e = 0; e < element.score; e++) {
            estrella += ` <span class="fa fa-star checked"></span>`
        }
        comments += `
        <div class="container mt-3">
    
            <hr class="my-3">
            <dd>
            <div class="chip">👤` + element.user + ` </div>  
                </dd>  
            <dd>
                <p > ` + element.description + `   <br>  </span>
                ` + estrella + `</p>
            </dd>
    <dt>Fecha </dt>
            <dd>
                <p >  `+ element.dateTime + `</p>
            </dd>
            
            
    </div>`
    estrella = "";
  });
  productComments.innerHTML = comments;
}


document.addEventListener('DOMContentLoaded', ()=>{
    getJSONData(URL_PRDUCTO).then(function(resultObj){
        if (resultObj.status === "ok")
        {
            showProductInfo(resultObj.data);
            showImages(resultObj.data.images);
        }
    });
    getJSONData(URL_COMMENTS).then(function(resultObj){
        if (resultObj.status === "ok")
        {
            showComments(resultObj.data);
        }
    });
    //entrega 2
    email.innerHTML = `<p class="nav-link">${localStorage.getItem('user')}</p>`;
});