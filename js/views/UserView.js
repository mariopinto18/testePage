import UserController from '../controllers/UserController.js'

export default class UserView {
    constructor() {
        this.userController = new UserController();
        // atualiza a navbar tendo em conta se o user está autenticado ou não
        this.updateNavbar();

        // Se utilizador autenticado , com a key loggedUser na sessionStorage
        if (sessionStorage.getItem("loggedUser")) {
              // Apresentação do nome do utilizador autenticado
              let nameUser = this.userController.nameUser();
              document.querySelector("#loggedUser").innerHTML = `Olá <a href="#">${nameUser} </a>`

              // Gestão do botão de logout+
             this.logoutButton = document.getElementById('btnLogout');
             this.bindLogout();
        }

        // Gestão do formulário de Registo
        this.registerUsername = document.getElementById('txtUsernameRegister');
        this.registerPassword = document.getElementById('txtPasswordRegister');
        this.registerPassword2 = document.getElementById('txtPasswordRegister2');
        this.registerButton = document.querySelector("#frmRegister");
        this.bindRegisterForm();

        // Gestão do formulário de Login
        this.loginUsername = document.getElementById('txtUsername');
        this.loginPassword = document.getElementById('txtPassword');
        this.loginButton = document.querySelector('#frmLogin')
        this.logoutButton = document.getElementById('btnLogout');
        this.bindLoginForm();

         
        this.messages = document.querySelector('#messages')
    }


    // Listener para o registo
    bindRegisterForm() {
        this.registerButton.addEventListener('submit', () => {

            try {
                if (this.registerPassword.value !== this.registerPassword2.value) {
                    throw Error('Password and Confirm Password are not equal');
                }
                this.userController.register(this.registerUsername.value, this.registerPassword.value);
                this.displayMessage('User registered with success!', 'success');
            } catch (e) {
                this.displayMessage(e, 'danger');
            }
        });
    }


    
    // Listener para o login / autenticação
    bindLoginForm() {
        this.loginButton.addEventListener('submit', () => {
            try {
                this.userController.login(this.loginUsername.value, this.loginPassword.value);
                this.displayMessage('User logged in with success!', 'success');
                // Wait 1 second before reloading, so the user can see the login success message
                setTimeout(() => {
                    location.reload()
                },
                    1000);

            } catch (e) {
                 this.displayMessage(e, 'danger');
            }
        });

    
    }


    bindLogout() {
        this.logoutButton.addEventListener('click', () => {
            this.userController.logout();
            location.reload()
        });
    }

    displayMessage(message, type) {
        this.messages.innerHTML =
            `<div class="alert alert-${type}" role="alert">${message}</div>`;
        alert(`${message}`)
    }


 /* Função para atualizar a barra de navageação tendo em conta se existe (ou não) algum utilizador autenticado
 */
    updateNavbar() {
        const nav = document.querySelector("nav")
        let result = ""
        result =
            `
            <a class="navbar-brand" href="../index.html">MyMusic</a>
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#collapsibleNavbar">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="collapsibleNavbar">            
                `
        if (sessionStorage.getItem("loggedUser")) {
            result += `<ul class="navbar-nav mr-auto">
                    <li class="nav-item">
                        <a id="addNewBand" class="nav-link" href="html/addBand.html">Add band</a>
                    </li>
                    </ul>
                    <!-- Descrição do utilizador autenticado -->
                    <div id="authButtons">
                        <a id="loggedUser" href=""></a>
                        <button id="btnLogout" class="btn btn-outline-success my-2 my-sm-0">
                            Logout
                        </button>
                    </div>
                `
        } else {
            result += `  
                    <ul class="navbar-nav mr-auto"></ul>
                    <!-- Botão para ativar a janela modal de login -->
                    <div id="authButtons">                    
                        <button class="btn btn-outline-success m-2 my-sm-0" data-toggle="modal" data-target="#mdlLogin">
                            Login
                        </button>
                        <button class="btn btn-outline-success my-2 my-sm-0" data-toggle="modal" data-target="#mdlRegister">
                            Register
                        </button>                
                    </div>            
                `
        }
        result += `</div>`
        // Injeção do conteúdo na barra de navegação
        nav.innerHTML = result
    }

}