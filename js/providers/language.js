// language.js

var currentLanguage = 'EN';

export function setLanguage(language) {
    currentLanguage = language;
    initSidemenu();
}

export function getLanguage() {
    return currentLanguage;
}
