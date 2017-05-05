
var userId = getCookie("bmu_user_id"); //Identifiant de l'utilisateur 
var testOldMdp = false; //Représente la conformité de l'ancien mot de passe

/**
 * ========================================== COMPOSANTS ====================================
 */

/**
 * Input de type password devrant contenir l'ancien mot de passe
 */
var OldPwdInput = React.createClass({
    getInitialState: function(){
        return {
            value: "",
            inputClass: ""
        }
    },

    //Action exécutée au changement de valeur du champ
    handleInputChange: function (event) {
        const _target = event.target;
        const _value = _target.type === 'checkbox' ? _target.checked : _target.value;
        const _name = _target.name;

        this.setState({
            value: _value
        });
    },

    //Action exécutée à la perte du focus. Il vérifie la conformité du mdp entré par rapport à l'ancien mdp 
    handleBlur: function (event) {
        var mdp = this.state.value;
        var oldTextBox = $("#oldTextBox");

		$.ajax({
			url: "http://administration.bigmeup.fr/api/front/getUser.php?id=" + userId + "&mdp=" + mdp
		}).done(function (data) {// When done
			// Parses the data from a JSON to an array
			data = JSON.parse(data);

			// Controls the answer of the API
			if (data["answer"] == "true") {
                oldTextBox.hide();
                testOldMdp = true;
			}
            else{
                oldTextBox.show();
                testOldMdp = false;
            } 
		});
    },

    render: function(){
        return (
            <div className="form-group row">
                <label htmlFor="oldValue" className="col-2 col-form-label">Actuel</label>
                <div className="col-10">
                    <input type="password" name="oldValue" id="oldValue" className={"form-control " + this.state.inputClass} value={this.state.value} onChange={this.handleInputChange} onBlur={this.handleBlur} required />
                    <small className="form-text text-muted" id="oldTextBox" style={{ display: "none" }}>Mot de passe erroné !</small>
                </div>
            </div>
        )
    }

});

/**
 * Input de type password devrant contenir le nouveau mdp
 */
var NewPwdInput = React.createClass({
    getInitialState: function(){
        return {
            value: "",
            inputClass: ""
        }
    },

    //Action exécutée au changement de valeur du champ
    handleInputChange: function (event) {
        const _target = event.target;
        const _value = _target.type === 'checkbox' ? _target.checked : _target.value;
        const _name = _target.name;

        this.setState({
            value: _value
        });
    },

    //Action exécutée à la perte du focus. Il vérifie la conformité du mdp entré puis sa similitude avec la confirmation 
    handleBlur: function (event) {
        var confirmInputValue = $("#confirmValue").val();
        var newTextBox = $("#newTextBox");
        var confTextBox = $("#confTextBox");
        var newTextBoxWarning = $("#newTextBoxWarning");

        //Vérification de la conformité du mot de passe
        if(checkMdp(this.state.value)){
            //Vérification de la similitude avec la confirmation
            if (this.state.value == confirmInputValue) {
                newTextBox.hide();
                confTextBox.hide();
            }
            else{
                newTextBox.show();
                confTextBox.show();
            }
            newTextBoxWarning.hide();
        }
        else{
            newTextBoxWarning.show();
        }
    },

    render: function(){
        return (
            <div className="form-group row">
                <label htmlFor="newValue" className="col-2 col-form-label">Nouveau</label>
                <div className="col-10">
                    <input type="password" name="newValue" id="newValue" className={"form-control " + this.state.inputClass} value={this.state.value} onChange={this.handleInputChange} onBlur={this.handleBlur} required />
                    <div className="form-text text-muted" id="newTextBox" style={{ display: "none" }}>Les mots de passe ne correspondent pas.</div>
                    <div className="form-text text-warning" id="newTextBoxWarning" style={{ display: "none" }}>Le mot de passe doit contenir au moins 8 caractères, 1 majuscule, 1 miniscule et 1 caractère spécial.</div>
                </div>
            </div>
        )
    }
});

/**
 * Input de type password devrant contenir la confirmation du mdp
 */
var ConfirmInput = React.createClass({
    getInitialState: function(){
        return {
            value: "",
            inputClass: ""
        }
    },

    //Action exécutée au changement de valeur du champ
    handleInputChange: function (event) {
        const _target = event.target;
        const _value = _target.type === 'checkbox' ? _target.checked : _target.value;
        const _name = _target.name;

        this.setState({
            value: _value
        });
    },

    //Action exécutée à la perte du focus. elle vérifie la similitude du mdp entré avec le nouveau mot de passe 
    handleBlur: function (event) {
        var newPwdInputValue = $("#newValue").val();
        var confTextBox = $("#confTextBox");
        var newTextBox = $("#newTextBox");

        if (this.state.value == newPwdInputValue) {
            newTextBox.hide();
            confTextBox.hide();
        }
        else{
            newTextBox.show();
            confTextBox.show();
        } 
    },

    render: function(){
        return (
            <div className="form-group row">
                <label htmlFor="confirmValue" className="col-2 col-form-label">Confirmation</label>
                <div className="col-10">
                    <input type="password" name="confirmValue" id="confirmValue" className={"form-control " + this.state.inputClass} value={this.state.value} onChange={this.handleInputChange} onBlur={this.handleBlur} required />
                    <small className="form-text text-muted" id="confTextBox" style={{ display: "none" }}>Les mots de passe ne correspondent pas.</small>
                </div>
            </div>
        )
    }
});

/** 
 * Input de type bouton gérant la soumission du formulaire
 */
var BtnSubmit = React.createClass({
    //Action exécutée au clic sur le bouton. Elle soumet le formulaire
    handleClick: function (event) {
        event.preventDefault();
        submit();
    },

    render: function(){
        return (
                <input type="submit" name="submit" id="submit" value="Valider" className="btn btn-info pull-right" onClick={this.handleClick} />
        )
    }
});

/**
 * Bloc de message de type alert notifiant le succès de l'opération
 */
var AlertBoxSuccess = React.createClass({
    render: function(){
        return (
            <div className="alert alert-success alert-dismissible fade hide" id="alertBoxSucces" role="alert" style={{ display: "none" }}>
                <button type="button" className="close" data-dismiss="alert" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
                <strong>Succès!</strong> Modification effectuée avec succès.
            </div>            
        )
    }
});

/**
 * Bloc de message de type alert notifiant le l'échec de l'opération
 */
var AlertBoxError = React.createClass({
    render: function(){
        return (
            <div className="alert alert-danger alert-dismissible fade hide" id="alertBoxError" role="alert" style={{ display: "none" }}>
                <button type="submit" className="close" data-dismiss="alert" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
                <strong>Attention !</strong> Modification non effectuée. Veuillez reéssayer.
            </div>            
        )
    }
});

/**
 * ========================================== COMPOSANT PRINCIPAL ====================================
 */

var Form = React.createClass({

    handleSubmit: function (event) { 
        event.preventDefault();
        submit();
    },

    render: function () {
        return (
            <form onSubmit={this.handleSubmit} className="form-group" role="form">
                <AlertBoxSuccess />
                <AlertBoxError />
                <OldPwdInput />
                <fieldset>
                    <NewPwdInput />
                    <ConfirmInput />
                </fieldset>
                <BtnSubmit />
            </form>
        );
    }
});

ReactDOM.render(<Form />, document.getElementById("container")
);

/**
 * ========================================== FONCTIONS ====================================
 */

/**
 * Gère la soumission du formulaire
 * 
 */
function submit(){
    var newPwdInputValue = $("#newValue").val();
    var confirmInputValue = $("#confirmValue").val();
    var confTextBox = $("#confTextBox");
    var newTextBox = $("#newTextBox");
    var oldTextBox = $("#oldTextBox");
    var alertBoxSucces = $("#alertBoxSuccess");
    var alertBoxError = $("#alertBoxError");
    var newTextBoxWarning = $("#newTextBoxWarning");
    
    //Définition des données à envoyer au serveur
    var data = "id=" + userId + "&mdp=" + newPwdInputValue;

    //Vérification de la conformité du nouveau mot de passe
    if(checkMdp(newPwdInputValue)){
        newTextBoxWarning.hide();

        //Vérification de la similitude entre le nouveau mdp et la confirmation et la conformité de l'ancien avant envoie des données
        if((newPwdInputValue == confirmInputValue) && testOldMdp){
            $.ajax({
                url : "http://administration.bigmeup.fr/api/front/updateUser.php",
                type : 'POST',
                data : data
            }).done(function(response){
                    // Parses the data from a JSON to an array
                    data = JSON.parse(response);

                    if(data["response"] == "true"){
                        alertBoxSucces.show();
                        alertBoxError.hide();
                        newTextBox.hide();
                        confTextBox.hide();
                        alert("Mot de passe modifié");
                        window.location = "index.html";
                    }
                    else{
                        alert("Erreur lors la modification de mot de passe");
                    }
            });
        }
        else{
            alertBoxSucces.hide();
            alertBoxError.show();
            newTextBox.show();
            confTextBox.show();
        } 
    }
    else{
        newTextBoxWarning.show();
    }
}

/**
 * Vérification de la coformité du mot de passe
 * 
 * @param {String} mdp Mot de passe à vérifier
 */
function checkMdp(mdp){
    var checker = false;

    //Vérifie le nombre de caractère du mot de passe
    checker = (mdp.length >= 8) ? true : false;

    //Vérification de la présence de majuscule, de miniscile et de caractères spéciaux
    if(checker){
        var lettreMin = (mdp.search(new RegExp("[a-z]")) >= 0) ? true : false;
        var lettreMaj = (mdp.search(new RegExp("[A-Z]")) >= 0) ? true : false;
        var caractSpec = (mdp.search(new RegExp("[&@€£ùµ¢%#:;,=_'~\!\^\$\(\)\{\}\?\.\/\\\|]")) >= 0) ? true : false;

        checker = lettreMin && lettreMaj && caractSpec;
    }

    return checker;
}

/**
 * Récupère le cookie spécifié
 * 
 * @param {String} cname Nom du cookie
 * @returns 
 */
function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for(var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}
