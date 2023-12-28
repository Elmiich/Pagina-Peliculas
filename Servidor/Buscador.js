async function buscarPeliculas() {
    try {
        const busquedaInput = document.getElementById('busquedaInput');
        const terminoBusqueda = busquedaInput.value;

        // Realiza la búsqueda solo si se proporciona un término de búsqueda
        if (terminoBusqueda.trim() !== '') {
            const response = await fetch(`/peliculas/buscar?termino=${encodeURIComponent(terminoBusqueda)}`);

            if (response.ok) {
                const resultados = await response.json();
                mostrarResultados(resultados);
            } else {
                console.error(`Error al realizar la búsqueda: ${response.statusText}`);
            }
        } else {
            // Maneja el caso en que el campo de búsqueda está vacío
            console.log('Por favor, ingrese un término de búsqueda.');
        }
    } catch (error) {
        console.error('Error al realizar la búsqueda:', error);
    }
}

// Función para mostrar los resultados de la búsqueda
function mostrarResultados(resultados) {
    const contenedorBusqueda = document.getElementById('contenedor-busqueda');
    contenedorBusqueda.innerHTML = ''; // Limpia los resultados anteriores

    if (resultados && resultados.length > 0) {
        resultados.forEach(resultado => {
            const resultadoPelicula = `
                <div class="Peliculas" title="${resultado.Titulo}" onclick="AbrirPeliculas('${resultado.Link}', '${resultado.Subtitulo}', '${resultado.Año}', '${resultado.Descripcion}', '${resultado.Titulo}')">
                    <img src="../..${resultado.Repo}Imagenes/Imagenes Peliculas/${resultado.Imagen}" width="120px" height="200px">
                    <p class="Titulos">${resultado.Titulo}</p>
                </div>`;

            contenedorBusqueda.innerHTML += resultadoPelicula;
        });
    } else {
        contenedorBusqueda.innerHTML = '<p id="noE">No se encontraron resultados.</p>';
    }
}