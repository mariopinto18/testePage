import UserView from './views/UserView.js'
import CatalogView from './views/CatalogView.js'
import BandView from './views/BandView.js'
import AddBandView from './views/AddBandView.js'


class App {
    constructor() {
        this.routes = {
            '': [UserView, CatalogView],
            'index': [UserView, CatalogView],
            'band': [BandView],
            'addBand': [AddBandView]
        };

        // importa dados dummy para testes
        this.#importDataFixtures();

        // / instancia as views mapeadas no objeto routes
        this.#instantiateViews();
    }

    #importDataFixtures() {
        const users = [
            {
                username: 'user1',
                password: 'pass1'
            },
            {
                username: 'user2',
                password: 'pass2'
            }
        ];

        // Load the fixtures in case there is no data in the local storage 
        if (!localStorage.users) {
            localStorage.setItem('users', JSON.stringify(users));
        }

        const bands = [
            {
                name: 'Muse',
                genre: 'Pop-Rock',
                photo: 'http://www.planckmachine.com/wp-content/uploads/2016/09/hysteria-muse-meaning-song.jpg', 
                desc: 'The best band ever', 
                music: 'xxx'
            },
            {
                name: 'RadioHead',
                genre: 'Pop-Rock',
                photo: 'https://ep01.epimg.net/elpais/imagenes/2017/05/17/icon/1495017818_647155_1495125183_noticia_normal.jpg', 
                desc: 'The best band ever', 
                music: 'xxx'
            },
            {
                name: 'James',
                genre: 'Pop-Rock',
                photo: 'http://ksassets.timeincuk.net/wp/uploads/sites/55/2013/01/2012JamesBandPress181212-2.jpg', 
                desc: 'The best band ever', 
                music: 'xxx'
            },
            {
                name: 'Metallica',
                genre: 'Metal',
                photo: 'https://images.impresa.pt/blitz/2016-08-19-metallica.jpg/original/mw-860', 
                desc: 'The best band ever', 
                music: 'xxx'
            },
            {
                name: 'Placebo',
                genre: 'Pop-Rock',
                photo: 'https://i.ytimg.com/vi/9aIYBSiAEDk/0.jpg', 
                desc: 'The best band ever', 
                music: 'xxx'
            }
        ];
        // Load the fixtures in case there is no data in the local storage 
        if (!localStorage.bands) {
            localStorage.setItem('bands', JSON.stringify(bands));
        }
      
    }

    #instantiateViews() {
        const path = window.location.pathname
        const file = path.substr(path.lastIndexOf('/') + 1);
        const route = file.split('.')[0];
        const views = this.#getViews(route);
        for (const view of views) {
            new view();
        }
    }

    #getViews(route) {
        return typeof this.routes[route] === 'undefined' ? [] : this.routes[route];
    }


}

new App();