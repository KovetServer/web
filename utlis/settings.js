// settings.js
import { getLanguage } from "../js/providers/language.js";
import { loadComponent } from "../js/providers/components.js";

export var settings = {
    apiUrl: 'http://127.0.0.1:5501/api/',
    defaultUrl: 'http://127.0.0.1:5500/api/',
    languages: ['es', 'en', 'pt', 'fr', 'de', 'it'],
    load: {
        components: {
            main: [
                {
                    name: "main",
                    parent: "content",
                    url: "templates/main"
                },
                {
                    name: "footer",
                    parent: "footer",
                    url: "templates/footer"
                }
            ],
            login: [
                {
                    name: "login",
                    parent: "content",
                    url: "templates/login"
                }
            ],
            admin: [
                {
                    name: "header",
                    parent: "header",
                    url: "templates/admin/header"
                },
                {
                    name: "sidebar",
                    parent: "sidebar",
                    url: "templates/admin/sidebar"
                },
                {
                    name: "dashboard",
                    parent: "content",
                    url: "templates/admin/dashboard"
                },
                {
                    name: "users",
                    parent: "content",
                    url: "templates/admin/users"
                }
            ],
            user: [
                {
                    name: "userHeader",
                    parent: "header",
                    url: "templates/user/header"
                },
                {
                    name: "userProfile",
                    parent: "content",
                    url: "templates/user/profile"
                },
                {
                    name: "userSettings",
                    parent: "content",
                    url: "templates/user/settings"
                }
            ]
        }
    }
};
