/**
 * ================== Déclaration des variables ================
 */
// Lecture des cookies
var champs = 	[
					"nom",
					"prenom",
					"adresse",
					"codePostal",
					"numero_siret",
					"telephone",
					"ville",
					"status",
					"numero_tva"
				];
var cookiesTmp = document.cookie.split("; ");
var cookies = [];
for(var i = 0; i < cookiesTmp.length; i++){
	var key 	= cookiesTmp[i].split("=")[0];
	var value 	= cookiesTmp[i].split("=")[1];
	cookies[key] = value;
}

var values = [];
var USR = cookies["bmu_adm_usr_id"] != undefined ? cookies["bmu_adm_usr_id"] : cookies["bmu_user_id"];
/**
 * ================= Fonctions ====================
 */
/**
 * Permet de savoir si l'utilisateur est un admin
 */
var isAdmin = function(){
	return cookies["bmu_admin"] != undefined;
}
 
/**
 * Permet de savoir si on veut modifier le profil
 */
var isModify = function(){
	return 	cookies["bmu_modif_profil"] != undefined || 
			cookies["bmu_adm_usr_id"] != undefined;
};

/**
 * Permet de savoir si tous les champs sont valides
 */
var controleChamps = function(){
	return true;
};

/**
 * ================== Traitement ==================
 */
// Sets the ajax request
$.ajax({
	url: "http://administration.bigmeup.fr/api/front/getUser.php?id=" + USR,
	async: false
}).done(function (data) {// When done
	// Parses the data from a JSON to an array
	data = JSON.parse(data);
	values = data[0];
});
 
/** 
 * ================= Elements react ================
 */

/**
 * Permet d'afficher le champ du nom
 */
var Nom = React.createClass({
	getChamp: function(){
		return 	isModify() ? 
				(<input	className	="form-control"
						id			= "nom"
						type		="text" 
						placeholder	="Votre nom"
						defaultValue={values["nom"]}/>)
				:
				(<p>{values["nom"]}</p>);
	},
	
	render: function() {
		return (
			<div>
				<p><b>Nom</b></p>
				
				{this.getChamp()}
			</div>
		);
	}
});
 
/**
 * Permet d'afficher le champ du prénom
 */
var Prenom = React.createClass({
	getChamp: function(){
		return 	isModify() ? 
				(<input	className	="form-control"
						id			="prenom"
						type		="text" 
						placeholder	="Votre prénom"
						defaultValue={values["prenom"]}/>)
				:
				(<p>{values["prenom"]}</p>);
	},
	
	render: function() {
		return (
			<div>
				<p><b>Prénom</b></p>
				
				{this.getChamp()}
			</div>
		);
	}
});
 
/**
 * Permet d'afficher le champ de l'adresse
 */
var Adresse = React.createClass({
	getChamp: function(){
		return 	isModify() ? 
				(<input	className	="form-control"
						id			="adresse"
						type		="text" 
						placeholder	="Votre adresse"
						defaultValue={values["adresse"]}/>)
				:
				(<p>{values["adresse"]}</p>);
	},
	
	render: function() {
		return (
			<div>
				<p><b>Adresse</b></p>
				
				{this.getChamp()}
			</div>
		);
	}
});

/**
 * Permet d'afficher le champ du code postal
 */
var CodePostal = React.createClass({
	getChamp: function(){
		return 	isModify() ? 
				(<input	className	="form-control"
						id			="codePostal"
						type		="text" 
						placeholder	="Votre code postal"
						defaultValue={values["codePostal"]}/>)
				:
				(<p>{values["codePostal"]}</p>);
	},
	
	render: function() {
		return (
			<div>
				<p><b>Code postal</b></p>
				
				{this.getChamp()}
			</div>
		);
	}
});

/**
 * Permet d'afficher le champ de la ville
 */
var Ville = React.createClass({
	getChamp: function(){
		return 	isModify() ? 
				(<input	className	="form-control"
						id			="ville"
						type		="text" 
						placeholder	="Votre ville"
						defaultValue={values["ville"]}/>)
				:
				(<p>{values["ville"]}</p>);
	},
	
	render: function() {
		return (
			<div>
				<p><b>Ville</b></p>
				
				{this.getChamp()}
			</div>
		);
	}
});

/**
 * Permet d'afficher le champ du téléphone
 */
var Telephone = React.createClass({
	getChamp: function(){
		return 	isModify() ? 
				(<input	className	="form-control"
						id			="telephone"
						type		="text" 
						placeholder	="+33 2 11 22 33 44"
						defaultValue={values["telephone"]}/>)
				:
				(<p>{values["telephone"]}</p>);
	},
	
	render: function() {
		return (
			<div>
				<p><b>Numéro de téléphone</b></p>
				
				{this.getChamp()}
			</div>
		);
	}
});

/**
 * Permet d'afficher le champ du siret
 */
var Siret = React.createClass({
	getChamp: function(){
		return 	isAdmin() ? 
				(<input	className	="form-control"
						id			="numero_siret"
						type		="text" 
						placeholder	="Votre numéro SIRET (à 14 chiffres)"
						defaultValue={values["numero_siret"]}/>)
				:
				(<p>{values["numero_siret"]}</p>);
	},
	
	render: function() {
		return (
			<div>
				<p><b>Numéro SIRET</b></p>
				
				{this.getChamp()}
			</div>
		);
	}
});

/**
 * Permet d'afficher le champ du Statut
 */
var Statut = React.createClass({
	getChamp: function(){
		return 	isAdmin() ? 
				(<input	className	="form-control"
						id			="status"
						type		="text" 
						placeholder	="La dénomination de l'utilisateur"
						defaultValue={values["status"]}/>)
				:
				(<p>{values["status"]}</p>);
	},
	
	render: function() {
		return (
			<div>
				<p><b>Dénomination</b></p>
				
				{this.getChamp()}
			</div>
		);
	}
});

/**
 * Permet d'afficher le champ du Statut
 */
var Tva = React.createClass({
	getChamp: function(){
		return 	isModify() ? 
				(<input	className	="form-control"
						id			="numero_tva"
						type		="text" 
						placeholder	="Le numéro de TVA"
						defaultValue={values["numero_tva"]}/>)
				:
				(<p>{values["numero_tva"]}</p>);
	},
	
	render: function() {
		return (
			<div>
				<p><b>Numéro de TVA</b></p>
				
				{this.getChamp()}
			</div>
		);
	}
});
 
/**
 * Permet d'afficher la checkbox Banni
 */
var Banni = React.createClass({
	render: function() {
		if(isModify() && isAdmin()){
			return (
				<div>
					<p><b>Banni ? (cocher pour dire oui)</b></p>
					
					<input	className	="form-control"
						id				="ban"
						type			="checkbox"
						defaultChecked	={values["ban"] == "1" ? "checked" : ""} />
				</div>
			);
		}
		
		return null;
	}
});

/**
 * Permet d'afficher la checkbox FrenchTech
 */
var FrenchTech = React.createClass({
	getChamp: function(){
		return 	isModify() && isAdmin() ? 
				(<input	className		="form-control"
						id				="french_tech"
						type			="checkbox"
						defaultChecked	={values["french_tech"] == "1" ? "checked" : ""}/>)
				:
				"";
	},
	
	render: function() {
		if(isModify() && isAdmin()){
			return (
				<div>
					<p><b>Membre de la french tech ? (cocher pour dire oui)</b></p>
					
					{this.getChamp()}
				</div>
			);
		}
		
		return null;
	}
});

/**
 * Permet d'afficher le bouton Modifier
 */
var Modifier = React.createClass({
	clic: function(){
		// On met la date de fin
		var date = new Date();
		date.setTime(date.getTime() + (1 * 24 * 60 * 60 * 1000));
		// On met le cookie
		document.cookie 	= "bmu_modif_profil=true; expires=" + date + "; path=/";
		// On recharge la page
		document.location	= "profil.html";
	},
	
	render: function() {
		return (
			<div>
				<input 	type		= "button" 
						className	= "btn btn-primary"
						value		= "Modifier" 
						onClick		= {this.clic} />
			</div>
		);
	}
});

/**
 * Permet d'afficher le bouton Sauvegarder
 */
var Sauvegarder = React.createClass({
	clic: function(){
		// On contrôle si les champs sont tous OK
		if(controleChamps()){
			// Construction de la requête POST à envoyer
			var data = "modifProfil=" + USR;
			
			for(var i = 0; i < champs.length; i++){
				if(document.getElementById(champs[i]) == undefined){
					console.log(champs[i]);
				}
				data += "&" + champs[i] + "=";
				data += document.getElementById(champs[i]).value;
			}
			
			if(isAdmin()){
				data += "&french_tech=" + (document.getElementById("french_tech").checked 	? "1" : "0");
				data += "&ban=" 		+ (document.getElementById("ban").checked 			? "1" : "0");
			} else {
				data += "&french_tech=" + values["french_tech"];
				data += "&ban=" + values["ban"];
			}
			
			$.ajax({
				url: "http://administration.bigmeup.fr/api/front/setUser.php",
				type: "POST",
				data: data
			}).done(function(data){// When done
				// Parses the data from a JSON to an array
				data = JSON.parse(data);
				
				if(data["answer"] == "true"){
					// On met la date de fin
					var date = new Date();
					date.setTime(date.getTime() - (1 * 24 * 60 * 60 * 1000));
					// On met le cookie pour quitter le menu de modification
					document.cookie 	= "bmu_modif_profil=true; expires=" + date + "; path=/";
					
					// On met le cookie pour afficher le fait que la modification a été effectuée
					var date = new Date();
					date.setTime(date.getTime() + (1*24*60*60*1000));
					document.cookie = "type_message_navbar=success; expires=" + date + "; path=/";
					document.cookie = "texte_message_navbar=Modifications effectuées; expires=" + date + "; path=/";
					
					if(cookies["bmu_adm_usr_id"] == undefined){// Si c'est pas un admin
						// On recharge la page
						document.location = "profil.html";
					} else {// Sinon
						document.cookie   = "bmu_adm_usr_id=true; expires=" + date + "; path=/";
						document.location = "http://administration.bigmeup.fr/backend/utilisateurs.html"
					}
				} else {
					alert("Problème dans l'ajout de l'utilisateur");
				}
			});
		}
	},
	render: function() {
		return (
			<div>
				<input 	type		= "button" 
						className	= "btn btn-success"
						value		= "Sauvegarder"
						onClick		= {this.clic}/>
			</div>
		);
	}
});

/**
 * Permet d'afficher le bouton Retour
 */
var Retour = React.createClass({
	clic: function(){
		// On met la date de fin
		var date = new Date();
		date.setTime(date.getTime() - (1 * 24 * 60 * 60 * 1000));
		// On met le cookie
		document.cookie = "bmu_modif_profil=true; expires=" + date + "; path=/";
		
		if(cookies["bmu_adm_usr_id"] == undefined){// Si c'est un admin
			// On recharge la page
			document.location = "profil.html";
		} else {// Sinon
			document.cookie   = "bmu_adm_usr_id=true; expires=" + date + "; path=/";
			document.location = "http://administration.bigmeup.fr/backend/utilisateurs.html"
		}
	},
	
	render: function() {
		return (
			<div>
				<input 	type		= "button" 
						className	= "btn btn-default"
						value		= "Retour" 
						onClick		= {this.clic}/>
			</div>
		);
	}
});

// La page
var Profil = React.createClass({
	render: function() {
		return ( 
			<div>  
				{isModify() ? <Retour /> : ""}
				
				<br />
				
				<Nom /><br />
				<Prenom /><br />
				<Adresse /><br />
				<CodePostal /><br />
				<Ville /><br />
				<Telephone /><br />
				<Siret /><br />
				<Statut /><br />
				<Tva /><br />
				
				<Banni /><br />
				<FrenchTech /><br />
				
				<br />
				
				{! isModify()	? <a href="update_mdp.html">Modifier le mot de passe</a> : ""}
				
				<br /><br /><br />
				
				{!isModify() 	? <Modifier /> 		: ""}
				{ isModify() 	? <Sauvegarder /> 	: ""}
				
				<br /> <br />
			</div>
		);
	}
});
        
ReactDOM.render(<Profil />, document.getElementById("container"));