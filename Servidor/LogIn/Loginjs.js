
//var tipologin=2          
/*async function IniciarSesion(){
    const response = await fetch("../LogIn/Cuentas.json");
    const json = await response.json();
    UsuarioIngresado=document.getElementById("Usuario").value;
    ClaveIngresado=document.getElementById("Contraseña").value;
    json.Cuentas.forEach(cuenta => {
        if(cuenta.Usuario==UsuarioIngresado){
            if(cuenta.Clave==ClaveIngresado){
                window.location="../Main/Index.html"        
                tipologin=0;      
                sessionStorage.setItem("nombrevar",cuenta.Nombre)  
                sessionStorage.setItem("FotoPerfil",cuenta.Foto)                
            }
        }                
    });        
    if(tipologin==2){          
        document.getElementById("Usuario").value="";              
        document.getElementById("Contraseña").value="";
        alert("Usuario o Contraseña Incorrectos")
    }                
}  */
// Loginjs.js
async function IniciarSesion() {
    const UsuarioIngresado = document.getElementById('Usuario').value;
    const ClaveIngresado = document.getElementById('Contraseña').value;
    const MantenerSesion = document.getElementById('MantenerSesion').checked
    console.log(MantenerSesion)
    try {
        const response = await fetch('/users');
        if (!response.ok) {
            throw new Error(`Error al obtener usuarios: ${response.statusText}`);
        }

        const users = await response.json();

        let loginC = false;

        if (users && users.length > 0) {
            // Iterar sobre las cuentas y verificar las credenciales
            for (const cuenta of users) {
                if (cuenta.Usuario === UsuarioIngresado && cuenta.Contraseña === ClaveIngresado) {
                    // Las credenciales coinciden
                    loginC = true;
                    if (MantenerSesion === true){
                        localStorage.setItem("Usuario", cuenta.Usuario)
                        localStorage.setItem("nombrevar", cuenta.Nombre);
                        localStorage.setItem("FotoPerfil", cuenta.Foto);
                    }
                    sessionStorage.setItem("Usuario", cuenta.Usuario)
                    sessionStorage.setItem("nombrevar", cuenta.Nombre);
                    sessionStorage.setItem("FotoPerfil", cuenta.Foto);
                    break; // Salir del bucle si se encuentra una coincidencia
                }
            }
        }

        if (loginC) {
            console.log('Inicio de sesión exitoso');
            window.location = "../Main/Index.html";
        } else {
            alert('Credenciales incorrectas');
        }
    } catch (error) {
        console.error('Error en la solicitud:', error);
        alert('Error en la solicitud');
    }
}

document.onkeydown = function (e) {
    if (e.key == "Enter") {
        IniciarSesion();
    }
}
