// Lecture des cookies
var cookiesTmp = document.cookie.split("; ");
var cookies = [];
for(var i = 0; i < cookiesTmp.length; i++){
	var key 	= cookiesTmp[i].split("=")[0];
	var value 	= cookiesTmp[i].split("=")[1];
	cookies[key] = value;
}

if(cookies["bmu_connecte"] == "true"){// Si l'utilisateur est déjà connecté
	document.location = "profil.html";
}

var Email = React.createClass({
	render: function () {
		return (
			<div>
				<input className="form-control"
					type="text"
					name="email"
					placeholder="Email" />
				<br />
			</div>
		);
	}
});

var Mdp = React.createClass({
	render: function () {
		return (
			<div>
				<input className="form-control"
					name="mdp"
					type="password"
					placeholder="Mot de passe" />
				<br />
			</div>
		);
	}
});

var Valider = React.createClass({
	connect: function () {
		// Gets the login and the password
		var login = document.getElementsByName("email")[0].value;
		var mdp = document.getElementsByName("mdp")[0].value;

		// Sets the ajax request
		$.ajax({
			url: "http://bigmeup.istic.univ-rennes1.fr/api/front/getUser.php?login=" + login + "&mdp=" + mdp
		}).done(function (data) {// When done
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

				// Redirects to profil.html
				document.location = "profil.html";
			} else {
				// If the login or the password is incorrect
				document.getElementById("error").style.display = "block";
			}

		});
	},

	render: function () {
		return (
			<div>
				<p className="text-warning" id="error" style={{ display: "none" }}>
					L'adresse mail ou le mot de passe est erroné.
						</p>
				<input className="btn btn-primary"
					type="button"
					onClick={this.connect}
					value="Valider" />
			</div>
		);
	}
});

var ModalBody = React.createClass({
	render: function () {
		return (
			<div>
				<input type="email" name="modalEmail" id="modalEmail" className="form-control"  placeholder="Email" />
			</div>
		);
	}
});			

var Modal = React.createClass({
	handleSubmit: function(){
		var email = $("#modalEmail").val();

		// Sets the ajax request
		$.ajax({
			url: "http://bigmeup.istic.univ-rennes1.fr/api/front/sendMail.php",
			type : 'POST',
			data : "email=" + email
		}).done(function (data) {
			console.info(data);
			$("#btn_close").trigger( "click" );
		});
	},

	render: function () {
		return (
			<div className="modal fade" id="modal" tabIndex="-1" role="dialog" aria-labelledby="modal" aria-hidden="true">
				<div className="modal-dialog" role="document">
					<div className="modal-content">
						<div className="modal-header">
							<h5 className="modal-title" id="exampleModalLabel">Modal title</h5>
							<button type="button" className="close" data-dismiss="modal" aria-label="Close">
							<span aria-hidden="true">&times;</span>
							</button>
						</div>
						<div className="modal-body">
							<ModalBody />
						</div>
						<div className="modal-footer">
							<button type="button" id="btn_close" className="btn btn-secondary" data-dismiss="modal">Fermer</button>
							<button type="button" className="btn btn-primary" onClick={this.handleSubmit}>Envoyer</button>
						</div>
					</div>
				</div>
			</div>
		);
	}
});


var Connexion = React.createClass({
	render: function () {
		return (
			<div>
				<form className="form-group">
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