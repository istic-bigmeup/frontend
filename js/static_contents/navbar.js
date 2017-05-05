/**
 * ================== Traitement ===========
 */
// On prend les cookies
var cookiesTmp = document.cookie.split("; ");
var cookies = [];
for(var i = 0; i < cookiesTmp.length; i++){
	var key 	= cookiesTmp[i].split("=")[0];
	var value 	= cookiesTmp[i].split("=")[1];
	cookies[key] = value;
}

/**
 * ============== Elements ReactJS ========
 */
var Navbar = React.createClass({
	disconnect: function(){
		var date = new Date();
		date.setTime(date.getTime() - (1*24*60*60*1000));

		// Sets the cookie
		document.cookie = "bmu_connecte=true; expires=" + date + "; path=/";
		document.cookie = "bmu_user_id=0; expires=" + date + "; path=/";
		document.cookie = "bmu_admin_id=0; expires=" + date + "; path=/";
		document.cookie = "bmu_admin=0; expires=" + date + "; path=/";

		// Redirects to profil.html
		document.location = "profil.html";
	},
	
	render: function () {
		var cookiesTmp = document.cookie.split("; ");
		var cookies = [];
		for(var i = 0; i < cookiesTmp.length; i++){
			var key 	= cookiesTmp[i].split("=")[0];
			var value 	= cookiesTmp[i].split("=")[1];
			cookies[key] = value;
		}
		var connecte 	= false || (cookies["bmu_connecte"] != undefined ? (cookies["bmu_connecte"] == "true") 	: false);
		var admin 		= false || (cookies["bmu_admin"] 	!= undefined ? (cookies["bmu_admin"] 	== "true") 	: false);
		
		return (
			<div>
				<Menu />
				<Message />
			</div>
		);
	}
});

var Menu = React.createClass({
	disconnect: function(){
		var date = new Date();
		date.setTime(date.getTime() - (1*24*60*60*1000));

		// Sets the cookie
		document.cookie = "bmu_connecte=true; expires=" + date + "; path=/";
		document.cookie = "bmu_user_id=0; expires=" + date + "; path=/";
		document.cookie = "bmu_admin_id=0; expires=" + date + "; path=/";
		document.cookie = "bmu_admin=0; expires=" + date + "; path=/";

		// Redirects to profil.html
		document.location = "index.html";
	},
	
	render: function () {
		var connecte 	= false || (cookies["bmu_connecte"] != undefined ? (cookies["bmu_connecte"] == "true") 	: false);
		var admin 		= false || (cookies["bmu_admin"] 	!= undefined ? (cookies["bmu_admin"] 	== "true") 	: false);
		
		return (
			<nav className="navbar navbar-default">
				<div className="navbar-collapse">
					<ul className="nav navbar-nav">
						{connecte ? <li><a href="index.html">Accueil</a></li> : ""}
						<li><a target="_blank" href="https://www.bigmeup.fr">Espace annonces</a></li>
						<li><a target="_blank" href="http://blog.bigmeup.fr">Blog</a></li>
						
						{admin 	  ? <li><a href="backend">Plateforme d'administration</a></li> : ""}
						
						{connecte ? "" : <li><a href="connexion.html">Connexion</a></li>}
						
						{connecte ? <li><a href="livre_compte.html">Mon livre de compte</a></li> : ""}
						{connecte ? <li><a href="profil.html">Mon profil</a></li> : ""}
						{connecte ? <li><a href="missions.html">Mes missions</a></li> : ""}
						{connecte ? <li><a href="document.html">Mes documents</a></li> : ""}
						{connecte ? <li><a href="declaration.html">Mes déclarations</a></li> : ""}
						
						
						<li><a href="mailto:contact@bigmeup.fr">Nous contacter</a></li>
						
						{connecte ? <li><a href="#" onClick={this.disconnect}>Déconnexion</a></li> : ""}
					</ul>
				</div>
			</nav>
		);
	}
});

var Message = React.createClass({
	getClassName: function(){
		var res = "alert alert-";
		
		switch(cookies["type_message_navbar"]){
			case "success":
				res += "success";
			break;
				
			case "info":
				res += "info";
			break;
			
			case "warning":
				res += "warning";
			break;
			
			case "danger":
				res += "danger";
			break;
		}
		
		res += " alert-dismissable fade in";
		return res;
	},
	
	getTitle: function(){
		var tmp = cookies["type_message_navbar"];
		
		// On vide le cookie
		var date = new Date();
		date.setTime(date.getTime() - (1*24*60*60*1000));
		document.cookie = "type_message_navbar=true; expires=" + date + "; path=/";
		
		switch(tmp){
			case "success":
				return "Succès: ";
				
			case "info":
				return "Information: ";
			
			case "warning":
				return "Attention: ";
			
			case "danger":
				return "Erreur: ";
		}
	},
	
	getText: function(){
		var tmp = cookies["texte_message_navbar"];
		
		// On vide le cookie
		var date = new Date();
		date.setTime(date.getTime() - (1*24*60*60*1000));
		document.cookie = "texte_message_navbar=true; expires=" + date + "; path=/";
		
		return tmp;
	},
	
	render: function () {
		var bool = (cookies["type_message_navbar"] != undefined) && (cookies["texte_message_navbar"] != undefined);
		
		if(bool){
			return (
						<div className={this.getClassName()}>
							<a href="#" className="close" data-dismiss="alert" aria-label="close">&times;</a>
							<strong>{this.getTitle()}</strong> {this.getText()}
						</div>
					);
		} else {
			return (<div></div>);
		}
	}
});

ReactDOM.render(<Navbar />, document.getElementById("navbar"));