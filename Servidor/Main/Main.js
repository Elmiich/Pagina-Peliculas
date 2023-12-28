if(sessionStorage.getItem("nombrevar")==null){
    window.location="/LogIn/Login.html"
}
else{
    document.getElementById("Nombre").innerHTML="Bienvenid@, "+sessionStorage.getItem("nombrevar");
}
document.getElementById("foto").setAttribute("src",sessionStorage.getItem("FotoPerfil"))
document.getElementById("NombreP").innerHTML=sessionStorage.getItem("nombrevar");