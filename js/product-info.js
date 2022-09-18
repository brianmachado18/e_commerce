const URL_PRDUCTOS = `https://japceibal.github.io/emercado-api/products/${localStorage.getItem('productID')}.json`;
const URL_COMMENTS = `https://japceibal.github.io/emercado-api/products_comments/${localStorage.getItem('productID')}.json`
const ratingStars = [...document.getElementsByClassName("rating__star")];


function loadProductInfo(array){
  const images = array.images;

  productName.innerHTML = array.name;
  productCat.innerHTML = array.category;
  productDesc.innerHTML = array.description;
  productPrice.innerHTML = `${array.cost} ${array.currency}`;
  productSoldCount.innerHTML = array.soldCount;

  images.forEach(element => {
    productImages.innerHTML += `
    <div class="col-lg-3 col-md-4 col-6 mt-3">
      <div class="d-block mb-4 h-100">
        <a>  <img class="img-fluid img-thumbnail"  src="${element}" alt=""> </a>
      </div>
    </div>`; 
  });
}

function loadComments(array){
  array.forEach(element => {
    let stars = "";
    for (let index = 0; index < element.score; index++) {
      stars += `<span class="fa fa-star checked">`;
    }
    productComment.innerHTML +=`
    <dt><p class="chip"><i class="fas fa-user-alt"></i> ${element.user}</p></dt>
    <dd><p >${element.description}<br>${stars}</p></dd>
    <dt>Fecha</dt>
    <dd><p >${element.dateTime}</p></dd>
    <hr class="my-2">
    `;
  });
} 

function rating(stars){
  const starClassActive = "rating__star fas fa-star";
  const starClassInactive = "rating__star far fa-star";
  const starsLength = stars.length;
  let i;
  stars.map((star) => {
    star.onclick = () => {
      i = stars.indexOf(star);

      if (star.className===starClassInactive) {
        for (i; i >= 0; --i) stars[i].className = starClassActive;
      } else {
        for (i; i < starsLength; ++i) stars[i].className = starClassInactive;
      }
    };
  });
}

document.addEventListener('DOMContentLoaded', ()=>{
    getJSONData(URL_PRDUCTOS).then(function(resultObj){
        if (resultObj.status === "ok")
        {
          loadProductInfo(resultObj.data);
        }
    });
    getJSONData(URL_COMMENTS).then(function(resultObj){
        if (resultObj.status === "ok")
        {
          loadComments(resultObj.data);
          rating(ratingStars);
        }
    });
    //entrega 2
    email.innerHTML = `<p class="nav-link">${localStorage.getItem('user')}</p>`;
});