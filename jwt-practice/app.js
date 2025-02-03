// 1. Token JWT generado manualmente (simulación)
const JWT_TOKEN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsInVzZXJuYW1lIjoidXN1YXJpb19wcnVlYmEiLCJleHAiOjE3MzkwMDAwMDB9.qtdWPUppuZR0twOEy2a2zvf2H6da2pLf1MvLCb79So8'

console.log("Token en localStorage:", getToken());

// Guardar el token en localStorage solo si no está almacenado
if (!localStorage.getItem('jwtToken')) {
    localStorage.setItem('jwtToken', JWT_TOKEN);
}



// Obtener el token desde localStorage
function getToken() {
    return localStorage.getItem('jwtToken');
}


// 2. Función para validar el token (simulación)
function validateToken(token) {
	try {
        if (!token) throw new Error("Token no encontrado");

    	// Decodificar el token (sin verificar firma)
    	const payload = JSON.parse(atob(token.split('.')[1]));

        console.log("Tiempo actual:", Math.floor(Date.now() / 1000));
        console.log("Expiración del token:", payload.exp);

        // Verificar expiración
        if (payload.exp < Math.floor(Date.now() / 1000)) {
            throw new Error("Token expirado");
        }

        return true;
	} catch (error) {
    	console.error("Token inválido:", error);
    	return false;
	}
}

// 3. Función GET con JWT
async function fetchDataWithJWT() {
    const token = getToken();
    
    if (!validateToken(token)) {
        alert("Token inválido o expirado");
        return;
    }

    try {
        const response = await fetch('https://jsonplaceholder.typicode.com/posts/1', {
            headers: { 'Authorization': `Bearer ${token}` } // Usar token desde localStorage
        });

        const data = await response.json();
        document.getElementById('response').innerHTML = `<pre>${JSON.stringify(data, null, 2)}</pre>`;
    } catch (error) {
        console.error("Error GET:", error);
    }
}

// 4. Función POST con JWT
document.getElementById('postForm').addEventListener('submit', async (e) => {
	e.preventDefault();

    const token = getToken();
    
	if (!validateToken(token)) {
    	alert("Token inválido o expirado");
    	return;
	}

	const postData = {
    	title: document.getElementById('data').value,
    	body: 'Contenido de prueba',
    	userId: 1
	};

	try {
    	const response = await fetch('https://jsonplaceholder.typicode.com/posts', {
        	method: 'POST',
        	headers: {
            	'Authorization': `Bearer ${token}`,
            	'Content-Type': 'application/json'
        	},
            body: JSON.stringify(postData)
    	});
    	
        const data = await response.json();
        document.getElementById('response').innerHTML = `<pre>${JSON.stringify(data, null, 2)}</pre>`;
	} catch (error) {
        console.error("Error POST:", error);
	}
});

// 5. Función para cerrar sesión
function logout() {
    localStorage.removeItem('jwtToken');
    alert("Sesión cerrada. Recarga la página para ingresar un nuevo token.");
}



