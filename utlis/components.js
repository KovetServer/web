// components.js
import { settings } from "../settings/settings.js";

export function loadComponent({ name, parent, url }) {
    fetch(url)
        .then(response => response.text())
        .then(html => {
            document.getElementById(parent).innerHTML = html;
        })
        .catch(error => console.error('Error loading component:', error));
}

export function content(section) {
    const components = settings.load.components[section];
    components.forEach(c => {
        loadComponent(c);
    });
}

document.addEventListener('DOMContentLoaded', () => {
    const currentSection = window.location.pathname.includes('admin') ? 'admin' : 'user';
    content(currentSection);
});
