// 1. Función para obtener posts
async function fetchPosts() {
    const container = document.getElementById('posts');
	try {
        const response = await fetch('https://jsonplaceholder.typicode.com/posts');
    	if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    	const posts = await response.json();
    	displayPosts(posts.slice(0, 5)); // Mostrar solo 5 posts
	} catch (error) {
        console.error('Error:', error);
        container.innerHTML = `<p style="color: red;">Error al cargar los posts. Intentalo de nuevo mas tarde.</p>`;
	}
}
 
// 2. Función para mostrar posts en el DOM
function displayPosts(posts) {
	const container = document.getElementById('posts');
	container.innerHTML = posts
    	.map(post => `<div><h3>${post.title}</h3><p>${post.body}</p></div>`)
    	.join('');
}
 
// 3. Ejecutar al cargar la página
fetchPosts();

// 4. Función de login
async function loginUser(email, password) {
    if (!email || !password) {
        console.error('Error: Email y password son obligatorios.');
        alert('Por favor, ingresa un email y password.');
        return null; // Retorna null si los campos están vacíos
    }

	try {
    	const response = await fetch('https://reqres.in/api/login', {
        	method: 'POST',
        	headers: { 'Content-Type': 'application/json' },
        	body: JSON.stringify({ email, password }),
    	});
    	if (!response.ok) throw new Error(`Error: ${response.status}`);
    	const data = await response.json();
    	return data.token; // Retorna el token JWT
	} catch (error) {
        console.error('Login fallido:', error);
	}
}
 
// 5. Ejemplo de uso (simular login)
async function main() {
   
	const token = await loginUser('email', 'password'); // Credenciales de prueba
	if (token) {
    	console.log('Token JWT:', token);
    	// ¡Ahora puedes usar este token en otras peticiones!
	}
}
main();

// 6. Función para obtener datos protegidos con JWT
async function fetchProtectedData(token) {
	try {
    	const response = await fetch('https://jsonplaceholder.typicode.com/users/1', {
        	headers: { 'Authorization': `Bearer ${token}` }, // Simulación
    	});
    	if (!response.ok) throw new Error(`Error: ${response.status}`);
    	const user = await response.json();
    	console.log('Usuario protegido:', user);
	} catch (error) {
        console.error('Error al obtener datos protegidos:', error);
	}
}
 
// Modificar la función main para incluir esto:
async function main() {
    const email = prompt('Ingrese su email:');
    const password = prompt('Ingrese su password:');

    const token = await loginUser(email, password);
    if (token) {
        console.log('Token JWT:', token);
        await fetchProtectedData(token); // Usar el token
	}
}