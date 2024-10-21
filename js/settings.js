export var settings = {
    load : {
        adminComponents: [
            {
                parent: 'header',
                url: 'components/header'
            },
            {
                parent: 'sidemenu',
                url: 'components/sidemenu'
            },
            {
                parent: 'content',
                url: 'components/homeScreen'
            },
        ],
        userComponents: [
            {
                parent: 'header',
                url: 'components/header'
            },
            {
                parent: 'sidemenu',
                url: 'components/sidemenu'
            },
            {
                parent: 'content',
                url: 'components/homeScreen'
            },
        ]
    },
    loginComponent: {
        parent: 'main',
        url: 'components/login'
    }
};
