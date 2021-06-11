import BandModel from "../models/BandModel.js"

export default class BandController {

    constructor() {
        this.bands = localStorage.bands ? JSON.parse(localStorage.bands) : [];
    }


    /**
     * Função que recebe todos os detalhes de uma banda e adiciona-a
     * @param {string} txtName Nome da banda
     * @param {string} sltGenre género de música que a banda toca
     * @param {string} txtDescription descrição da banda
     * @param {string} txtPhoto link para foto da banda
     * @param {string} txtVideo link para veideoclip da banda
     */
    addBand(txtName, sltGenre, txtPhoto, txtDescription, txtMusic) {
        let existBand = false
        for (const band of this.bands) {
            if (band.name === txtName) {
                existBand = true
            }
        }
        if (!existBand) {
            this.bands.push(new BandModel(txtName, sltGenre, txtPhoto, txtDescription, txtMusic))
            localStorage.setItem("bands", JSON.stringify(this.bands))
            alert(`Banda ${txtName} adicionada!`)
            // Redirecionamento do fluxo para a página principal
            location.href = "../index.html"
        } else {
            //throw Error(`Banda ${txtName} já existe!`)
            alert(`Banda ${txtName} já existe!`)
        }
    }

    /**
     * Função que recebe o nome de uma banda e elimina a banda respetiva
     * @param {string} txtName Nome da banda
     */
    removeBand(txtName) {
        let removeBand = confirm(`Deseja mesmo remover a banda ${txtName}?`)
        if (removeBand) {
            for (let i = 0; i < this.bands.length; i++) {
                if (this.bands[i].name === txtName) {
                    this.bands.splice(i, 1)
                }
            }
            localStorage.setItem("bands", JSON.stringify(this.bands))
            location.reload()
        }
    }

    /**
     * Função que recebe o nome de uma banda e define-a como a banda atual (a ser exibida)
     * @param {string} txtName Nome da banda
     */
    setCurrentBand(txtName) {
        localStorage.setItem("band", txtName)
        location.href = "html/band.html"
    }

    /**
     * Função que recebe o nome de uma banda e devolve o objeto Band associado
     * @param {string} txtName Nome da banda
     * @returns {object} o objeto Band
     */
    getCurrentBand() {
        const band = localStorage.getItem("band")
        for (let i = 0; i < this.bands.length; i++) {
            if (this.bands[i].name === band) {
                return this.bands[i]
            }
        }
    }

    /**
     * Função que ordena o array de bandas pelo nomedas bandas e guarda o array ordenado na LocalStorage
     */
    sortBands() {
        this.bands.sort(this.compare)
        localStorage.setItem("bands", JSON.stringify(this.bands))
    }

     // Compara duas bandas pelo seu nome. Faz uma ordenação alfabética crescente
    compare(bandA, bandB) {
        if (bandA.name < bandB.name)
            return -1;
        if (bandA.name > bandB.name)
            return 1;
        return 0;
    }

    isLogged() {
        return sessionStorage.getItem('loggedUser') !== null ? true : false;
    }


    getBands(filterName = '', filterGenre = '', isSorted = false) {
        let filteredBands = this.bands.filter(
            band =>
                (band.name.toLowerCase().includes(filterName.toLowerCase()) || filterName === '')
                &&
                (band.genre == filterGenre || filterGenre === '')
        )

        filteredBands = isSorted ? filteredBands.sort(this.compare) : filteredBands

        return filteredBands
    }


} // classe