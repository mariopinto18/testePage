import BandController from '../controllers/BandController.js'

export default class CatalogView {
    constructor() {
        this.bandController = new BandController();

       // add band
        this.btnaddBand = document.getElementById('btnaddBand')
        this.bindAddBand();
      
        this.renderCatalog(this.bandController.getBands());

        // catálogo Filtro
        this.txtBand = document.getElementById('txtBand')
        this.sltGenre = document.getElementById('sltGenre')
        this.btnFilter = document.getElementById('btnFilter')
        this.bindFilter();
    
       // catálogo Ordenação
       this.btnSort = document.getElementById('btnSort')
       this.bindSort();

      
    }

    // clique no button add Band
    bindAddBand() {
        this.btnaddBand.addEventListener('click', () => {
            location.href="html/addBand.html";
    });
    }
    


    bindFilter() {
        this.btnFilter.addEventListener('click', () => {
            this.renderCatalog(this.bandController.getBands(this.txtBand.value, this.sltGenre.value));
        });
    }

    
    bindSort() {
        this.btnSort.addEventListener('click', () => {
            this.bandController.sortBands();
            this.bandController.renderCatalog(this.bandController.getBands());
        });
    }

    generateCard(band) {
        let result = ` 
        <div class="col-sm-4 mb-4">
            <div class="card h-100 bg-warning mb-3" >
                <img src="${band.photo}" class="card-img-top" style=" height: 10rem;">
                <div class="card-body">
                    <h5 class="card-title">${band.name}</h5>
                    <p class="card-text">${band.genre}</p>
                    <button id="${band.name}" class="btn btn-primary view">Ver mais</button>
        `
        // Só adiciona botão de "Remover" a um utilizador autenticado
        //if (sessionStorage.getItem("loggedUser")) 
        if (this.bandController.isLogged()) {
            result += `<button id="${band.name}" class="btn btn-danger remove">Remover</button>`
        }
        result += ` 
                </div>
            </div>
        </div> `;
        return result;

    }
    

    renderCatalog(bands = []) {

        // Gerir a visualização do botão Add
        this.bandController.isLogged() ?
            this.btnaddBand.style.visibility = 'visible' :
            this.btnaddBand.style.visibility = 'hidden';

        // --------------------------------------------
        const myCatalog = document.querySelector("#myCatalog")
        let result = ""
        let i = 0
        for (const band of bands) {
            // Criação de linha
            if (i % 3 === 0) {
               // result += `<div class="row">`
                result+= `<div class="row">`
            }
            // Geração do card    class h-100  height do card
            result+= this.generateCard(band);
           
            i++
            // Criação do fecho da linha
            if (i % 3 === 0) {
                result += `</div>`
            }
        }
        // Atribuição de todos os cards gerados ao elemento com id myCatalog
        myCatalog.innerHTML = result
    
        // Listener de todos os botões Ver Mais
        this.btnsSeeMore = document.getElementsByClassName("view")
        for (const elem of this.btnsSeeMore) {
               elem.addEventListener('click', () => {
                this.bandController.setCurrentBand(elem.id);
            });
        }


         // Listener de todos os botões Remover
        this.btnsRemove = document.getElementsByClassName("remove")
        for (const elem of this.btnsRemove) {
            elem.addEventListener('click',  () => {
                 // O id é o valor do atributo id de cada elemento button
                this.bandController.removeBand(elem.id)
            })
        }
              
    }  // render Catalog






}