document.getElementById('support-form').addEventListener('submit', function(event) {
    let isValid = true;
    
    function showError(id, message) {
        document.getElementById(id).textContent = message;
        document.getElementById(id.replace('-error', '')).classList.add('error');
    }
    function clearError(id) {
        document.getElementById(id).textContent = '';
        document.getElementById(id.replace('-error', '')).classList.remove('error');
    }
    
    let name = document.getElementById('name').value.trim();
    if (name.length < 3) {
        showError('name-error', 'Debe tener al menos 3 caracteres.');
        isValid = false;
    } else {
        clearError('name-error');
    }
    
    let email = document.getElementById('email').value.trim();
    if (!email.match(/^[^@]+@[^@]+\.[a-zA-Z]{2,}$/)) {
        showError('email-error', 'Correo no válido.');
        isValid = false;
    } else {
        clearError('email-error');
    }
    
    let phone = document.getElementById('phone').value.trim();
    if (phone && !phone.match(/^[0-9]+$/)) {
        showError('phone-error', 'Solo se permiten números.');
        isValid = false;
    } else {
        clearError('phone-error');
    }
    
    let message = document.getElementById('message').value.trim();
    if (message.length < 20) {
        showError('message-error', 'Debe tener al menos 20 caracteres.');
        isValid = false;
    } else {
        clearError('message-error');
    }
    
    let consent = document.getElementById('consent').checked;
    if (!consent) {
        showError('consent-error', 'Debes aceptar los términos.');
        isValid = false;
    } else {
        clearError('consent-error');
    }
    
    if (!isValid) {
        event.preventDefault();
    }
});