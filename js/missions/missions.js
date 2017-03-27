/**
 *
 * ============= VARIABLES ===============
 *
 */
var userId = getCookie("bmu_user_id");
var _url = 'http://bigmeup.istic.univ-rennes1.fr/api/front/getMissions.php?id_user=' + userId;

// Where the user is the client
var tabClient 	= [];
// Where the user is the presta
var tabPresta 	= [];
// List of the users
var tabUsr		= [];

/**
 *
 * ============= GLOBAL FUNCTIONS =============
 *
 */
// Getting the informations (not asynchronous)
$.ajax({
	url: _url,
	async: false
}).done(function(data){// When done
	// Parses the data from a JSON to an array
	data = JSON.parse(data);

	// Controls the answer of the API
	tabClient 	= JSON.parse(data["client"]);
	tabPresta 	= JSON.parse(data["presta"]);
	tabUsr 		= JSON.parse(data["usr"]);
	
	// Sorts the users to have a dictionnary : {MongoId => mail}
	var tabUsr_tmp = {};
	for(var i = 0; i < tabUsr.length; i++){
		tabUsr_tmp[tabUsr[i]["_id"]["$id"]] = tabUsr[i]["email"];
	}
	tabUsr = tabUsr_tmp;
});

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

var click = function(idMission){
	var date = new Date();
	date.setTime(date.getTime() + (1 * 24 * 60 * 60 * 1000));

	// Sets the cookies
	document.cookie = "bmu_mission_id=" + idMission + "; expires=" + date + "; path=/";

	// Redirects to profil.html
	document.location = "creationMission.html";
};

/**
 *
 * ==================== REACT CLASSES =====================
 *
 */
var Entete = React.createClass({
    render: function () {
        return (
            <ul className="nav nav-tabs">
                <li className="active">
					<a data-toggle="tab" href="#prestataire">Prestataire</a>
				</li>
                <li>
					<a data-toggle="tab" href="#client">Client</a>
				</li>
            </ul>
        );
    }
});

var Divs = React.createClass({
    render: function () {
        return (
            <div className="tab-content">
                <Prestataire />
				<Client />
            </div>
        );
    }
});

var Prestataire = React.createClass({
	tab: function(){
		var returnValue = [];
		
		for (var i = 0; i < tabPresta.length; i++) {
			// Initializes a var for the function
			let boundClick = click.bind(this, tabPresta[i]["_id"]["$id"]);
			
			// Adds the generated table row
			returnValue.push(
			<tr key={i}>
				<td>{tabUsr[tabPresta[i]["id_client"]]}</td>
				<td>{tabPresta[i]["objet"]}</td>
				<td>{tabPresta[i]["status"]}</td>
				<td><input 	type="button" 
							className="btn btn-default" 
							onClick={boundClick}
							value="Consulter"/></td>
			</tr>);
		}
		
		// Return the table rows
		return returnValue;
	},
	
    render: function () {
		// The tab's text
		return (
            <div id="prestataire" className="tab-pane fade in active">
                <table className="table table-striped">
					<tbody>
						<tr>
							<th>Client</th>
							<th>Objet</th>
							<th>Etat</th>
							<th></th>
						</tr>
						
						{this.tab()}
						
					</tbody>
				</table>
            </div>
        );
    }
});

var Client = React.createClass({
	tab: function(){
		var returnValue = [];
		
		for (var i = 0; i < tabClient.length; i++) {
			// Initializes a var for the function
			let boundClick = click.bind(this, tabClient[i]["_id"]["$id"]);
			
			returnValue.push(
			<tr key={i}>
				<td>{tabUsr[tabClient[i]["id_prestataire"]]}</td>
				<td>{tabClient[i]["objet"]}</td>
				<td>{tabClient[i]["status"]}</td>
				<td><input 	type="button" 
							className="btn btn-default" 
							onClick={boundClick}
							value="Consulter"/></td>
			</tr>);
		}
		
		return returnValue;
	},
	
    render: function () {
		// The tab's text
		return (
            <div id="client" className="tab-pane fade">
                <table className="table table-striped">
					<tbody>
						<tr>
							<th>Prestataire</th>
							<th>Objet</th>
							<th>Etat</th>
							<th></th>
						</tr>
						
						{this.tab()}
					</tbody>
				</table>
            </div>
        );
    }
});

var CreationMission = React.createClass({
	nouveau: function(){
		document.location = "creationMission.html";
	},
	
    render: function () {
		// The tab's text
		return (
            <div>
                <input 	type="button" 
						className="btn btn-default" 
						value="Nouvelle mission" 
						onClick={this.nouveau}/>
            </div>
        );
    }
});

var Container = React.createClass({
    render: function () {
        return (
            <div>
				<CreationMission />
				<br /><br />
                <Entete />
				<Divs />
            </div>
        );
    }
});

ReactDOM.render(<Container />, document.getElementById("container"));