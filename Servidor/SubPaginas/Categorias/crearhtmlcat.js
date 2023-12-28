window.onload = async function () {
    const genero = obtenerCategoria();

    if (genero) {
        console.log('Categoria:', genero);
        await PaginaCategoria(genero);
    }
};

function obtenerCategoria() {
    const urlParams = new URLSearchParams(window.location.search);
    const categoria = urlParams.get('categoria');
    return categoria;
}

async function PaginaCategoria(genero) {
    try {
        const response = await fetch(`/peliculas/detalles?genero=${encodeURIComponent(genero)}`);
        
        if (!response.ok) {
            throw new Error(`Error al obtener detalles de los géneros: ${response.statusText}`);
        }

        const detallesServidor = await response.json();

        if (detallesServidor && detallesServidor.length > 0) {
            const contenedorGeneros = document.getElementById('contenedor-generos');
            
            detallesServidor.forEach(detalle => {
                // Filtra las películas por categoría
                if (detalle.Genero === genero) {
                    const agregarpelicula = `
                        <div class="Peliculas" title="${detalle.Titulo}" onclick="AbrirPeliculas('${detalle.Link}', '${detalle.Subtitulo}', '${detalle.Año}', '${detalle.Descripcion}', '${detalle.Titulo}')">
                            <img src="../..${detalle.Repo}Imagenes/Imagenes Peliculas/${detalle.Imagen}" width="120px" height="200px">
                            <p class="Titulos">${detalle.Titulo}</p>
                        </div>`;

                    contenedorGeneros.innerHTML += agregarpelicula;
                }
            });
        } else {
            console.log(`No se encontraron películas para la categoría: ${genero}`);
        }
    } catch (error) {
        console.error('Error al obtener y mostrar detalles de las películas:', error);
    }
}

