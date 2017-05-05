var token;

var NewPwdInput = React.createClass({
    getInitialState: function(){
        return {
            value: "",
            inputClass: ""
        }
    },

    handleInputChange: function (event) {
        const _target = event.target;
        const _value = _target.type === 'checkbox' ? _target.checked : _target.value;
        const _name = _target.name;

        this.setState({
            value: _value
        });
    },

    handleBlur: function (event) {
        var confirmInputValue = $("#confirmValue").val();
        var newTextBox = $("#newTextBox");
        var confTextBox = $("#confTextBox");
        var newTextBoxWarning = $("#newTextBoxWarning");

        //Vérification de la conformité du mot de passe
        if(checkMdp(this.state.value)){
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
                <label htmlFor="newValue" className="col-2 col-form-label">Mot de passe</label>
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
 * Input de type password servant de confirmation du mot de passe
 */
var ConfirmInput = React.createClass({
    getInitialState: function(){
        return {
            value: "",
            inputClass: ""
        }
    },

    //Action déclenchée lors d'une action dans le champ
    handleInputChange: function (event) {
        const _target = event.target;
        const _value = _target.type === 'checkbox' ? _target.checked : _target.value;
        const _name = _target.name;

        this.setState({
            value: _value
        });
    },

    //Action déclenchée lorsque le champ perd le focus
    handleBlur: function (event) {
        var newPwdInputValue = $("#newValue").val();
        var confTextBox = $("#confTextBox");
        var newTextBox = $("#newTextBox");

        //Vérification de la similitude entre les champs "nouveau"" et "confirmation"
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
 * Bouton de soumission du formulaire
 */
var BtnSubmit = React.createClass({
    //Action déclenchée lors du clic sur le bouton entrainant la soumission du formulaire
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
 * Permet d'afficher le texte informant ce qui devra se trouver dans son mot de passe
 */
var TexteCasseMdp = React.createClass({
	render: function () {
		return 	(
					<div className="text-info">
						Pour des mesures de sécurité, veuillez entrer un mot de passe contenant au moins 8 caractères, 1 majuscule, 1 minuscule et 1 caractère spécial.
					</div>
				);
	}
});

/**
 * Permet d'afficher le texte informant l'utilisateur des risques de phishing
 */
var TexteSecurite = React.createClass({
	render: function () {
		return 	(
					<div className="text-info">
						Faîtes attention au phishing. Un administrateur ne vous demandera jamais votre mot de passe. Avant d'entrer votre mot de passe quelque part, vérifiez bien que vous êtes sur notre site web.
					</div>
				);
	}
});

/**
 * ========================================== COMPOSANT PRINCIPAL ====================================
 */
var MdpOublie = React.createClass({
	render: function () {
		return 	(
					<form onSubmit={this.handleSubmit} className="form-group" role="form">
						<TexteCasseMdp />
						
						<br/>
						
						<NewPwdInput />
						<ConfirmInput />
						<BtnSubmit />
						
						<br/><br/>
						
						<TexteSecurite />
					</form>
				);
	}
});

ReactDOM.render(<MdpOublie />, document.getElementById("container"));

/**
 * ========================================== FONCTIONS ====================================
 */

/**
 * Gère la soumission du formulaire
 */
function submit(){
    var newPwdInputValue = $("#newValue").val();
    var confirmInputValue = $("#confirmValue").val();
    var confTextBox = $("#confTextBox");
    var newTextBox = $("#newTextBox");
    var alertBoxError = $("#alertBoxError");
    
    //Définition des données à envoyer au serveur
	var token = getURLParam("t");
    var data = "token=" + token + "&mdp=" + newPwdInputValue;

    //Vérification de la similitude du nouveau mdp et de la confirmation avant envoie des données
    if(newPwdInputValue == confirmInputValue){
        $.ajax({
            url : "http://administration.bigmeup.fr/api/front/updateUser.php",
            type : 'POST',
            data : data
        }).done(function(response){
				// Parses the data from a JSON to an array
				data = JSON.parse(response);

				if(data["response"] == "true"){
                    document.location = "connexion.html";
                }
                else{
                    alertBoxError.show();
                }
        });
    }
    else{
        alertBoxError.show();
        newTextBox.show();
        confTextBox.show();
    } 
}

/**
 * Retourne tout ou un paramètre spécifique de l'url
 * 
 * @param {any} param 
 * @returns 
 */
function getURLParam(param) {
	var vars = {};
	window.location.href.replace( location.hash, '' ).replace( 
		/[?&]+([^=&]+)=?([^&]*)?/gi, // regexp
		function( m, key, value ) { // callback
			vars[key] = value !== undefined ? value : '';
		}
	);

	if ( param ) {
		return vars[param] ? vars[param] : null;	
	}
	return vars;
}

/**
 * Vérification de la coformité du mot de passe
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