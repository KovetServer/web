import { loadComponent } from '../js/providers/components';

// Llamada para cargar el componente
loadComponent({
    url: 'components/homeScreen/homeScreen',
    parent: 'content' // Asegúrate de que este ID existe en tu HTML
});
