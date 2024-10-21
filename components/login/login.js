import { loadComponent } from '../../js/providers/components.js';
import { authenticateUser} from '../../js/auth.js';
import API_URL from '../../apiConfig.js';

export function init() {
    const container = document.querySelector(".container");
    const btnSignIn = document.getElementById("btn-sign-in");
    const btnSignUp = document.getElementById("btn-sign-up");

    btnSignIn.addEventListener("click", () => {
        container.classList.remove("toggle");
    });

    btnSignUp.addEventListener("click", () => {
        container.classList.add("toggle");
    });

    document.querySelector('.sign-in').addEventListener('submit', async function(e) {
        e.preventDefault();
        const email = document.querySelector('.sign-in input[type="email"]').value;
        const password = document.querySelector('.sign-in input[type="password"]').value;

        const user = await authenticateUser(email, password);

        if (user) {
            loadMainComponents(user.role);
        } else {
        }
    });

    // Manejo del registro
    document.querySelector('.sign-up').addEventListener('submit', async function(e) {
        e.preventDefault();
        const username = document.querySelector('#sign-up-username').value;
        const email = document.querySelector('#sign-up-email').value;
        const password = document.querySelector('#sign-up-password').value;

        const response = await fetch(`${API_URL}/cliente/signup`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ 
                username, 
                email, 
                password 
            })
        });
        if (response.ok) {
            alert('Registro exitoso');
            container.classList.remove("toggle");
        } else {
            const error = await response.text();
            alert('Error al registrarse: ' + error);
        }
    });
}

function loadMainComponents(role) {
    const main = document.getElementById('main');
    main.innerHTML = '';
    const components = role === 'admin' ? [] : []; 
    components.forEach(c => {
        loadComponent(c);
    });
    
}


