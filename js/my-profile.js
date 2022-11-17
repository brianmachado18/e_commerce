/* This script manage the users profile info and image validations and keeps them in the local storage once everything is validated */ 

// Our constant variables
const profileForm = document.getElementById("profile-form");
const firstNameInput = document.getElementById("first-name-input");
const secondNameInput = document.getElementById("second-name-input");
const firstLastnameInput = document.getElementById("first-lastname-input");
const secondLastnameInput = document.getElementById("second-lastname-input");
const emailInput = document.getElementById("email-input");
const phoneInput = document.getElementById("phone-input");




function formValidations() {
    (() => {
        'use strict'
        const forms = document.querySelectorAll('.needs-validation')

        Array.from(forms).forEach(form => {
        form.addEventListener('submit', event => {
            if (!form.checkValidity()) {
            event.preventDefault()
            event.stopPropagation()
            }
            form.classList.add('was-validated')
        }, false)
        })
    })();

    profileForm.addEventListener("submit", event =>{
        event.preventDefault();
        if (profileForm.checkValidity() === true){
            let profile = {
                firstName: firstNameInput.value,
                secondName: secondNameInput.value,
                firstLastname: firstLastnameInput.value,
                secondLastname: secondLastnameInput.value,
                email: emailInput.value,
                phone: phoneInput.value,
            }
            localStorage.setItem("profile", JSON.stringify(profile));
        }
    });
}

function retrieveProfileData(){
    if(localStorage.getItem("user") !== null){
        emailInput.value = localStorage.getItem("user");
    }
    let profileData = JSON.parse(localStorage.getItem("profile"));
    if (profileData !== null && localStorage.getItem("user") === profileData.email){
        firstNameInput.value = profileData.firstName;
        secondNameInput.value = profileData.secondName;
        firstLastnameInput.value = profileData.firstLastname;
        secondLastnameInput.value = profileData.secondLastname;
        phoneInput.value = profileData.phone;
    }
}
//brian2@adasd.com juan@sdas.com

document.addEventListener('DOMContentLoaded', ()=>{
    //entrega 2
    email.innerHTML = `${localStorage.getItem('user')}`;
    formValidations();
    retrieveProfileData();
});