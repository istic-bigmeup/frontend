/**
 * Gestion des cookies
 */

// Lecture des cookies
var cookiesTmp = document.cookie.split("; ");
var cookies = [];
for(var i = 0; i < cookiesTmp.length; i++){
	var key 	= cookiesTmp[i].split("=")[0];
	var value 	= cookiesTmp[i].split("=")[1];
	cookies[key] = value;
}

//Redirection vers la page d'accueil si une connexion précédente existe déjà
if(cookies["bmu_connecte"] == "true"){
	document.location = "index.html";
}


/**
 * ========================================== COMPOSANTS ====================================
 */

/** 
 * Input de type email
 */
var Email = React.createClass({
	render: function () {
		return (
			<div>
				<label htmlFor="email">Email</label>
				<input className="form-control"
					type="email"
					name="email"
					id="email"
					placeholder="Email" />
				<br />
			</div>
		);
	}
});

/** 
 * Input de type password
 */
var Mdp = React.createClass({
	render: function () {
		return (
			<div>
				<label htmlFor="mdp">Mot de passe</label>
				<input className="form-control"
					type="password"
					name="mdp"
					id="mdp"
					placeholder="Mot de passe" />
				<br />
			</div>
		);
	}
});

/** 
 * Input de type submit gérant la soumission du formulaire
 * avec un texte caché qui s'affiche lorsque le mot de passe est erroné
 */
var Valider = React.createClass({
	connect: function(){
		connection();
	},

	render: function () {
		return (
			<div>
				<p className="text-warning" id="error" style={{ display: "none" }}>
					L'adresse mail ou le mot de passe est erroné.
						</p>
				<input className="btn btn-primary"
					type="submit"
					onClick={this.connect}
					value="Valider" />
			</div>
		);
	}
});

/** 
 * Message de type info affiché après une demande de (ré) initilisation du mot de passe
 */
var AlertBoxMdpReInit = React.createClass({
    render: function(){
        return (
            <div className={"alert alert-info alert-dismissible"} id="alertBoxInfo" style={{display:"none"}} role="alert">
                <button type="button" className="close" data-dismiss="alert" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
                <strong>Info !</strong> Si votre adresse email a été validé, vous recevrez un email contenant le lien de (ré)initialisation du mot de passe.
            </div>            
        )
    }
});

/** 
 * Corps de la fenêtre modal
 * Contient un Imput de type email
 */
var ModalBody = React.createClass({
	render: function () {
		return (
			<div>
				<input type="email" name="modalEmail" id="modalEmail" className="form-control"  placeholder="Veuillez insérer le même email que dans l'espace annonces" />
			</div>
		);
	}
});			

/** 
 * Fenêtre modal contenant un champ email
 * A la soumission du formulaire, un email vers le mail renseigné est envoyé
 */
var Modal = React.createClass({	
	handleSubmit: function(){
		var email = $("#modalEmail").val();

		// Sets the ajax request
		$.ajax({
			url: "http://administration.bigmeup.fr/api/front/sendMail.php",
			type : 'POST',
			data : "email=" + email
		}).done(function (data) {
			$("#alertBoxInfo").fadeIn();
			$("#btn_close").trigger("click");
		});
	},

	render: function () {
		return (
			<div className="modal fade" id="modal" tabIndex="-1" role="dialog" aria-labelledby="modal" aria-hidden="true">
				<div className="modal-dialog" role="document">
					<div className="modal-content">
						<div className="modal-header">
							<h5 className="modal-title" id="exampleModalLabel">Veuillez insérer le même email que dans l'espace annonces</h5>
							<button type="button" className="close" data-dismiss="modal" aria-label="Close">
							<span aria-hidden="true">&times;</span>
							</button>
						</div>
						
						<div className="modal-body">
							<ModalBody />
						</div>
						
						<div className="modal-footer">
							<button type="button" id="btn_close" className="btn btn-secondary" data-dismiss="modal">Fermer</button>
							<button type="button" id="btn_send" className="btn btn-primary" onClick={this.handleSubmit}>Envoyer</button>
						</div>
					</div>
				</div>
			</div>
		);
	}
});

/**
 * ========================================== COMPOSANT PRINCIPAL ====================================
 */
var Connexion = React.createClass({
	handleSubmit: function(e){
		e.preventDefault();
		connection();
	},

	render: function () {
		return (
			<div>
				<AlertBoxMdpReInit />
				<form className="form-group" role="form" onSubmit={this.handleSubmit}>
					<Email />
					<Mdp />
					<Valider />
					<br /><br />
					<a href="#" data-toggle="modal" data-target="#modal" >Mot de passe oublié / première connexion ?</a>
				</form>
				<Modal />
			</div>
		);
	}
});

ReactDOM.render(<Connexion />, document.getElementById("container"));

/**
 * ========================================== FONCTIONS ====================================
 */

/**
 * Gère la connexion d'un utilisateur
 */
function connection(){
	// Gets the login and the password
	var login = document.getElementsByName("email")[0].value;
	var mdp = document.getElementsByName("mdp")[0].value;

	// Sets the ajax request
	$.ajax({
		url: "http://administration.bigmeup.fr/api/front/getUser.php?login=" + login + "&mdp=" + mdp
	}).done(function (data) {// When done
		console.log(data);

		// Parses the data from a JSON to an array
		data = JSON.parse(data);

		// Controls the answer of the API
		if (data["answer"] == "true") {
			// If the login and the password are correct
			// Sets the date
			var date = new Date();
			date.setTime(date.getTime() + (1 * 24 * 60 * 60 * 1000));

			// Sets the cookies
			document.cookie = "bmu_connecte=true; expires=" + date + "; path=/";
			if(data["rang"] == "1"){// Si il est admin, on le sauvegarde
				document.cookie = "bmu_admin=true; expires=" + date + "; path=/";
			}
			document.cookie = "bmu_user_id="+ data["id"] +"; expires=" + date + "; path=/";

			// Redirects to index.html
			document.location = "index.html";
		} else {
			// If the login or the password is incorrect
			document.getElementById("error").style.display = "block";
		}

	});
}