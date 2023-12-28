async function CargarGenerosDesdeBD() {
    try {
        const response = await fetch('/peliculas/generos');
        if (!response.ok) {
            throw new Error(`Error al obtener los géneros: ${response.statusText}`);
        }

        const generosBD = await response.json();
        const contenedorgeneros = document.getElementById('contenedor-categorias');

        generosBD.forEach(genero => {
            const generoHTML = `              
            <div class="categoria" title="${genero.Genero}" onclick="IrGenero('${genero.Genero}')">
            <img src="${genero.Imagen}" width="180px" height="300px">
            <p class="Titulos">${genero.Genero}</p>
            </div>`;
            contenedorgeneros.innerHTML += generoHTML;  
        });

    } catch (error) {
        console.error('Error en la solicitud:', error);
        alert('Error al obtener las películas');
    }
}
function IrGenero(Genero) {
    window.location.href = `/SubPaginas/Categorias/Genero.html?categoria=${Genero}`;
}



async function CargarPeliculasDesdeBD() {
    try {
        const response = await fetch('/peliculas');
        if (!response.ok) {
            throw new Error(`Error al obtener las películas: ${response.statusText}`);
        }

        const peliculasDesdeBD = await response.json();
        const contenedorPeliculas = document.getElementById('contenedor-peliculas');

        peliculasDesdeBD.forEach(pelicula => {
            const peliculaHTML = `
                <div class="Peliculas" title="${pelicula.Titulo}" onclick="AbrirPeliculas('${pelicula.Link}', '${pelicula.Subtitulo}', '${pelicula.Año}', '${pelicula.Descripcion}', '${pelicula.Titulo}')">
                    <img src="../..${pelicula.Repo}Imagenes/Imagenes Peliculas/${pelicula.Imagen}" width="120px" height="200px">
                    <p class="Titulos">${pelicula.Titulo}</p>
                </div>`;
            contenedorPeliculas.innerHTML += peliculaHTML;  
        });

    } catch (error) {
        console.error('Error en la solicitud:', error);
        alert('Error al obtener las películas');
    }
}

// Llamada a la función para cargar las películas al cargar la página

async function CargarServidores() {
    try {
        const response = await fetch('/servidores');
        if (!response.ok) {
            throw new Error(`Error al obtener los servidores: ${response.statusText}`);
        }
        const DatosServidores = await response.json();
        const contenedorServidores = document.getElementById('contenedor-servidores');
        DatosServidores.forEach(servidor => {
            const servidoresHTML = `
            <div class="Juegos">            
                    <div class="juego">
                        <img src="${servidor.Imagen}" width="240px" height="372px">
                    </div>
                    <p class="Nombre">${servidor.Nombre}</p>
                    <p class="Descripcion">${servidor.Descripcion}</p>
                    <button class="BotonIniciar" onclick="IrServidor('${servidor.Nombre}')">Iniciar Servidor</button>
                </div>`;                
            contenedorServidores.innerHTML += servidoresHTML;
        });
    } catch (error) {
        console.error('Error en la solicitud:', error);
        alert('Error al obtener los servidores');
    }
}

function IrServidor(Nombre) {
    window.location.href = `/SubPaginas/Servidores/IniciarServidor.html?nombre=${Nombre}`;
}

