function notEmpty(element){
    return element !== "";
}

document.addEventListener("DOMContentLoaded", () => {
    if(localStorage.getItem('user') !== null){
        window.location.href="indexx.html";
    }
        enviar.addEventListener("click", ()=> {
            let inputs = [email.value, password.value];
            if (inputs.every(notEmpty)){
                localStorage.setItem('user', email.value);
                window.location.href="indexx.html";
            } else {
                alert("Complete los datos");
            }
        });
    

});

