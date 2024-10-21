import { loadComponent } from './providers/components.js';
import { settings } from './settings.js';
import { authenticateUser, getUserRole } from './auth.js';

// Event handler
window.addEventListener('load', checkAuthentication);

function checkAuthentication() {
    const role = getUserRole();
    if (role) {
        loadMainComponents(role);
    } else {
        loadLogin();
    }
}

// Load login component
function loadLogin() {
    console.log('Loading Login...');
    loadComponent(settings.loginComponent).then(() => {
        setupLogin();
    }).catch(error => {
        console.error('Error loading login component:', error);
    });
}

function setupLogin() {
    const signInForm = document.querySelector('.sign-in');
    if (signInForm) {
        signInForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            const emailInput = document.querySelector('.sign-in input[type="email"]');
            const passwordInput = document.querySelector('.sign-in input[type="password"]');
            if (emailInput && passwordInput) {
                const email = emailInput.value;
                const password = passwordInput.value;
                
                const user = await authenticateUser(email, password);
                
                if (user) {
                    loadMainComponents(user.role);
                } else {
                    alert('Email o contraseña incorrectos');
                }
            }
        });
    }
}
// Load main components based on user role
function loadMainComponents(role) {
    console.log('Loading Main Components...');
    const components = role === 'admin' ? settings.load.adminComponents : settings.load.userComponents;
    document.getElementById('main').innerHTML = ''; // Limpiar contenido previo
    components.forEach(c => {
        loadComponent(c);
    });
}
