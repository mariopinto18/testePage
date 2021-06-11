import BandController from '../controllers/BandController.js'

export default class BandView {
    constructor() {
        this.bandController = new BandController();

        // obter a banda atual, na que clicou
        let band = this.bandController.getCurrentBand();

        // alimentar  a pãgina band.html
        document.getElementById('bandName').innerHTML = band.name
        document.getElementById('bandGenre').innerHTML = band.genre
        document.getElementById('bandDescription').innerHTML = band.desc
        document.getElementById('bandPhoto').src = band.photo
    

    }

}
