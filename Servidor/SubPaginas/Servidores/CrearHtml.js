function obtenerNombreServidor() {
    const urlParams = new URLSearchParams(window.location.search);
    const nombreServidor = urlParams.get('nombre');
    return nombreServidor;
}

window.onload = async function () {
    const nombreServidor = obtenerNombreServidor();

    if (nombreServidor) {
        console.log('Nombre del servidor:', nombreServidor);
        await PaginaServidor(nombreServidor);
    }
};

function obtenerNombreServidor() {
    const urlParams = new URLSearchParams(window.location.search);
    const nombreServidor = urlParams.get('nombre');
    return nombreServidor;
}

async function PaginaServidor(Nombre) {
    const MenuInicioServerContainer = document.getElementById('server-container');

    try {
        // Realiza una solicitud al servidor para obtener detalles del servidor por nombre
        const response = await fetch(`/servidores/detalles?nombre=${encodeURIComponent(Nombre)}`);
        if (!response.ok) {
            throw new Error(`Error al obtener detalles del servidor: ${response.statusText}`);
        }
        const detallesServidor = await response.json();
        if(detallesServidor[0]['Java/Windows10'] == "Si"){
            const PaginaServidor = `
            <p id="Titulo">Iniciar servidor de ${detallesServidor[0].Nombre}:</p>
            <div class="Server">           
                <div class="MenuServer">
                    <img src="${detallesServidor[0].Imagen}" width="240px" height="372px">
                </div>
                <p class="NombreJuego">${detallesServidor[0].Nombre}</p>
                <p class="Instrucciones">${detallesServidor[0].Instrucciones}</p>
                <br>
                <div id="Formulario">
                    <div id = "Radio">
                        <p>Seleccione versión:</p>
                        <br>
                        <label id = "Java">
                            <input type="radio" name="opcion" value="Java" id="Java" checked> Java
                        </label>
                        <label id = "Windows10">
                            <input type="radio" name="opcion" value="Windows" id="Windows"> Windows 10
                        </label>
                    </div>
                    <br>
                </div>
                <br>
                <button id="IniciarServer" onclick="IniciarServidor()">Iniciar Servidor</button>
                <br>
                <button id="ApagarServer" onclick="ApagarServidor()">Apagar Servidor</button>
            </div>`;

        MenuInicioServerContainer.innerHTML = PaginaServidor;
        } else {
            const PaginaServidor = `
            <p id="Titulo">Iniciar servidor de ${detallesServidor[0].Nombre}:</p>
            <div class="Server">           
                <div class="MenuServer">
                    <img src="${detallesServidor[0].Imagen}" width="240px" height="372px">
                </div>
                <p class="NombreJuego">${detallesServidor[0].Nombre}</p>
                <p class="Instrucciones">${detallesServidor[0].Instrucciones}</p>
                <br>
                <button id="IniciarServer" onclick="IniciarServidor()">Iniciar Servidor</button>
                <br>
                <button id="ApagarServer" onclick="ApagarServidor()">Apagar Servidor</button>
            </div>`;
            MenuInicioServerContainer.innerHTML = PaginaServidor;
        }
    } catch (error) {
        console.error('Error en la solicitud de detalles del servidor:', error);
        // Manejar el error, por ejemplo, mostrar un mensaje al usuario
    }
}
async function IniciarServidor() {
    const nombreServidor = obtenerNombreServidor();
    const radioJava = document.getElementById('Java');
    const radioWindows = document.getElementById('Windows');
    const iniciadorserver = sessionStorage.getItem("nombrevar");

    if (nombreServidor) {
        await PaginaServidor(nombreServidor);
    }

    try {
        const response = await fetch(`/servidores/detalles?nombre=${encodeURIComponent(nombreServidor)}`);

        if (!response.ok) {
            throw new Error(`Error al obtener detalles del servidor: ${response.statusText}`);
        }

        const detallesServidor = await response.json();

        if (detallesServidor[0].Estado === "Apagado") {
            let comando;
            if (radioJava && radioJava.checked) {
                comando = detallesServidor[0]['Comando Java'];
                alert(`Iniciando servidor para ${nombreServidor}, por favor espera un momento ${iniciadorserver}`);
                const actualizarResponse = await fetch('/servidores/actualizarEstado', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ nombre: nombreServidor, nuevoEstado: 'Iniciado', nuevoIniciador: iniciadorserver }),
                });

                if (actualizarResponse.ok) {
                    console.log('Estado del servidor actualizado correctamente.');
                    alert(`Servidor para ${nombreServidor} iniciado, puede proceder a entrar ${iniciadorserver}`);
                    document.getElementById('IniciarServer').style.display = 'none';
                    document.getElementById('ApagarServer').style.display = 'inline';
                } else {
                    console.error('Error al actualizar el estado del servidor:', actualizarResponse.statusText);
                    alert('Error al iniciar el servidor.');
                }
                try {
                    const iniciarResponse = await fetch('/servidores/iniciar', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({ nombre: nombreServidor, comando }),
                    });
    
                    if (!iniciarResponse.ok) {
                        throw new Error(`Error al iniciar el servidor: ${iniciarResponse.statusText}`);
                    }
    
                    const data = await iniciarResponse.json();
                    console.log(data);
    
                    
                } catch (error) {
                    console.error('Error al iniciar el servidor:', error);
                    alert('Error al iniciar el servidor.');
                }
            
            } else if (radioWindows && radioWindows.checked) {
                comando = detallesServidor[0]['Comando Windows 10'];
                alert(`Iniciando servidor para ${nombreServidor}, por favor espera un momento ${iniciadorserver}`);
                const actualizarResponse = await fetch('/servidores/actualizarEstado', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ nombre: nombreServidor, nuevoEstado: 'Iniciado', nuevoIniciador: iniciadorserver }),
                });

                if (actualizarResponse.ok) {
                    console.log('Estado del servidor actualizado correctamente.');
                    alert(`Servidor para ${nombreServidor} iniciado, puede proceder a entrar ${iniciadorserver}`);
                    document.getElementById('IniciarServer').style.display = 'none';
                    document.getElementById('ApagarServer').style.display = 'inline';
                } else {
                    console.error('Error al actualizar el estado del servidor:', actualizarResponse.statusText);
                    alert('Error al iniciar el servidor.');
                }
                try {
                    const iniciarResponse = await fetch('/servidores/iniciar', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({ nombre: nombreServidor, comando }),
                    });
    
                    if (!iniciarResponse.ok) {
                        throw new Error(`Error al iniciar el servidor: ${iniciarResponse.statusText}`);
                    }
    
                    const data = await iniciarResponse.json();
                    console.log(data);
    
                    
                } catch (error) {
                    console.error('Error al iniciar el servidor:', error);
                    alert('Error al iniciar el servidor.');
                }
                


                
            } else {
                comando = detallesServidor[0]['Comando Java'];
                alert(`Iniciando servidor para ${nombreServidor}, por favor espera un momento ${iniciadorserver}`);
                const actualizarResponse = await fetch('/servidores/actualizarEstado', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ nombre: nombreServidor, nuevoEstado: 'Iniciado', nuevoIniciador: iniciadorserver }),
                });

                if (actualizarResponse.ok) {
                    console.log('Estado del servidor actualizado correctamente.');
                    alert(`Servidor para ${nombreServidor} iniciado, puede proceder a entrar ${iniciadorserver}`);
                    document.getElementById('IniciarServer').style.display = 'none';
                    document.getElementById('ApagarServer').style.display = 'inline';
                } else {
                    console.error('Error al actualizar el estado del servidor:', actualizarResponse.statusText);
                    alert('Error al iniciar el servidor.');
                }
                try {
                    const iniciarResponse = await fetch('/servidores/iniciar', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({ nombre: nombreServidor, comando }),
                    });
    
                    if (!iniciarResponse.ok) {
                        throw new Error(`Error al iniciar el servidor: ${iniciarResponse.statusText}`);
                    }
    
                    const data = await iniciarResponse.json();
                    console.log(data);
    
                    
                } catch (error) {
                    console.error('Error al iniciar el servidor:', error);
                    alert('Error al iniciar el servidor.');
                }
            }
        } else {
            alert('El servidor ya está iniciado.');
            document.getElementById('IniciarServer').style.display = 'none';
            document.getElementById('ApagarServer').style.display = 'inline';
        }
            
        }catch (error) {
        console.error('Error en la solicitud de detalles del servidor:', error);
        alert('Error al iniciar el servidor. Detalles: ' + error.message);
    }
}


