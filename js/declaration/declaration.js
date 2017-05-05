/**
 * ====================== Les missions ================
 */
var userId = getCookie("bmu_user_id");
var _url 	= 'http://administration.bigmeup.fr/api/front/getMissions.php?id_user=' + userId;
var _urlOld = 'http://administration.bigmeup.fr/api/front/getMissions.php?anpasse=' + userId;

// Where the user is the presta of the last year
var tabPrestaAnPasse 	= [];
// Where the user is the presta
var tabPresta 			= [];

// On prend les infos (pas en asynchrone)
$.ajax({
	url: _url,
	async: false
}).done(function(data){// When done
	// Parses the data from a JSON to an array
	data = JSON.parse(data);

	// Controls the answer of the API
	tabPresta = JSON.parse(data["presta"]);
});

// On prend les infos (pas en asynchrone)
$.ajax({
	url: _urlOld,
	async: false
}).done(function(data){// When done
	// Parses the data from a JSON to an array
	data = JSON.parse(data);

	// Controls the answer of the API
	tabPrestaAnPasse = JSON.parse(data["presta"]);
});
/**
 * ======================== Fonctions ===================
 */

/**
 * Permet de prendre le cookie
 * @param	cname	Le nom du cookie que l'on veut
 * @return	string	La valeur du cookie
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
};

/**
 * ======================== Les éléments REACT ===============
 */
/**
 * La partie des côtisations sociales
 * @return	Le numéro de trimestre:
 *			0 = De janvier à mars
 *			1 = D'avril à juin
 *			2 = De juillet à septembre
 *			3 = De octobre à décembre
 */
var CotSoc = React.createClass({
	trimestre: function(){
		var date = new Date();
		
		if(date.getMonth() < 3){
			return 0;
		} else if(date.getMonth() >= 3 && date.getMonth() < 6){
			return 1;
		} else if(date.getMonth() >= 6 && date.getMonth() < 9){
			return 2;
		} else{
			return 3;
		}
	},
	
	getTexteTrimestre: function(numTrimestre){
		switch(numTrimestre){
			case 0:
				return "de janvier à mars";
			
			case 1:
				return "d'avril à juin";
				
			case 2:
				return "de juillet à septembre";
			
			case 3:
				return "d'octobre à décembre";
			
			default:
				return "--";
		}
	},
	
	getFinTrimestre: function(numTrimestre){
		switch(numTrimestre){
			case 0:
				return "30 avril";
			
			case 1:
				return "31 juillet";
			
			case 2:
				return "31 octobre";
			
			case 3:
				return "31 janvier";
			
			default:
				return "--";
		}
	},
	
	controleDansTrimestre: function(date, trimestre){
		var date = new Date(date);
		
		// Si la date est valide
		if(date != "Invalid Date"){
			var tms_deb = new Date();
			tms_deb.setDate(1);
			
			var tms_fin = new Date();
			tms_fin.setDate(1);
			
			switch(trimestre){
				case 0:
					tms_deb.setMonth(0);
					tms_fin.setMonth(2);
				break;
				
				case 1:
					tms_deb.setMonth(3);
					tms_fin.setMonth(5);
				break;
				
				case 2:
					tms_deb.setMonth(6);
					tms_fin.setMonth(8);
				break;
				
				case 3:
					tms_deb.setMonth(9);
					tms_fin.setMonth(11);
				break;
				
				default:
					return false;
			}
			
			date 	= date.getTime();
			tms_deb = tms_deb.getTime();
			tms_fin = tms_fin.getTime();
			
			return date >= tms_deb && date <= tms_fin;
		}
		
		return false;
	},
	
	montant: function(){
		var ca = 0;
		var tms = this.trimestre();
		
		for(var i = 0; i < tabPresta.length; i++){
			if(this.controleDansTrimestre(tabPresta[i]["date_fin"], tms)){
				ca += tabPresta[i]["quantite"] * tabPresta[i]["prix_unitaire_ht"];
			}
		}
		
		return ca;
	},
	
	render: function() {
		return 	( 
					<div>
						<h1>Charges sociales</h1>
						
						<p>Pour ce trimestre ({this.getTexteTrimestre(this.trimestre())}), il vous faut déclarer <b>{this.montant()} €</b> sur le site de déclaration des charges sociales avant le <b>{this.getFinTrimestre(this.trimestre())}</b>.</p>
					< /div>
				);
	}
});

/**
 * La partie des côtisations fiscales
 */
var CotFisc = React.createClass({
	getAnneeDeclaration: function(){
		return (new Date().getFullYear() - 1);
	},
	
	montant: function(){
		var ca	= 0;
		
		// Calcul du chiffre d'affaires
		for(var i = 0; i < tabPrestaAnPasse.length; i++){
			ca += parseFloat(tabPrestaAnPasse[i]["prix_unitaire_ht"] * tabPrestaAnPasse[i]["quantite"]);
		}
		
		return ca;
	},
	
	render: function() {
		return 	( 
					<div>
						<h1>Charges fiscales</h1>
						
						<p>Pour {this.getAnneeDeclaration()}, il vous faudra déclarer <b>{this.montant()} €</b> sur votre déclaration d'impôts.</p>
					< /div>
				);
	}
});

/**
 * L'affichage de la page des déclarations
 */
var Declaration = React.createClass({
	render: function() {
		return 	( 
					<div>
						<CotSoc />
						
						<br />
						
						<CotFisc />
						
						<br/>
						
						<p className="text-warning"><b>Ces informations ne prennent en compte que les transactions passées via BigMeUp</b></p>
					< /div>
				);
	}
});
ReactDOM.render( <Declaration / > , document.getElementById("container"));