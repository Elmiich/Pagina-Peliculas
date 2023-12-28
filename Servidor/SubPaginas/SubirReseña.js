// JavaScript para manejar el envío del formulario
async function subirReseña() {
    const comentario = document.getElementById('comentario').value;
    const calificación = document.getElementById('calificación').value;
    const usuario = sessionStorage.getItem('Usuario'); // Asegúrate de utilizar la clave correcta

    try {
        const response = await fetch('/resenas/subir-resena', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                comentario,
                calificación,
                usuario,
            }),
        });

        if (!response.ok) {
            throw new Error(`Error al subir la reseña: ${response.statusText}`);
        }

        const resultado = await response.json();
        console.log(resultado);
        console.log('Reseña enviada ' + usuario);
        mostrarTodasLasReseñas();
    } catch (error) {
        console.error('Error al subir la reseña:', error);
    }
}

async function mostrarTodasLasReseñas() {
    try {
        const response = await fetch('/resenas');


        if (!response.ok) {
            throw new Error(`Error al obtener todas las reseñas: ${response.statusText}`);
        }

        const reseñas = await response.json();

        const contenedorReseñas = document.getElementById('todas-las-resenas');
        contenedorReseñas.innerHTML = '';

        reseñas.forEach(reseña => {
            const elementoReseña = document.createElement('div');
            elementoReseña.innerHTML = `
            <div id="catalogoreseñas">
                <p><strong> Usuario: </strong> ${reseña.NombreUsuario}  </p>
                <p><strong> Comentario: </strong> ${reseña.Comentario}  </p>
                <p><strong> Calificación: </strong> ${reseña.Calificación}  </p>
                <!-- Mostrar otras propiedades de la reseña según sea necesario -->
                <hr>
            </div>
            `;
            contenedorReseñas.appendChild(elementoReseña);
        });
    } catch (error) {
        console.error('Error al obtener todas las reseñas:', error);
        // Realizar acciones adicionales según sea necesario (por ejemplo, mostrar un mensaje de error)
    }
}
document.addEventListener('DOMContentLoaded', () => {
    mostrarTodasLasReseñas();
});
