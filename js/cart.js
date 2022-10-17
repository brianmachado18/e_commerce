const USER_URL = "https://japceibal.github.io/emercado-api/user_cart/25801.json";
let articlesArray = [];

document.addEventListener('DOMContentLoaded', ()=>{
    //entrega 2
    email.innerHTML = `${localStorage.getItem('user')}`;
    getJSONData(USER_URL).then(function(resultObj){
        if (resultObj.status === "ok")
        {
            articlesArray = resultObj.data.articles;
            showArticlesArray();
        }
    });

});

function showArticlesArray(){
    for (let i = 0; i < articlesArray.length; i++){
        let htmlContentToAppend = 
        `<tr><td style="width: 275px;"><img src="${articlesArray[i].image}" style="min-width: 100px;" alt="${articlesArray[i].name}" class="img-thumbnail img-fluid"></td>
        <td>${articlesArray[i].name}</td>
        <td>${articlesArray[i].currency} ${articlesArray[i].unitCost}</td>
        <td><input type="number" id="${articlesArray[i].id}" min="1" max="99" value="${articlesArray[i].count}"></td>
        <td class="fw-bold" id="${articlesArray[i].id}-cost"></td></tr>` 
        
        articles.innerHTML = htmlContentToAppend;
        
        let userInput = document.getElementById(`${articlesArray[i].id}`);
        let cost =  articlesArray[i].unitCost;
        let newCost = document.getElementById(`${articlesArray[i].id}-cost`);
        
        newCost.innerHTML = `${articlesArray[i].currency} ${userInput.value * cost}`;
        userInput.addEventListener("input", function(){ 
            newCost.innerHTML = `${articlesArray[i].currency} ${userInput.value * cost}`;
            articlesArray[i].count = userInput.value;
            localStorage.setItem("cartArray", JSON.stringify(articlesArray));
        });
    }   
};
