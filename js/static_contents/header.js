var Header = React.createClass({
	cookies : "",
	
	isConnected: function(){
		// On regarde si l'utilisateur est connecté
		return this.cookies["bmu_connecte"] == "true";
	},
	
	// Page connexion
	isOnConnexion: function(){
		return window.location.href.indexOf("connexion.html") > 0;
	},
	
	isConnectedOnConnexionPage: function(){
		var page = this.isOnConnexion();
		
		return (this.cookies["bmu_connecte"] == "true") && (page);
	},
	
	// Page mdp oublié
	isOnForgottenPasswordPage: function(){
		return window.location.href.indexOf("mdp_oublie.html") > 0;
	},
	
	isConnectedOnForgottenPasswordPage: function(){
		var page = this.isOnForgottenPasswordPage();
		
		return (this.cookies["bmu_connecte"] == "true") && (page);
	},
	
	// Rendu
	render: function () {
		// On prend les cookies
		var cookiesTmp = document.cookie.split("; ");
		this.cookies = [];
		for(var i = 0; i < cookiesTmp.length; i++){
			var key 	= cookiesTmp[i].split("=")[0];
			var value 	= cookiesTmp[i].split("=")[1];
			this.cookies[key] = value;
		}
		
		// Si l'user n'est pas connecté et qu'il essaye d'accéder aux pages qui demandent d'être connecté...
		var controleConnecte = false;
		if(this.isOnConnexion() || this.isOnForgottenPasswordPage()){
			controleConnecte = true;
		}
		if(!this.isConnected() && !controleConnecte){
			// ... on le redirige vers la page de connexion
			window.location.replace("http://administration.bigmeup.fr/connexion.html");
		}
		
		// Si l'user est connecté et qu'il est sur les pages accessibles uniquement lorsqu'il ne faut pas être connecté...
		if(this.isConnectedOnConnexionPage() || this.isConnectedOnForgottenPasswordPage()){
			// ... on le redirige vers la page de profil
			window.location.replace("http://administration.bigmeup.fr/profil.html");
		}
		
		// Affichage du header
		var divClass = "col-md-4 col-lg-4 col-sm-4 col-xs-4";
		
		return (
			<div className="row">
				<div className={divClass}></div>
				
				<div className={divClass}>
					<img src="img/logoBMU_800x800.png" alt="BigMeUp" style={{width: "50%"}}/>
				</div>
				
				<div className={divClass}></div>
			</div>
		);
	}
});

ReactDOM.render(<Header />, document.getElementById("header"));