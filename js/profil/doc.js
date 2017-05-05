/**
 * ================== Déclaration des variables ================
 */
// Lecture des cookies
var champs = 	[
					"libelle",
					"date_enregistrement",
					"date_echeance",
					"verification",
					"id_user"
				];
var cookiesTmp = document.cookie.split("; ");
var cookies = [];
for(var i = 0; i < cookiesTmp.length; i++){
	var key 	= cookiesTmp[i].split("=")[0];
	var value 	= cookiesTmp[i].split("=")[1];
	cookies[key] = value;
}

var kbis 	= [];
var cotSoc	= [];
var cotFis	= [];

var URL 		= "http://administration.bigmeup.fr/documents/";
// TAILLE_MAX = octets * 1000 -> pour avoir en kilo octets
var TAILLE_MAX 	= 2000 * 1000;

/**
 * ================= Fonctions ====================
 */

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
	url: "http://administration.bigmeup.fr/api/front/getDocument.php?id_user=" + cookies["bmu_user_id"],
	async: false
}).done(function (data) {// When done
	// Parses the data from a JSON to an array
	data = JSON.parse(data);
	
	try{
		kbis 	= JSON.parse(data["kbis"]);
	} catch(e){}
	
	try{
		cotFis 	= JSON.parse(data["cotFisc"]);
	} catch(e){}
	
	try{
		cotSoc 	= JSON.parse(data["cotSoc"]);
	} catch(e){}
});
 
/** 
 * ================= Elements react ================
 */

/**
 * Permet d'afficher le champ des informations
 */
var Infos = React.createClass({
	render: function() {
		return (
			<div className="text-info">
				<p>
					Les documents que vous importez doivent être sous fomat <b>image</b> ou <b>pdf</b>.<br/>
					La taille maximum de chaque document doit être inférieure à <b>2 Mo</b>
				</p>
			</div>
		);
	}
});

/**
 * Permet d'afficher le champ de la date d'échéance
 */
var Echeance = React.createClass({
	text: function(){
		switch(this.props.typeDoc){
			case "kbis":
				return 	kbis.length > 0 ? 
							kbis[kbis.length - 1]["date_echeance"] != "" ? 
								kbis[kbis.length - 1]["date_echeance"]
								: "--"
							: "--";
			
			case "cotSoc":
				return 	cotSoc.length > 0 ? 
							cotSoc[cotSoc.length - 1]["date_echeance"] != "" ?
								kbis[kbis.length - 1]["date_echeance"]
								: "--"
							: "--";
			
			case "cotFisc":
				return 	cotFis.length > 0 ? 
							cotFis[cotFis.length - 1]["date_echeance"] != "" ?
								cotFis[cotFis.length - 1]["date_echeance"]
								: "--"
							: "--";
			
			default:
				return "--";
		}
	},
	
	render: function() {
		return (
			<tr>
				<th>Date d'échéance de la validité</th>
				<td>{this.text()}</td>
			</tr>
		);
	}
});

/**
 * Permet d'afficher le champ de la date d'échéance
 */
var Verification = React.createClass({
	getEtat: function(etat){
		switch(etat){
			case "0":
				return "En cours de traitement";
			
			case "1":
				return "Validé";
			
			case "2":
				return "Refusé";
			
			case "4":
				return "Annulé";
			
			default:
				return "--";
		}
	},
	
	text: function(){
		switch(this.props.typeDoc){
			case "kbis":
				return 	kbis.length > 0 ? this.getEtat(kbis[kbis.length - 1]["verification"]) : "--";
			
			case "cotSoc":
				return 	cotSoc.length > 0 ? this.getEtat(cotSoc[cotSoc.length - 1]["verification"]) : "--";
			
			case "cotFisc":
				return 	cotFis.length > 0 ? this.getEtat(cotFis[cotFis.length - 1]["verification"]) : "--";
			
			default:
				return "--";
		}
	},
	
	render: function() {
		return (
			<tr>
				<th>Vérifié</th>
				<td>{this.text()}</td>
			</tr>
		);
	}
});

/**
 * Permet d'afficher le KBIS
 */
var Kbis = React.createClass({
	render: function(){
		return(
			<div>
				<h1>Kbis</h1>
				
				<table className="table table-striped">
					<tbody>
						<Verification typeDoc="kbis"/>
						<Echeance typeDoc="kbis"/>
						
						<Consulter typeDoc="kbis"/>
						<Importer typeDoc="kbis"/>
					</tbody>
				</table>
			</div>
		);
	}
});

/**
 * Permet d'afficher les côtisations sociales
 */
var CotSoc = React.createClass({
	render: function(){
		return (
			<div>
				<h1>Cotisations sociales</h1>
				
				<table className="table table-striped">
					<tbody>
						<Verification typeDoc="cotSoc"/>
						<Echeance typeDoc="cotSoc"/>
						
						<Consulter typeDoc="cotSoc"/>
						<Importer typeDoc="cotSoc"/>
					</tbody>
				</table>
			</div>
		);
	}
});

/**
 * Permet d'afficher les côtisations fiscales
 */
var CotFisc = React.createClass({
	render: function(){
		return (
			<div>
				<h1>Cotisations fiscales</h1>
				
				<table className="table table-striped">
					<tbody>
						<Verification typeDoc="cotFisc"/>
						<Echeance typeDoc="cotFisc"/>
						
						<Consulter typeDoc="cotFisc"/>
						<Importer typeDoc="cotFisc"/>
					</tbody>
				</table>
			</div>
		);
	}
});

var Consulter = React.createClass({
	click: function(){
		var url = "";
		switch(this.props.typeDoc){
			case "kbis":
				url += 	kbis.length > 0 	? kbis[kbis.length - 1]["url"] 		: "";
			break;
			
			case "cotSoc":
				url += 	cotSoc.length > 0 	? cotSoc[cotSoc.length - 1]["url"] 	: "";
			break;
			
			case "cotFisc":
				url += 	cotFis.length > 0 	? cotFis[cotFis.length - 1]["url"] 	: "";
			break;
			
			default:
			break;
		}
		
		if(url.length > 0){
			window.open(URL + url, "_blank");
		} else {
			alert("Erreur: Le document n'a pas été trouvé");
		}
	},
	
	render: function(){
		return(
			<tr>
				<td></td>
				<td>
					<input	type			= "input"
							className		= "btn btn-default"
							defaultValue	= "Consulter" 
							onClick			= {this.click}/>
				</td>
			</tr>
		);
	}
});

var Importer = React.createClass({
	click: function(){
		var file = document.getElementById(this.props.typeDoc + "Import").files[0];
		
		// On teste si un fichier a été sélectionné
		if(file != undefined){
			document.getElementById(this.props.typeDoc + "Err").style.display = "none";
			
			// Si la taille du fichier est inférieure à TAILLE_MAX ko
			if(file.size <= TAILLE_MAX){
				// On grise le bouton d'import
				document.getElementById(this.props.typeDoc).disabled = true;
				
				// On envoie le document
				var fd = new FormData();
				fd.append("file", file);
				fd.append("type", this.props.typeDoc);
				fd.append("user_id", cookies["bmu_user_id"]);
				
				$.ajax({
				   url: "http://administration.bigmeup.fr/api/front/setDocument.php",
				   type: "POST",
				   data: fd,
				   processData: false,
				   contentType: false
				}).done(function(data){// Quand c'est fini
					// Mettre la donnée du format JSON à un tableau
					data = JSON.parse(data);
					
					if(data["answer"] == "true"){
						location.reload();
					} else {
						alert("Problème dans l'envoi du fichier");
					}
				});
				return;
			}
		}
		
		document.getElementById(this.props.typeDoc + "Err").style.display = "block";
	},
	
	render: function(){
		return(
			<tr>
				<td></td>
				<td>
					<input	type		= "file" 
							id			= {this.props.typeDoc + "Import"}
							accept		= "image/*,.pdf"/>
					<p 	className="text-warning"
						id={this.props.typeDoc + "Err"}
						style={{display:"none"}}>
							<br/>
							Veuillez sélectionner un fichier image ou pdf de moins de {TAILLE_MAX / 1000000} Mo.
							<br/>
					</p>
					
					<input 	type		= "button"
							id 			= {this.props.typeDoc}
							defaultValue= "Importer" 
							className	= "btn btn-primary" 
							onClick		= {this.click}/>
				</td>
			</tr>
		);
	}
});

// La page
var Documents = React.createClass({
	render: function() {
		return ( 
			<div>
				<Infos />
				<Kbis />
				<CotSoc />
				<CotFisc />
			</div>
		);
	}
});
        
ReactDOM.render(<Documents />, document.getElementById("container"));