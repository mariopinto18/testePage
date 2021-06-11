
import BandController from '../controllers/BandController.js'

export default class AddBandView {
    constructor() {
        this.bandController = new BandController();
      
        // form de adicionar banda
       this.form = document.querySelector('#frmAddBand')
       // listener de submissão do formulário de nova banda
       this.form.addEventListener('submit', (event) =>  {
            this.txtName =  document.getElementById('txtName').value
            this.sltGenre = document.getElementById('sltGenre').value
            this.txtDescription = document.getElementById('txtDescription').value
            this.txtPhoto = document.getElementById('txtPhoto').value 
            this.txtMusic = document.getElementById('txtMusic').value
            this.bandController.addBand(this.txtName, this.sltGenre, this.txtPhoto, this.txtDescription, this.txtMusic);
            event.preventDefault()
       });
       
      

    }

}
