// components.js
export async function loadComponent(options) {
    const { url, parent } = options;
    const urlParts = url.split('/');
    const fileName = urlParts[urlParts.length - 1];
    const now = new Date();
    const componentUrl = window.location.origin + '/' + url + '/';
    const requestUrl = componentUrl + fileName + '.html' + '?a=' + now.getTime();
    const moduleUrl = componentUrl + fileName + '.js';

    console.log('Loading content from', requestUrl);

    const response = await fetch(requestUrl, {
        headers: {
            'pragma': 'no-cache',
            'Cache-Control': 'no-cache',
            'cache': 'no-store'
        }
    });
    if (!response.ok) {
        throw new Error('Error fetching HTML component');
    }
    const html = await response.text();
    const parentElement = document.getElementById(parent);
    if (!parentElement) {
        console.error('Error: Parent element not found');
        console.error('Tried to find element with ID:', parent);
        throw new Error('Parent element not found');
    }
    parentElement.innerHTML = html;
    await importModule(moduleUrl);
}

async function importModule(moduleUrl) {
    console.log('Importing module from', moduleUrl);
    const module = await import(moduleUrl);
    if (typeof module.init === 'function') {
        module.init();
    } else {
        console.warn(`Module at ${moduleUrl} does not export an init function`);
    }
}


