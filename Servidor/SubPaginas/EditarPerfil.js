document.getElementById("NombreEditar").placeholder = sessionStorage.getItem("nombrevar");

var checkbox = document.getElementById("MostrarContraseña");

function MostrarContraseña() {
    if (checkbox.checked) {
        document.getElementById("EditarClave1").setAttribute("type", "text");
        document.getElementById("EditarClave2").setAttribute("type", "text");
    } else {
        document.getElementById("EditarClave1").type = 'password';
        document.getElementById("EditarClave2").type = 'password';
    }
}

async function ActualizarPerfil() {
    const usuario = sessionStorage.getItem("Usuario");

    const nombre = document.getElementById("NombreEditar").value;
    const usuarionuevo = document.getElementById("UsuarioEditar").value;
    const clave1 = document.getElementById("EditarClave1").value;
    const clave2 = document.getElementById("EditarClave2").value;

    // Puedes agregar validaciones aquí según tus requerimientos
    if (!nombre && !usuarionuevo && (!clave1 && !clave2)) {
        alert("¡Debe editar al menos un parámetro para poder actualizar su perfil!");
        return;
    }

    try {
        const response = await fetch('/perfil', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                usuario,
                nombre,
                clave: clave1 || clave2, // Usa clave1 si está definido, de lo contrario, usa clave2
            }),
        });

        if (!response.ok) {
            throw new Error(`Error al actualizar el perfil: ${response.statusText}`);
        }

        const resultado = await response.json();
        console.log(resultado);

        // Actualiza la información en sessionStorage solo si se cambió el usuario
        if (usuarionuevo) {
            sessionStorage.setItem("Usuario", usuarionuevo);
        }

        // Muestra el mensaje de éxito
        document.getElementById("CambioRealizado").style.display = "inline";
    } catch (error) {
        console.error('Error al actualizar el perfil:', error);
        // Puedes manejar el error mostrando un mensaje al usuario si lo deseas
    }
}

