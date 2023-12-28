


async function ApagarServidor(){
    const nombreServidor = obtenerNombreServidor();
    if (nombreServidor) {
        console.log('Nombre del servidor:', nombreServidor);
        await PaginaServidor(nombreServidor);
    }
    try {
        // Realiza una solicitud al servidor para obtener detalles del servidor por nombre
        const response = await fetch(`/servidores/detalles?nombre=${encodeURIComponent(nombreServidor)}`);
        if (!response.ok) {
            throw new Error(`Error al obtener detalles del servidor: ${response.statusText}`);
        }
        const detallesServidor = await response.json();          
        if(detallesServidor[0].Estado == "Iniciado"){              
        iniciadorserver=detallesServidor[0].Iniciador
        try {
            const response = await fetch('/servidores/actualizarEstado', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ nombre: nombreServidor, nuevoEstado: 'Apagado', nuevoIniciador: " " }),
            });
            console.log(JSON.stringify({ nombre: nombreServidor, nuevoEstado: 'Apagado', nuevoIniciador: " " }));

            if (response.ok) {
                // Actualización exitosa, ahora puedes realizar otras acciones si es necesario
                nombre2=sessionStorage.getItem("nombrevar")
                alert("¡"+nombre2+", has apagado el servidor para " + nombreServidor + "!")
                console.log('Estado del servidor actualizado correctamente.');
                document.getElementById("IniciarServer").style.display="inline"  
                document.getElementById("ApagarServer").style.display="none" 
            } else {
                // Manejar errores de la actualización
                console.error('Error al actualizar el estado del servidor:', response.statusText);
                alert('Error al iniciar el servidor.');
            }
        } catch (error) {
            console.error('Error en la solicitud:', error);
            alert('Error al iniciar el servidor. Detalles: ' + error.message);
            alert('Error al iniciar el servidor.');
        }
        }
        else{
            alert(nombre2 + ", no hay ningun servidor iniciado")
            document.getElementById("IniciarServer").style.display = "none";
            document.getElementById("ApagarServer").style.display = "inline";
        }
    } catch (error) {
        console.error('Error en la solicitud de detalles del servidor:', error);
        alert('Error al iniciar el servidor. Detalles: ' + error.message);

        // Manejar el error, por ejemplo, mostrar un mensaje al usuario
    }        
}











