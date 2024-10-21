import { getLanguage } from "../../js/providers/language.js";
import { menu } from "./settings.js";
import { loadComponent } from "../../js/providers/components.js";
import { logoutUser } from "../../js/auth.js";


export function init() {
    console.log('Inicializando sidemenu...');
    const language = getLanguage();
    drawMenu(language);
    drawProfile();
}

function drawMenu(language) {
    const sidemenuElement = document.getElementById("sidemenu");
    if (!sidemenuElement) return;

    sidemenuElement.innerHTML = ''; 
    sidemenuElement.innerHTML += '<link rel="stylesheet" href="components/sidemenu/sidemenu.css">'; 

    menu.forEach(option => {
        drawMenuOption(option, language);
    });
}

function drawMenuOption(option, language) {
    console.log('Dibujando opción:', option);

    var parent = document.getElementById('sidemenu');

    var divOption = document.createElement('div');
    divOption.id = 'sidemenu-option-' + option.module;
    divOption.className = 'sidemenu-option tooltip';
    parent.appendChild(divOption);

    var divIcon = document.createElement('div');
    divIcon.className = 'sidemenu-icon';
    divIcon.style.background = 'var(--' + option.module + ')';
    divOption.appendChild(divIcon);

    var icon = document.createElement('i');
    icon.className = option.icon;
    divIcon.appendChild(icon);

    var divTitle = document.createElement('div');
    divTitle.className = 'sidemenu-title';
    divOption.appendChild(divTitle);

    var label = document.createElement('label');
    label.className = 'title';
    label.textContent = language === 'EN' ? option.title[1] : option.title[0];
    divTitle.appendChild(label);

    divIcon.setAttribute('title', label.textContent);

    if (option.submenuOptions && option.submenuOptions.length > 0) {
        var divArrow = document.createElement('div');
        divArrow.className = 'sidemenu-arrow';
        divOption.appendChild(divArrow);

        var arrowIcon = document.createElement('i');
        arrowIcon.className = 'fas fa-chevron-down';
        divArrow.appendChild(arrowIcon);

        var submenuContainer = document.createElement('div');
        submenuContainer.className = 'submenu-container';
        submenuContainer.style.maxHeight = '0';
        parent.appendChild(submenuContainer);

        option.submenuOptions.forEach(function(item) {
            var divItem = document.createElement('div');
            divItem.className = 'submenu-item';

            var divSubmenuIcon = document.createElement('div');
            divSubmenuIcon.className = 'submenu-icon';
            divSubmenuIcon.style.background = 'var(--' + option.module + ')';
            divItem.appendChild(divSubmenuIcon);

            var submenuIcon = document.createElement('i');
            submenuIcon.className = item.icon;
            divSubmenuIcon.appendChild(submenuIcon);

            var submenuTitle = document.createElement('label');
            submenuTitle.className = 'submenu-title';
            submenuTitle.textContent = language === 'EN' ? item.label[1] : item.label[0];
            divItem.appendChild(submenuTitle);

            submenuContainer.appendChild(divItem);
            divItem.addEventListener('click', function() {
                loadComponent({
                    url: item.url,
                    parent: 'content'
                });
            });
        });

        divArrow.addEventListener('click', function() {
            if (submenuContainer.style.maxHeight === '0px') {
                submenuContainer.style.maxHeight = submenuContainer.scrollHeight + 'px';
                arrowIcon.className = 'fas fa-chevron-up';
            } else {
                submenuContainer.style.maxHeight = '0';
                arrowIcon.className = 'fas fa-chevron-down';
            }
        });
    }

    if (option.module && option.url) {
        divOption.addEventListener('click', function() {
            loadComponent({
                url: option.url,
                parent: 'content'
            });
        });
    }
}

function drawProfile() {
    const sidemenuElement = document.getElementById("sidemenu");
    if (!sidemenuElement) return;

    // Eliminar cualquier perfil existente para evitar duplicados
    const existingProfile = document.querySelector('.profile-container');
    if (existingProfile) {
        existingProfile.remove();
    }

    const userData = JSON.parse(localStorage.getItem('userData'));
    if (!userData) {
        console.error('No user data found');
        return;
    }

    console.log('Datos del usuario:', userData); // Verificar que los datos se están cargando

    var profileDiv = document.createElement('div');
    profileDiv.className = 'profile-container';
    profileDiv.addEventListener('click', openUserProfile);

    var img = document.createElement('img');
    img.src = './assents/emplados.jpg';
    img.onerror = function() {
        this.src = './assents/emplados.jpg';
    };
    profileDiv.appendChild(img);

    var name = document.createElement('div');
    name.className = 'profile-name';
    name.textContent = userData.username;
    profileDiv.appendChild(name);

    var position = document.createElement('div');
    position.className = 'profile-position';
    position.textContent = ''; // Puedes cambiar esto si tienes el campo en los datos del usuario
    profileDiv.appendChild(position);

    sidemenuElement.appendChild(profileDiv);
}

function openUserProfile() {
    const userData = JSON.parse(localStorage.getItem('userData'));
    if (!userData) {
        console.error('No user data found');
        return;
    }

    var modal = document.createElement('div');
    modal.className = 'modal';

    var modalContent = document.createElement('div');
    modalContent.className = 'modal-content';

    var closeButton = document.createElement('span');
    closeButton.className = 'close-button';
    closeButton.innerHTML = '&times;';
    closeButton.onclick = function() {
        modal.style.display = 'none';
        document.body.classList.remove('modal-open');
    };
    modalContent.appendChild(closeButton);

    var profileImage = document.createElement('img');
    profileImage.src = './assents/emplados.jpg';
    profileImage.className = 'modal-profile-image';
    profileImage.onerror = function() {
        this.src = './assents/emplados.jpg';
    };
    modalContent.appendChild(profileImage);

    // Mostrar y permitir la edición de todos los datos del usuario
    var fields = [
        { label: 'Username:', value: userData.username, editable: false, key: 'username' },
        { label: 'Email:', value: userData.email, editable: false, key: 'email' },
    ];
    
    fields.forEach(field => {
        var fieldContainer = document.createElement('div');
        fieldContainer.className = 'modal-profile-field';
    
        var label = document.createElement('div');
        label.className = 'modal-profile-label';
        label.textContent = field.label;
        fieldContainer.appendChild(label);
    
        if (field.editable) {
            var input = document.createElement('input');
            input.type = 'text';
            input.value = field.value;
            input.className = 'modal-profile-input';
            input.id = `input-${field.key}`;
            fieldContainer.appendChild(input);
        } else {
            var value = document.createElement('div');
            value.className = 'modal-profile-value';
            value.textContent = field.value;
            fieldContainer.appendChild(value);
        }
    
        modalContent.appendChild(fieldContainer);
    });
    

    var logoutButton = document.createElement('button');
    logoutButton.className = 'logout-button';
    logoutButton.textContent = 'Logout';
    logoutButton.onclick = function() {
        logoutUser();
    };
    modalContent.appendChild(logoutButton);

    modal.appendChild(modalContent);
    document.body.appendChild(modal);

    document.body.classList.add('modal-open');
    modal.style.display = 'block';
}

document.addEventListener('DOMContentLoaded', init);

