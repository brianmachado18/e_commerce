function notEmpty(element){
    return element !== "";
}

enviar.addEventListener("click", (e) => {
    let inputs = [email.value, password.value];
    if (inputs.every(notEmpty)){
        localStorage.setItem('user', email.value);
        window.location.href="indexx.html";
    } else {
        alert("Complete los datos");
    }
    
});

