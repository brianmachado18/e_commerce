const USER_URL = "https://japceibal.github.io/emercado-api/user_cart/25801.json";
let articlesArray = [];


function showArticlesArray() {
    for (let i = 0; i < articlesArray.length; i++) {
        let htmlContentToAppend =
            `<tr><td style="width: 275px;"><img src="${articlesArray[i].image}" style="min-width: 100px;" alt="${articlesArray[i].name}" class="img-thumbnail img-fluid"></td>
        <td>${articlesArray[i].name}</td>
        <td>${articlesArray[i].currency} ${articlesArray[i].unitCost}</td>
        <td><input type="number" id="${articlesArray[i].id}" min="1" max="99" value="${articlesArray[i].count}"></td>
        <td class="fw-bold" id="${articlesArray[i].id}-cost"></td></tr>`

        articles.innerHTML = htmlContentToAppend;

        let userInput = document.getElementById(`${articlesArray[i].id}`);
        let cost = articlesArray[i].unitCost;
        let newCost = document.getElementById(`${articlesArray[i].id}-cost`);

        newCost.innerHTML = `${articlesArray[i].currency} ${userInput.value * cost}`;
        userInput.addEventListener("input", function () {
            newCost.innerHTML = `${articlesArray[i].currency} ${userInput.value * cost}`;
            articlesArray[i].count = userInput.value;
            localStorage.setItem("cartArray", JSON.stringify(articlesArray));
        });
    }
};

function showTotalCost() {
    const standardShipping = document.getElementById("standard");
    const expressShipping = document.getElementById("express");
    const premiumShipping = document.getElementById("premium");
    const shipping = document.getElementById("shipping");
    const total = document.getElementById("total");

    let subtotal = 0;
    let shippingSubtotal = 0;

    if (articlesArray.length !== 0) {
        for (let i = 0; i < articlesArray.length; i++) {
            if (articlesArray[i].currency === "USD") {
                subtotal += articlesArray[i].unitCost * articlesArray[i].count;
            } else if (articlesArray[i].currency === "UYU") {
                subtotal += (Math.round(articlesArray[i].unitCost / 41)) * articlesArray[i].count;
            }
        }
    }

    standardShipping.addEventListener("input", function () {
        shippingSubtotal = Math.round((5 / 100) * subtotal);
        shipping.innerHTML = `USD ${shippingSubtotal}`;
        total.innerHTML = `USD ${subtotal + shippingSubtotal}`;
    });

    expressShipping.addEventListener("input", function () {
        shippingSubtotal = Math.round((7 / 100) * subtotal);
        shipping.innerHTML = `USD ${shippingSubtotal}`;
        total.innerHTML = `USD ${subtotal + shippingSubtotal}`;
    });

    premiumShipping.addEventListener("input", function () {
        shippingSubtotal = Math.round((15 / 100) * subtotal);
        shipping.innerHTML = `USD ${shippingSubtotal}`;
        total.innerHTML = `USD ${subtotal + shippingSubtotal}`;
    });

    if (standardShipping.checked === true) {
        shippingSubtotal = Math.round((5 / 100) * subtotal);
        shipping.innerHTML = `USD ${shippingSubtotal}`;
        total.innerHTML = `USD ${subtotal + shippingSubtotal}`;
    } else if (expressShipping.checked === true) {
        shippingSubtotal = Math.round((7 / 100) * subtotal);
        shipping.innerHTML = `USD ${shippingSubtotal}`;
        total.innerHTML = `USD ${subtotal + shippingSubtotal}`;
    } else if (premiumShipping.checked === true) {
        shippingSubtotal = Math.round((15 / 100) * subtotal);
        shipping.innerHTML = `USD ${shippingSubtotal}`;
        total.innerHTML = `USD ${subtotal + shippingSubtotal}`;
    }

    document.getElementById("subtotal").innerHTML = `USD ${subtotal}`;
    total.innerHTML = `USD ${subtotal + shippingSubtotal}`;
}

function formValidations() {
    const cardRadio = document.getElementById("credit-card");
    const bankRadio = document.getElementById("bank-account");
    const cardFieldset = document.getElementById("card-fieldset");
    const bankFieldset = document.getElementById("bank-fieldset");
    const buyCondition = document.getElementById("buy-condition");

    cardRadio.addEventListener("input", function () {
        cardFieldset.disabled = false;
        bankFieldset.disabled = true;
        buyCondition.innerHTML = "Tarjeta de crédito";
    });

    bankRadio.addEventListener("input", function () {
        bankFieldset.disabled = false;
        cardFieldset.disabled = true;
        buyCondition.innerHTML = "Transferencia bancaria";
    });
    
    (() => {
        'use strict'
        const forms = document.querySelectorAll('.needs-validation')
        Array.from(forms).forEach(form => {
            form.addEventListener('submit', event => {
                event.preventDefault()
                event.stopPropagation()
                form.classList.add('was-validated')
            }, false)
        })
    })();
}

document.addEventListener('DOMContentLoaded', () => {
    //entrega 2
    email.innerHTML = `${localStorage.getItem('user')}`;
    getJSONData(USER_URL).then(function (resultObj) {
        if (resultObj.status === "ok") {
            articlesArray = resultObj.data.articles;
            showArticlesArray();
            showTotalCost();
            formValidations();
        }
    });

});