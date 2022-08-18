function notEmpty(element){
    return element !== "";
}
document.addEventListener("DOMContentLoaded", function(e){
enviar.addEventListener("click", (e) => {
    let inputs = [floatingInput.value, floatingPassword.value];
    if (inputs.every(notEmpty)){
        window.location.href="index.html";
    } else {
        alert("Complete los datos");
    }
    
});
});
