async function IniciarSesionQR() {
    const UsuarioIngresado = document.getElementById('Usuario').value;
    const ClaveIngresado = document.getElementById('Contraseña').value;
    const token = sessionStorage.getItem('qrToken');
    const MantenerSesion = document.getElementById('MantenerSesion').checked;

    try {
        const response = await fetch('http://caduto.online:4018/login/qr', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username: UsuarioIngresado, password: ClaveIngresado, token: token })
        });

        if (!response.ok) {
            throw new Error(`Error al iniciar sesión: ${response.statusText}`);
        }

        const data = await response.json();

        if (data.success) {
            console.log('Inicio de sesión exitoso');
            const cuenta = {
                Usuario: data.Usuario,
                Nombre: data.Nombre,
                Foto: data.Foto
            };

            if (MantenerSesion) {
                localStorage.setItem("Usuario", cuenta.Usuario);
                localStorage.setItem("nombrevar", cuenta.Nombre);
                localStorage.setItem("FotoPerfil", cuenta.Foto);
            }

            sessionStorage.setItem("Usuario", cuenta.Usuario);
            sessionStorage.setItem("nombrevar", cuenta.Nombre);
            sessionStorage.setItem("FotoPerfil", cuenta.Foto);

            window.location.href = '../Main/Index.html';
        } else {
            alert('Credenciales incorrectas');
        }
    } catch (error) {
        console.error('Error en la solicitud:', error);
        alert(`Error en la solicitud: ${error.message}`); 
    }
}
