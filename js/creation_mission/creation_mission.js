/**
 * ====================================== ETATS DE LA MISSION ================================
 *
 * 0 : Création
 * 1 : Validée prestataire
 * 2 : Validée client
 * 3 : Invalidée prestataire
 * 4 : Invalidée client
 * 5 : En attente de réalisation
 * 6 : Réalisée
 * 7 : Annulée
 *
 *
 * ================================== ETATS DE L UTILISATEUR ========================
 * 0 : Prestataire
 * 1 : Client
 *
 */

/**
 *  ========================================= VARIABLES ====================================
 */
var URL_PDF = "http://bigmeup.istic.univ-rennes1.fr/pdf_generator/resources/";
var mailOk = false;
var etatUtilisateur = 0;

var etatMission = 0;

var champs = 	[
					"objet",
					"pu_ht",
					"quantite",
					"frais",
					"date_debut",
					"date_fin",
					"clauses",
					"lieu_select",
					"mailClient"
				];
				
// Initialisation des values
var values = {};
values["id_prestataire"]= "";
values["id_mission"] 	= "";
values["etat"]			= "";
values["id_facture"]	= "";
values["id_devis"]		= "";
for(var i = 0; i < champs.length; i++){
	values[champs[i]] = "";
}

// Lecture des cookies
var cookiesTmp = document.cookie.split("; ");
var cookies = [];
for(var i = 0; i < cookiesTmp.length; i++){
	var key 	= cookiesTmp[i].split("=")[0];
	var value 	= cookiesTmp[i].split("=")[1];
	cookies[key] = value;
}

/**
 * ========================================== FONCTIONS ====================================
 */
/**
 * Contrôle si les champs sont bien remplis
 *
 * @param	action	L'action qui est faite
 */
var controle = function(action){
	var ok = false;
	/**
	 * ========== CONTROLE DES CHAMPS SEULEMENT SI LES CHAMPS SONT LA===========
	 */
	if(showInputField() && (action != "retour")){
		var tmp;
		
		ok = true;
		// Contrôle de l'objet
		tmp = document.getElementsByName("objet")[0].value.length > 0;
		ok &= tmp;
		if(!tmp){
			document.getElementById("err_objet").style.display = "block";
		} else {
			document.getElementById("err_objet").style.display = "none";
		}
		
		// Contrôle du prix unitaire HT
		tmp = document.getElementsByName("pu_ht")[0].value.length > 0;
		ok &= tmp;
		if(!tmp){
			document.getElementById("err_pu_ht").style.display = "block";
		} else {
			document.getElementById("err_pu_ht").style.display = "none";
		}
		
		// Contrôle de la quantité
		tmp = document.getElementsByName("quantite")[0].value.length > 0;
		ok &= tmp;
		if(!tmp){
			document.getElementById("err_quantite").style.display = "block";
		} else {
			document.getElementById("err_quantite").style.display = "none";
		}
		
		// Contrôle des frais
		tmp = document.getElementsByName("cb_frais")[0].checked;
		if(tmp){
			tmp = document.getElementsByName("frais")[0].value.length > 0;
			ok &= tmp;
			if(!tmp){
				document.getElementById("err_frais").style.display = "block";
			} else {
				document.getElementById("err_frais").style.display = "none";
			}
		} else {
			document.getElementById("err_frais").style.display = "none";
		}
		
		// Contrôle de la date de début
		tmp = document.getElementsByName("date_debut")[0].value.length > 0;
		ok &= tmp;
		if(!tmp){
			document.getElementById("err_date_debut").style.display = "block";
		} else {
			document.getElementById("err_date_debut").style.display = "none";
		}
		
		// Contrôle de la date de fin
		tmp = document.getElementsByName("date_fin")[0].value.length > 0;
		ok &= tmp;
		if(!tmp){
			document.getElementById("err_date_fin").style.display = "block";
		} else {
			document.getElementById("err_date_fin").style.display = "none";
		}
		
		// Contrôle des clauses
		tmp = document.getElementsByName("clauses")[0].value.length > 0;
		ok &= tmp;
		
		// Contrôle du lieu
		tmp = document.getElementsByName("lieu_select")[0];
		if(tmp.value == "autre"){
			tmp = document.getElementsByName("lieu_input")[0].value.length > 0;
			ok &= tmp;
			
			if(!tmp){
				document.getElementById("err_lieu_input").style.display = "block";
			} else {
				document.getElementById("err_lieu_input").style.display = "none";
			}
		}
		
		// contrôle du mail client
		tmp = mailOk;
		ok &= tmp;
		if(!tmp){
			document.getElementById("err_mailClient").style.display = "block";
		} else {
			document.getElementById("err_mailClient").style.display = "none";
		}
	}
	
	// Affichage
	if(afficherSectionValidation() && action != "refuser"){
		ok = true;
		// Contrôle de l'acceptation des CGV
		tmp = document.getElementsByName("cb_cgv")[0].checked;
		ok &= tmp;
		if(!tmp){
			document.getElementById("err_cb_cgv").style.display = "block";
		} else {
			document.getElementById("err_cb_cgv").style.display = "none";
		}
	}
	
	/**
	 * ========== ACTIONS ==========
	 */
	if(action == "confirmer"){// Confirmation
		if(ok){
			confirmation();
		}
	} else if(action == "refuser"){// Refus
		refus();
	} else if(action == "sauvegarder"){// Sauvegarde
		// TODO Faire ça si il reste du temps
	} else if(action == "annuler"){// Annulation
		annulation();
	} else if(action == "valider"){// Validation
		if(ok){
			validation();
		}
	} else if(action == "realiser"){// Réalisation
		realisation();
	} else if(action == "modifier"){// Modification
		if(ok){
			modification();
		}
	} else if(action == "retour"){// Retour
		retour();
	}
};

/**
 * Action lors du clic sur [Retour]
 */
var retour = function(){
	if(cookies["bmu_vient_admin"] != undefined){
		var date = new Date();
		date.setTime(date.getTime() - (1 * 24 * 60 * 60 * 1000));

		// Sets the cookies
		document.cookie = "bmu_vient_admin=false; expires=" + date + "; path=/";
		
		location.href = "../backend/missions.html";
	} else {
		location.href = "missions.html";
	}
}

/**
 * Action lors du clic sur [Confirmer]
 */
var confirmation = function(){
	var valeurs = valeurs_form();
	
	var datas = "ajoutMission=true";
	
	// Prend l'id du prestataire (utilisateur courant)
	var cookies = document.cookie.split("; ");
	var cookiesTmp = {};
	for(var i = 0; i < cookies.length; i++){
		var key 	= cookies[i].split("=")[0];
		var value 	= cookies[i].split("=")[1];
		cookiesTmp[key] = value;
	}
	cookies = cookiesTmp;
	
	datas += "&id_prestataire=" + cookies["bmu_user_id"];

	// Le mail du client
	datas += "&mailClient=" + valeurs["mailClient"];
	
	// L'objet
	datas += "&objet=" + valeurs["objet"];
	
	// Prix unitaire HT
	datas += "&prix_unitaire_ht=" + parseInt(valeurs["pu_ht"]);
	
	// Quantité
	datas += "&quantite=" + parseInt(valeurs["quantite"]);
	
	// Date de début
	datas += "&date_debut=" + valeurs["date_debut"];
	
	// Date de fin
	datas += "&date_fin=" + valeurs["date_fin"];
	
	// Clauses
	datas += "&clauses=" + valeurs["clauses"];
	
	// Lieu de la mission
	var lieu = valeurs["lieu_select"];
	if(lieu == "autre"){
		lieu = document.getElementsByName("lieu_input")[0].value;
	}
	datas += "&lieu_mission=" + lieu;
	
	// Statut
	datas += "&status=Validée Prestataire";
	
	// Validation du client
	datas += "&validation_client=0";
	
	// Validation du prestataire
	datas += "&validation_prestataire=1";
	
	// Autres frais
	var frais = valeurs["frais"];
	if(!document.getElementsByName("cb_frais")[0].checked){
		frais = "0";
	} else {
		// On enlève les 0 avant le chiffre s'il y en a
		frais = parseInt(frais);
	}
	datas += "&autres_frais=" + frais;
	document.getElementsByName("btn-confirmer")[0].disabled = true;
	
	// Sets the ajax request for the mission
	$.ajax({
		url: "http://bigmeup.istic.univ-rennes1.fr/api/front/setMission.php",
		type: "POST",
		data: datas
	}).done(function(data){// When done
		// Parses the data from a JSON to an array
		data = JSON.parse(data);
		
		if(data["answer"] == "true"){
			location.href = "missions.html";
		} else {
			alert("Problème dans l'ajout de la mission");
		}
	});
};

/**
 * Action lors du clic sur [Refuser]
 */
var refus = function(){
	var datas = "refusMission=" + values["id_mission"] + "&etatUtilisateur=" + etatUtilisateur;
	
	// La requête
	$.ajax({
		url: "http://bigmeup.istic.univ-rennes1.fr/api/front/setMission.php",
		type: "POST",
		data: datas
	}).done(function(data){// When done
		// Parses the data from a JSON to an array
		data = JSON.parse(data);
		
		if(data["answer"] == "true"){
			location.href = "missions.html";
		} else {
			alert("Problème dans l'annulation de la mission");
		}
	});
};

/**
 * Action lors du clic sur [Valider]
 */
var validation = function(){
	var datas 	 = 	"validMission=" + values["id_mission"];
	datas		+= 	"&idDevis="		+ values["id_devis"];
	document.getElementsByName("btn-valider")[0].disabled = true;
	
	// La requête
	$.ajax({
		url: "http://bigmeup.istic.univ-rennes1.fr/api/front/setMission.php",
		type: "POST",
		data: datas
	}).done(function(data){// When done
		// Parses the data from a JSON to an array
		data = JSON.parse(data);
		
		if(data["answer"] == "true"){
			location.href = "missions.html";
		} else {
			alert("Problème dans l'annulation de la mission");
		}
	});
};

/**
 * Action lors du clic sur [Annuler]
 */
var annulation = function(){
	var datas = "annulMission=" + values["id_mission"];
	
	// La requête
	$.ajax({
		url: "http://bigmeup.istic.univ-rennes1.fr/api/front/setMission.php",
		type: "POST",
		data: datas
	}).done(function(data){// When done
		// Parses the data from a JSON to an array
		data = JSON.parse(data);
		
		if(data["answer"] == "true"){
			location.href = "missions.html";
		} else {
			alert("Problème dans l'annulation de la mission");
		}
	});
};

/**
 * Action lors du clic sur [Modifier]
 */
var modification = function(){
	var valeurs = valeurs_form();
	
	var datas = "modifMission=" + values["id_mission"];
	
	// Prend l'id du prestataire (utilisateur courant)
	var cookies = document.cookie.split("; ");
	var cookiesTmp = {};
	for(var i = 0; i < cookies.length; i++){
		var key 	= cookies[i].split("=")[0];
		var value 	= cookies[i].split("=")[1];
		cookiesTmp[key] = value;
	}
	cookies = cookiesTmp;
	
	datas += "&id_prestataire=" + values["id_prestataire"];

	// Le mail du client
	datas += "&mailClient=" + valeurs["mailClient"];
	
	// L'objet
	datas += "&objet=" + valeurs["objet"];
	
	// Prix unitaire HT
	datas += "&prix_unitaire_ht=" + parseInt(valeurs["pu_ht"]);
	
	// Quantité
	datas += "&quantite=" + parseInt(valeurs["quantite"]);
	
	// Date de début
	datas += "&date_debut=" + valeurs["date_debut"];
	
	// Date de fin
	datas += "&date_fin=" + valeurs["date_fin"];
	
	// Clauses
	datas += "&clauses=" + valeurs["clauses"];
	
	// Lieu de la mission
	var lieu = valeurs["lieu_select"];
	if(lieu == "autre"){
		lieu = document.getElementsByName("lieu_input")[0].value;
	}
	datas += "&lieu_mission=" + lieu;
	
	// Statut
	datas += "&status=" + (etatUtilisateur == 0 ? "Validée Prestataire" : "Validée Client");
	
	// Validation du client
	datas += "&validation_client=1";
	
	// Validation du prestataire
	datas += "&validation_prestataire=1";
	
	// Autres frais
	var frais = valeurs["frais"];
	if(!document.getElementsByName("cb_frais")[0].checked){
		frais = "0";
	} else {
		// On enlève les 0 avant le chiffre s'il y en a
		frais = parseInt(frais);
	}
	datas += "&autres_frais=" + frais;
	
	document.getElementsByName("btn-modifier")[0].disabled = true;
	
	// Sets the ajax request for the mission
	$.ajax({
		url: "http://bigmeup.istic.univ-rennes1.fr/api/front/setMission.php",
		type: "POST",
		data: datas
	}).done(function(data){// When done
		// Parses the data from a JSON to an array
		data = JSON.parse(data);
		
		if(data["answer"] == "true"){
			location.href = "missions.html";
		} else {
			alert("Problème dans l'ajout de la mission");
		}
	});
};

/**
 * Action lors du clic sur [Réaliser]
 */
var realisation = function(){
	var datas	 = "realMission=" 	+ values["id_mission"];
	datas		+= "&idFac="		+ values["id_facture"];
	
	document.getElementsByName("btn-realiser")[0].disabled = true;
	
	// Sets the ajax request for the mission
	$.ajax({
		url: "http://bigmeup.istic.univ-rennes1.fr/api/front/setMission.php",
		type: "POST",
		data: datas
	}).done(function(data){// When done
		// Parses the data from a JSON to an array
		data = JSON.parse(data);
		
		if(data["answer"] == "true"){
			location.href = "missions.html";
		} else {
			alert("Problème dans l'ajout de la mission");
		}
	});
};

/**
 * Prend les informations du formulaire
 */
var valeurs_form = function(){
	var tab = {};
	
	for(var i = 0; i < champs.length; i++){
		tab[champs[i]] = getInputValue(champs[i]);
	}
	
	return tab;
};

/**
 * Prend la valeur du champ avec le nom [name]
 *
 * @param	name	Le nom de l'input
 */
var getInputValue = function(name){
	return document.getElementsByName(name)[0].value;
};
 
/**
 * Pour vérifier que le nombre est au-dessus de zéro dans le champ avec le nom "name"
 */
var verifAuDessusZero = function(name){
	var elt = document.getElementsByName(name)[0];
	// Si ce n'est pas un nombre ou que le nombre est inférieur à zéro
	if(isNaN(parseFloat(elt.value)) || parseFloat(elt.value) < 0){
		elt.value = 0;
	}
};

/**
 * Pour savoir si on affiche ou non le formulaire
 */
var afficherFormulaire = function(){
	return 	(etatMission == 0 && (etatUtilisateur == 0 || etatUtilisateur == 1)) || // Si c'est le brouillon et que l'utilisateur fait partie de la mission
			(etatMission == 1 && etatUtilisateur == 1) || // Si c'est Validé presta et que c'est le client qui consulte
			(etatMission == 3 && etatUtilisateur == 0) || // Si c'est Invalidé presta et que c'est le presta qui consulte
			(etatMissoin == 4 && etatUtilisateur == 1);   // Si c'est Invalidé client et que c'est le client qui consulte
};

/**
 * Pour savoir si on affiche le bouton Refuser
 */
var afficherBtnRefuser = function(){
	return 	(etatMission == 1 && etatUtilisateur == 1) || // Si c'est le client qui consulte après que ce soit le presta qui ait validé
			(etatMission == 2 && etatUtilisateur == 0); // Si c'est le presta qui consulte après que ce soit le client qui ait validé
};

/**
 * Pour savoir si on affiche le bouton Confirmer
 */
var afficherBtnConfirmer = function(){
	return etatMission == 0;
};

/**
 * Pour savoir si on affiche le bouton Annuler
 */
var afficherBtnAnnuler = function(){
	return etatMission != 7 && etatMission != 0 && etatMission != 6;
};

/**
 * Pour savoir si on affiche le bouton Voir le devis
 */
var afficherBtnDevis = function(){
	return etatMission == 5 || etatMission == 6 || etatMission == 7;
};

/**
 * Pour savoir si on affiche le bouton Voir la facture
 */
var afficherBtnFacture = function(){
	return etatMission == 6;
};

/**
 * Pour savoir si on affiche le bouton Valider
 */
var afficherBtnValider = function(){
	return 	(etatMission == 1 && etatUtilisateur == 1) || 
			(etatMission == 2 && etatUtilisateur == 0);
};

/**
 * Pour savoir si on affiche le bouton Modifier
 */
var afficherBtnModifier = function(){
	return 	(etatMission == 3 && etatUtilisateur == 0) || 
			(etatMission == 4 && etatUtilisateur == 1);
};

/**
 * Pour savoir si on affiche le bouton Modifier
 */
var afficherBtnRealiser = function(){
	return 	etatMission == 5 && etatUtilisateur == 0;
};

/**
 * Pour savoir si on affiche la partie Validation
 */
var afficherSectionValidation = function(){
	return 	(etatMission == 0) || 
			(etatMission == 1 && etatUtilisateur == 1) ||
			(etatMission == 2 && etatUtilisateur == 0) || 
			(etatMission == 3 && etatUtilisateur == 0) || 
			(etatMission == 4 && etatUtilisateur == 1);
};

/**
 * Pour avoir le code correspondant à l'état
 */
var getEtatCode = function(etat){
	switch(etat){
		case "Création":
			etatMission = 0;
		break;
		
		case "Validée Prestataire":
			etatMission = 1;
		break;
		
		case "Validée Client":
			etatMission = 2;
		break;
		
		case "Invalidée Prestataire":
			etatMission = 3;
		break;
		
		case "Invalidée Client":
			etatMission = 4;
		break;
		
		case "En attente de réalisation":
			etatMission = 5;
		break;
		
		case "Réalisée":
			etatMission = 6;
		break;
		
		case "Annulée":
			etatMission = 7;
		break;
		
		default:
			etatMission = 7;
		break;
	}
	
	return etat;
};

/**
 * Pour avoir la valeur par défaut du champ
 */
var getDefaultInputValue = function(champ){
	try{
		return values[champ].length > 0 ? values[champ] : "";
	} catch(e){
		return "";
	}
};

/**
 * Pour savoir si on affiche l'input ou juste du text
 */
var showInputField = function(){
	return 	(etatMission == 0) || 
			(etatMission == 3 && etatUtilisateur == 0) || 
			(etatMission == 4 && etatUtilisateur == 1);
}

/**
 * ======================== TRAITEMENT =================
 */
// Si le cookie indiquant l'id de la mission est là
if(cookies["bmu_mission_id"] != undefined){
	// Sets the mission id
	values["id_mission"] = cookies["bmu_mission_id"];
	
	// Unsets the mission id cookie
	var date = new Date();
	date.setTime(date.getTime() - (1 * 24 * 60 * 60 * 1000));
	document.cookie = "bmu_mission_id=false; expires=" + date + "; path=/";
	
	// Gets the value of the mission
	$.ajax({
		url: "http://bigmeup.istic.univ-rennes1.fr/api/front/getMission.php?id=" + values["id_mission"],
		async: false
	}).done(function(data){// When done
		// Parses the data from a JSON to an array
		data = JSON.parse(data);
		data = data[0];
		
		values["etat"] 			= data["status"];
		values["clauses"]		= data["clauses"];
		values["pu_ht"]			= data["prix_unitaire_ht"];
		values["objet"]			= data["objet"];
		values["frais"]			= data["autres_frais"];
		values["date_debut"]	= data["date_debut"];
		values["date_fin"]		= data["date_fin"];
		values["quantite"]		= data["quantite"];
		values["lieu_select"]	= data["lieu_mission"];
		values["id_facture"]	= data["facture"];
		values["id_devis"]		= data["devis"];
		values["id_prestataire"]= data["id_prestataire"];
		
		// Sets the user's state
		etatUtilisateur 		= data["id_prestataire"] == cookies["bmu_user_id"] ? 0 : 1;
		
		// Sets the mission's state
		getEtatCode(data["status"]);
		
		// Gets the mail adress
		$.ajax({
			url: "http://bigmeup.istic.univ-rennes1.fr/api/front/getUser.php?id=" + data["id_client"],
			async: false
		}).done(function(dataClient){// When done
			// Parses the data from a JSON to an array
			dataClient = JSON.parse(dataClient);
			dataClient = dataClient[0];
			
			values["mailClient"] = dataClient["email"];
			mailOk = true;
		});
	});
}

/**
 * ========================================== ELEMENTS =====================================
 */
 
/*
 * Création du champ des éléments cachés
 */
var Hidden = React.createClass({
	// La fonction de rendu
	render: function () {
		return 	(
					<div>
						<input type="hidden" name="id_mission" 	value={values["id_mission"]} />
						<input type="hidden" name="etat" 		value={values["etat"]} />
						<input type="hidden" name="id_facture" 	value={values["id_facture"]} />
						<input type="hidden" name="id_devis"	value={values["id_devis"]} />
					</div>
				);
	}
});

/**
 * Création du champ Objet
 */
var Objet = React.createClass({
	render: function () {
		var input = showInputField() ? (<input 	name="objet" 
								className="form-control" 
								type="text" 
								defaultValue={getDefaultInputValue("objet")}
								placeholder="Objet de la mission" />) : (<p>{getDefaultInputValue("objet")}</p>);
		return 	(
					<div>
						<p>Objet de la mission</p>
						
						{input}
						
						<p 	id="err_objet" 
							className="text-warning" 
							style={{display: "none"}}>
								Veuillez renseigner l'objet
						</p>
						<br/>
					</div>
				);
	}
});

/**
 * Création du champ Prix journalier HT
 */
var PrixUnitaireHT = React.createClass({
	render: function () {
		var input = showInputField() ? (<input 	name="pu_ht" 
								className="form-control" 
								type="number" 
								defaultValue={getDefaultInputValue("pu_ht")}
								onChange={() => verifAuDessusZero('pu_ht')}
								placeholder="Prix journalier HT" />) : (<p>{getDefaultInputValue("pu_ht")} €</p>);
		return 	(
					<div>
						<p>Prix journalier HT</p>
						
						{input}
						
						<p 	id="err_pu_ht" 
							className="text-warning" 
							style={{display: "none"}}>
								Veuillez renseigner le prix unitaire HT
						</p>
						<br/>
					</div>
				);
	}
});

/**
 * Création du champ Quantité
 */
var Quantite = React.createClass({
	render: function () {
		var input = showInputField() ? (<input 	name="quantite" 
								className="form-control" 
								type="number" 
								defaultValue={getDefaultInputValue("quantite")}
								onChange={() => verifAuDessusZero('quantite')}
								placeholder="Nombre de jours" />) : (<p>{getDefaultInputValue("quantite")}</p>);
		
		return 	(
					<div>
						<p>Nombre de jours</p>
						
						{input}
						
						<p 	id="err_quantite" 
							className="text-warning" 
							style={{display: "none"}}>
								Veuillez renseigner la quantité
						</p>
						<br/>
					</div>
				);
	}
});

/**
 * Création du champ Frais
 */
var Frais = React.createClass({
	render: function () {
		var input = showInputField() ? (
						<div>
							<input name="cb_frais" type="checkbox" value="cb_frais" />Frais (à forfaitiser à la journée)
							<input 	name="frais" 
								className="form-control" 
								defaultValue={getDefaultInputValue("frais")}
								type="number" 
								onChange={() => verifAuDessusZero('frais')}
								placeholder="Frais prévus" />
						</div>) : (<p>Frais:<br/>{getDefaultInputValue("frais")} €</p>);
								
		return 	(
					<div>
						{input}
						
						<p 	id="err_frais" 
							className="text-warning" 
							style={{display: "none"}}>
								Veuillez renseigner les frais
						</p>
						<br/>
					</div>
				);
	}
});


/**
 * Création du champ Date de début
 */
var DateDebut = React.createClass({
	render: function () {
		var input = showInputField() ? (<input 	name="date_debut" 
					className="form-control" 
					type="date" 
					defaultValue={getDefaultInputValue("date_debut")}
					placeholder="Date de début: jj/mm/aaaa" />) : (<p>{getDefaultInputValue("date_debut")}</p>);
		return 	(
					<div>
						<p>Date de début</p>
						
						{input}
						
						<p 	id="err_date_debut" 
							className="text-warning" 
							style={{display: "none"}}>
								Veuillez renseigner la date de début de la mission
						</p>
						<br/>
					</div>
				);
	}
});

/**
 * Création du champ Date de fin
 */
var DateFin = React.createClass({
	render: function () {
		var input = showInputField() ? (<input 	name="date_fin" 
					className="form-control" 
					type="date" 
					defaultValue={getDefaultInputValue("date_fin")}
					placeholder="Date de fin: jj/mm/aaaa" />) : (<p>{getDefaultInputValue("date_fin")}</p>);
					
		return 	(
					<div>
						<p>Date de fin</p>
						
						{input}
						
						<p 	id="err_date_fin" 
							className="text-warning" 
							style={{display: "none"}}>
								Veuillez renseigner la date de fin de mission
						</p>
						<br/>
					</div>
				);
	}
});


/**
 * Création du champ Frais
 */
var Clauses = React.createClass({
	render: function () {
		var clauses = getDefaultInputValue("clauses").length > 0 ? getDefaultInputValue("clauses") : "--";
		
		var input = showInputField() ? (
					<textarea 	name="clauses" 
						className="form-control" 
						defaultValue={getDefaultInputValue("clauses")}
						type="input" 
						placeholder="Clauses du contrat">
					</textarea>) : (<p>{clauses}</p>);
					
		return 	(
					<div>
						<p>Clauses (supplémentaires aux <a>CGV</a>) du contrat</p>
						
						{input}
						
						<br/>
					</div>
				);
	}
});


/**
 * Création du champ Lieu
 */
var Lieu = React.createClass({
	selectChanged: function(){
		var select = document.getElementsByName("lieu_select")[0];
		document.getElementsByName("lieu_input")[0].style.display = 	(
																			select.value == "autre" ?
																			"block" : "none"
																		)
	},
	
	render: function () {
		var input = showInputField() ? (
					<div>
						<select name="lieu_select" className="form-control" onChange={this.selectChanged}>
							<optgroup label="Entreprise cliente">
								<option value="client">Locaux du client</option>
							</optgroup>
							<optgroup label="Entreprise prestataire">
								<option value="prestataire">Locaux du prestataire</option>
							</optgroup>
							<optgroup label="Autre">
								<option value="autre">Autre (à préciser)</option>
							</optgroup>
						</select>
						
						<br/>
						
						<input 	className="form-control" 
								type="text" 
								placeholder="A préciser (facultatif)" 
								defaultValue={getDefaultInputValue("lieu_select")}
								style={{display: "none"}} 
								name="lieu_input" />
					</div>) : (<p>{getDefaultInputValue("lieu_select")}</p>);
		return 	(
					<div>
						<p>Lieu du déroulement de la mission</p>
						
						{input}
						
						<p 	id="err_lieu_input" 
							className="text-warning" 
							style={{display: "none"}}>
								Veuillez renseigner le lieu du déroulement de la mission
						</p>
						
						<br/>
					</div>
				);
	}
});

/**
 * Création du champ Mail du client
 */
var MailClient = React.createClass({
	controlMail: function () {
		// Gets the email
		var elt = document.getElementsByName("mailClient")[0];
		var mail = elt.value;
		
		if(mail.length > 0 && /.*@.*[.].*$/.test(mail)){
			// Hides the text saying that the email adress is not correct
			document.getElementById("err_mailInvalide").style.display = "none";
			
			// Sets the ajax request
			$.ajax({
				url: "http://bigmeup.istic.univ-rennes1.fr/api/front/getUser.php?mail=" + mail
			}).done(function(data){// When done
				// Parses the data from a JSON to an array
				data = JSON.parse(data);

				// Controls the answer of the API
				if(data["answer"] == "true"){
					// Hides the errors
					document.getElementById("err_mailClient").style.display = "none";

					// Shows the success
					document.getElementById("err_mailValide").style.display = "block";

					mailOk = true;
				} else {
					// Hides the success
					document.getElementById("err_mailValide").style.display = "none";

					// Shows the error saying that the email is not valid
					document.getElementById("err_mailInvalide").style.display = "block";

					mailOk = false;
				}
			});
		} else {
			// Shows the text saying that the email adress is not correct
			document.getElementById("err_mailInvalide").style.display = "block";

			mailOk = false;
		}
	},
	
	render: function () {
		var input = showInputField() ? (
						<input 	name="mailClient" 
								className="form-control" 
								type="text" 
								onBlur={this.controlMail}
								defaultValue={getDefaultInputValue("mailClient")}
								placeholder="Adresse email du client" />
						) : (<p>{getDefaultInputValue("mailClient")}</p>);
		return 	(
					<div>
						<p>Adresse email du client</p>
						
						{input}
						
						<p 	id="err_mailClient" 
							className="text-warning" 
							style={{display: "none"}}>
								Veuillez renseigner l'adresse email du client
						</p>
						<p 	id="err_mailInvalide" 
							className="text-warning" 
							style={{display: "none"}}>
								Veuillez renseigner une adresse email valide
						</p>
						<p 	id="err_mailValide"
						className="text-success"
						style={{display: "none"}}>
						L'email est valide!
						</p>
					</div>
				);
	}
});

/**
 * Création du champ Acceptation des CGV
 */
var AcceptationCGV = React.createClass({
	render: function () {
		return 	(
					<div>
						<input name="cb_cgv" type="checkbox" />J'acepte les termes des <a>CGV</a>
						<p 	id="err_cb_cgv" 
							className="text-warning" 
							style={{display: "none"}}>
								Veuillez accepter les termes des CGV
						</p>
					</div>
				);
	}
});

/**
 * Création du bouton Confirmer
 */
var Confirmer = React.createClass({
	render: function () {
		return 	(
					<input 	name="btn-confirmer" 
							className="btn btn-success" 
							type="button" 
							value="Confirmer" 
							onClick={() => controle("confirmer")} />
				);
	}
});

/**
 * Création du bouton Sauvegarder
 */
var Sauvegarder = React.createClass({
	render: function () {
		return 	(
					<input 	name="btn-sauvegarder" 
							className="btn btn-warning" 
							type="button" 
							value="Sauvegarder" 
							onClick={() => controle("sauvegarder")} />
				);
	}
});

/**
 * Création du bouton Refuser
 */
var Refuser = React.createClass({
	render: function () {
		return 	(
					<input 	name="btn-refuser" 
							className="btn btn-warning" 
							type="button" 
							value="Refuser" 
							onClick={() => controle("refuser")} />
				);
	}
});

/**
 * Création du bouton Valider
 */
var Valider = React.createClass({
	render: function () {
		return 	(
					<input 	name="btn-valider" 
							className="btn btn-success" 
							type="button" 
							value="Valider" 
							onClick={() => controle("valider")} />
				);
	}
});

/**
 * Création du bouton Annuler
 */
var Annuler = React.createClass({
	render: function () {
		return 	(
					<input 	name="btn-annuler" 
							className="btn btn-danger" 
							type="button" 
							value="Annuler" 
							onClick={() => controle("annuler")} />
				);
	}
});

/**
 * Création du bouton Facture
 */
var Facture = React.createClass({
	open: function(){
		$.ajax({
			url: "http://bigmeup.istic.univ-rennes1.fr/api/front/getFacture.php?id=" + getDefaultInputValue("id_facture")
		}).done(function(data){// When done
			// Parses the data from a JSON to an array
			data = JSON.parse(data);
			data = data[0];
			window.open(URL_PDF + data["url"], "_blank");
		});
	},
	
	render: function () {
		return 	(
					<input 	name="btn-facture" 
							className="btn btn-primary" 
							type="button" 
							value="Voir la facture" 
							onClick={this.open} />
				);
	}
});

/**
 * Création du bouton Facture
 */
var Devis = React.createClass({
	open: function(){
		$.ajax({
			url: "http://bigmeup.istic.univ-rennes1.fr/api/front/getDevis.php?id=" + getDefaultInputValue("id_devis")
		}).done(function(data){// When done
			// Parses the data from a JSON to an array
			data = JSON.parse(data);
			data = data[0];
			window.open(URL_PDF + data["url"], "_blank");
		});
	},
	
	render: function () {
		return 	(
					<input 	name="btn-devis" 
							className="btn btn-primary" 
							type="button" 
							value="Voir le devis" 
							onClick={this.open} />
				);
	}
});

/**
 * Création du bouton Retour
 */
var Retour = React.createClass({
	render: function () {
		return 	(
					<input 	name="btn-retour" 
							className="btn btn-default" 
							type="button" 
							value="Retour" 
							onClick={() => controle("retour")} />
				);
	}
});

/**
 * Création du bouton Modifier
 */
var Modifier = React.createClass({
	render: function () {
		return 	(
					<input 	name="btn-modifier" 
							className="btn btn-primary" 
							type="button" 
							value="Modifier" 
							onClick={() => controle("modifier")} />
				);
	}
});

/**
 * Création du bouton Réaliser
 */
var Realiser = React.createClass({
	render: function () {
		return 	(
					<input 	name="btn-realiser" 
							className="btn btn-success" 
							type="button" 
							value="Réaliser" 
							onClick={() => controle("realiser")} />
				);
	}
});

/**
 * L'affichage de la page
 */
var Creation = React.createClass({
	render: function () {
		return 	(
					<form className="form-group">
						<Retour />
						<Hidden />
						<h1>Mission</h1>
						<Objet />
						<PrixUnitaireHT />
						<Quantite />
						<Frais />
						<Clauses />
						<Lieu />
						<DateDebut />
						<DateFin />
						
						<br />
						
						<h1>Client</h1>
						<MailClient />
						
						<br />
						
						{afficherSectionValidation() ? (<div><h1>Validation</h1><AcceptationCGV /></div>) : ""}
						
						<br />
						
						{afficherBtnConfirmer() ? <Confirmer /> 	: ""}
						{1 == 2 				? <Sauvegarder /> 	: ""}
						{afficherBtnValider() 	? <Valider /> 		: ""}
						{afficherBtnModifier() 	? <Modifier /> 		: ""}
						{afficherBtnRealiser() 	? <Realiser /> 		: ""}
						{afficherBtnRefuser() 	? <Refuser /> 		: ""}
						{afficherBtnAnnuler() 	? <Annuler /> 		: ""}
						
						<br /><br />
						
						{afficherBtnDevis() 	? <Devis /> 		: ""}
						{afficherBtnFacture() 	? <Facture /> 		: ""}
					</form>
				);
	}
});

ReactDOM.render(<Creation />, document.getElementById("container"));