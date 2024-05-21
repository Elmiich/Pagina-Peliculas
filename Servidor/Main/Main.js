if (!localStorage.getItem("nombrevar") && !sessionStorage.getItem("nombrevar")) {
    window.location = "/LogIn/Login.html";
} else {
    if (!localStorage.getItem("nombrevar")){
        const nombrevar = sessionStorage.getItem("nombrevar");
        const fotoPerfil = sessionStorage.getItem("FotoPerfil");
        document.getElementById("Nombre").innerHTML = "Bienvenid@, " + nombrevar;
        document.getElementById("foto").setAttribute("src", fotoPerfil);
        document.getElementById("NombreP").innerHTML = nombrevar;
    }
    else {
        const nombrevar = localStorage.getItem("nombrevar");
        const fotoPerfil = localStorage.getItem("FotoPerfil");
        sessionStorage.setItem("Usuario", localStorage.getItem("Usuario"));
        sessionStorage.setItem("nombrevar", nombrevar);
        sessionStorage.setItem("FotoPerfil", fotoPerfil);
        document.getElementById("Nombre").innerHTML = "Bienvenid@, " + nombrevar;
        document.getElementById("foto").setAttribute("src", fotoPerfil);
        document.getElementById("NombreP").innerHTML = nombrevar;
    }
}
