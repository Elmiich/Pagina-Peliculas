const Usuario = sessionStorage.getItem("Usuario")
if(Usuario!="Admin"){
    window.location = "../../Main/Index.html";
}
document.getElementById('actionSelect').addEventListener('change', function() {
    const selectedAction = this.value;
    document.getElementById('uploadFormContainer').style.display = selectedAction === 'upload' ? 'block' : 'none';
    document.getElementById('editFormContainer').style.display = selectedAction === 'edit' ? 'block' : 'none';
});


async function fetchMovies() {
    try {
        const response = await fetch('http://caduto.online:4018/peliculas');
        const movies = await response.json();
        const movieSelect = document.getElementById('movieSelect');
        movieSelect.innerHTML = '<option value="">Seleccione una película</option>';

        movies.forEach(movie => {
            const option = document.createElement('option');
            option.value = movie.Titulo;
            option.textContent = movie.Titulo;
            movieSelect.appendChild(option);
        });
    } catch (error) {
        console.error('Error al obtener las películas:', error);
    }
}
fetchMovies(); 


async function fetchMovieDetails(movieTitle) {
    try {
        const response = await fetch(`http://caduto.online:4018/peliculas/${encodeURIComponent(movieTitle)}`);
        const movie = await response.json();
        document.getElementById('editTitle').value = movie.Titulo;
        document.getElementById('editYear').value = movie.Año;
        document.getElementById('editDescription').value = movie.Descripcion;
        document.getElementById('editGenre').value = movie.Genero;
    } catch (error) {
        console.error('Error al obtener los detalles de la película:', error);
    }
}

document.getElementById('movieSelect').addEventListener('change', (event) => {
    const movieTitle = event.target.value;
    if (movieTitle) {
        fetchMovieDetails(movieTitle);
    } else {
        document.getElementById('editTitle').value = '';
        document.getElementById('editYear').value = '';
        document.getElementById('editDescription').value = '';
        document.getElementById('editGenre').value = '';
    }
});