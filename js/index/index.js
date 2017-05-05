/**
 * ========================================== COMPOSANTS ====================================
 */

/** 
 * cadre contenant le lien vers la page de connexion 
 */
var BoxLogin = React.createClass({
	disconnect: function(){
		var date = new Date();
		date.setTime(date.getTime() - (1*24*60*60*1000));

		// Sets the cookie
		document.cookie = "bmu_connecte=true; expires=" + date + "; path=/";
		document.cookie = "bmu_user_id=0; expires=" + date + "; path=/";
		document.cookie = "bmu_admin_id=0; expires=" + date + "; path=/";

		// Redirects to profil.html
		document.location = "../index.html";
		
	},

	render: function(){
		return (
			<div className="col-lg-4">
				<div className="tile tile10">
					<h2><a href="#" className="display-2" onClick={this.disconnect}>Je me déconnecte</a></h2>
				</div>
			</div>
		);
	}
});

/** 
 * cadre contenant le lien vers la page des déclarations 
 */
var BoxDeclaration = React.createClass({
	render: function(){
		return (
			<div className="col-lg-4 ">
				<div className="tile tile8">
					<h1>
						<a href="declaration.html" className="display-2">Mes déclarations</a>
					</h1>
				</div>
			</div>
		);
	}
});

/** 
 * cadre contenant le lien vers la page des missions
 */
var BoxMission = React.createClass({
	render: function(){
		return (
			<div className="col-lg-4 ">
				<div className="tile tile9">
					<h1>
						<a href="missions.html" className="display-2">Mes missions</a>
					</h1>
				</div>
			</div>
		);
	}
});

/** 
 * cadre contenant le lien vers la page de profil de l'utilisateur
 */
var BoxProfil = React.createClass({
	render: function(){
		return (
			<div className="col-lg-4 ">
				<div className="tile tile5">
					<h1>
						<a href="profil.html" className="display-2">Mon Profil</a>
					</h1>
				</div>
			</div>
		);
	}
});

/** 
 * cadre contenant le lien vers la page du livre de compte
 */
var BoxCompta = React.createClass({
	render: function(){
		return (
			<div className="col-lg-4 ">
				<div className="tile tile8">
					<h1>
						<a href="livre_compte.html" className="display-2">Mon livre de compte</a>
					</h1>
				</div>
			</div>
		);
	}
});

/** 
 * cadre contenant le lien vers l'espace annonce du sharetrib
 */
var BoxAnnonce = React.createClass({
	render: function(){
		return (
			<div className="col-lg-4 ">
				<div className="tile tile6">
					<h1>
						<a target="_blank" href="https://www.bigmeup.fr" className="display-2">Espace annonces</a>
					</h1>
				</div>
			</div>
		);
	}
});

/** 
 * cadre contenant le lien vers le blog
 */
var BoxBlog = React.createClass({
	render: function(){
		return (
			<div className="col-lg-4 ">
				<div className="tile tile7">
					<h1>
						<a target="_blank" href="http://blog.bigmeup.fr" className="display-2">Blog</a>
					</h1>
				</div>
			</div>
		);
	}
});

/** 
 * cadre contenant le lien vers la page des documents
 */
var BoxDocument = React.createClass({
	render: function(){
		return (
			<div className="col-lg-4 ">
				<div className="tile tile3">
					<h1><a href="document.html" className="display-2">Mes Documents</a></h1>
				</div>
			</div>
		);
	}
});

/**
 * ========================================== COMPOSANT PRINCIPAL ====================================
 */
var ExampleApplication = React.createClass({

	render: function () {
		return (
			<div>
				<BoxAnnonce />
				<BoxBlog />
				<BoxCompta />
				<BoxProfil />
				<BoxMission />
				<BoxDocument />
				<BoxDeclaration />
				
			</div>
		);
	}
  });

ReactDOM.render(<ExampleApplication />, document.getElementById('container'));