var MenuPrincipal=document.getElementById("Inicio") //Listo
var Peliculas=document.getElementById("Peliculas") //Listo
var Directorio=document.getElementById("Directorio")
var Categorias=document.getElementById("Categorias")
var Reseñas=document.getElementById("Reseñas")
var Buscador=document.getElementById("Buscador")
var Nube=document.getElementById("Nube") //Listo
var SubirArchivo=document.getElementById("SubirArchivo")
var VerCarpeta=document.getElementById("VerCarpeta")
var Explorar=document.getElementById("Explorar")
var Hosteo=document.getElementById("Hosteo") //Listo
var VerServidores=document.getElementById("VerServidores")
var IniciarMinecraft=document.getElementById("IniciarMinecraft")
var IniciarHambre=document.getElementById("IniciarHambre")
var Huri=document.getElementById("Huri") //Listo
var Galeria=document.getElementById("Galeria") //Listto
var Perfil=document.getElementById("Perfil") //Listo
var VerCuenta=document.getElementById("VerCuenta") //Listo
var CerrarSesion=document.getElementById("CerrarSesion") //Listo

var Nombre=sessionStorage.getItem("nombrevar")
document.getElementById("foto").setAttribute("src",sessionStorage.getItem("FotoPerfil"))
document.getElementById("NombreP").innerHTML=sessionStorage.getItem("nombrevar");

if(Nombre==null){
    window.location="/LogIn/Login.html"
}

function IrInicio(){
window.location="/Main/Index.html"
}

function VerPeliculas(){
    window.location="/Paginas/Peliculas.html"
}

function VerDirectorio(){
    window.location="/SubPaginas/Directorio/Pagina1.html"
}

function VerPagina(numero){
    window.location=`/SubPaginas/Directorio/Pagina${numero}.html`
}

function AbrirPeliculas(Pelicula, Subtitulo, Año, Descripcion, Titulo){
    const urlPelicula = `/Archivos/Peliculas/${Pelicula}`;
    const urlSubtitulo = `/Archivos/Subtitulos/${Subtitulo}`;

    const ventana = window.open('', '_blank');
    ventana.document.write(`
        <html>
        <head>
            <title>Película</title>
        </head>
        <body>
            <video width="640" height="360" controls autoplay>
                <source src="${urlPelicula}" type="video/mp4">
                <track src="${urlSubtitulo}" kind="subtitles" srclang="es" label="Español">
            </video>
            <p>Título: ${Titulo}</p>
            <p>Año: ${Año}</p>
            <p>Descripción: ${Descripcion}</p>
        </body>
        </html>
    `);
}


function VerCategorias(){
    window.location="/SubPaginas/Categorias.html"
}

function AbrirCategorias(genero){
    window.location=`/SubPaginas/Categorias/${genero}`
}

function PaginaCategoria(genero,numero){
    window.location=`/SubPaginas/Categorias/${genero}${numero}.html`
}

function VerReseñas(){
    window.location="/SubPaginas/Reseñas.html"
}

function IrBuscador(){
    window.location="/SubPaginas/Buscador.html"
}

function VerNube(){
    window.location="/Paginas/Nube.html"
}

function IrSubirArchivo(){
    window.location="/SubPaginas/SubirArchivo.html"
}

function IrVerCarpeta(){
    window.location="/SubPaginas/VerCarpeta.html"
}

function ExplorarArchivos(){
    window.location="/SubPaginas/ExplorarArchivos.html"
}

function Hostear(){
    window.location="/Paginas/Hosteo.html"
}

function IrServidores(){
    window.location="/SubPaginas/Servidores/Servidores.html"
}

function IrMinecraft(){
    window.location="/SubPaginas/Servidores/IniciarServidor.html?nombre=Minecraft"
}

function IrDontStarve(){
    window.location="/SubPaginas/Servidores/IniciarServidor.html?nombre=Don´t Starve Together"
}

function VerHuri(){
    window.location="/Paginas/Huri.html"
}

function VerGaleria(){
    window.location="/SubPaginas/Galeria.html"
}

function VerPerfil(){
    window.location="/Paginas/Perfil.html"
}

function EditarPerfil(){
    window.location="/SubPaginas/EditarPerfil.html"
}

function CerrarCuenta(){ 
    alert("Se cerro la sesion, hasta luego "+Nombre) 
    sessionStorage.clear()  
    window.location="/LogIn/Login.html"
}




