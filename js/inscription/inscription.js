// Le champ texte de l'email
var Email = React.createClass({
	render: function () {
		return  (
				<div>
					<input 	className="form-control"
							type="text"
							placeholder="Adresse email"/>
					<br />
				</div>
				);
	}
});

// Le champ texte du prénom
var Prenom = React.createClass({
	render: function () {
		return  (
				<div>
					<input 	className="form-control"
							type="text"
							placeholder="Prénom"/>
					<br />
				</div>
				);
	}
});

// Le champ texte du nom
var Nom = React.createClass({
	render: function () {
		return  (
				<div>
					<input 	className="form-control"
							type="text"
							placeholder="Nom"/>
					<br />
				</div>
				);
	}
});

// Stockage des mots de passe tapés
var Mdps = React.createClass({
	getInitialState: function () {
		return 	{
					mdp: "",
					mdpR: ""
				};
	},
	
	// Stockage du champ de mot de passe
	changeMdp: function(word){
		this.setState({mdp: word});
	},
	
	// Stockage du champ de mot de passe à retaper
	changeMdpR: function(word){
		this.setState({mdpR: word});
		
		return this.controlMdp();
	},
	
	// Contrôle des mots de passe
	controlMdp: function(){
		// Si l'utilisateur n'a pas rentré de mot de passe
		if(this.state.mdp.length == 0){
				return <p>Veuillez entrer un mot de passe.</p>;
			}
		// Si les mots de passe sont identiques
		if(this.state.mdpR === this.state.mdp){
			return <p>Les mots de passe sont identiques!</p>;
		}
		// Si le mot de passe n'est pas retapé
		if(this.state.mdpR.length <= 0){
			return <p>Veuillez retaper votre mot de passe.</p>;
		}
		// Si les mots de passe ne sont pas identiques
		if(this.state.mdpR !== this.state.mdp){
			return <p>Les mots de passe ne sont pas identiques.</p>;
		}
	},
	
	render: function () {
		return 	(
					<div>
						<Mdp changeFct={this.changeMdp}/>
						<MdpRetaper changeFct={this.changeMdpR}/>
					</div>
				);
	}
})

// Le champ texte du mot de passe
var Mdp = React.createClass({
	changed: function (e) {
		// On change le mot de passe qui devra être réécrit
		// En le donnant à l'élément parent.
		// L'élément parent sert de passerelle entre les deux inputs de mot de passe
		this.props.changeFct(e.target.value);
	},
	
	render: function () {
		return 	(
				<div>
					<input 	className="form-control"
							type="password"
							placeholder="Mot de passe"
							onKeyUp={this.changed}/>
					<br />
				</div>
				);
	}
});

// Le champ texte du mot de passe
var MdpRetaper = React.createClass({
	getInitialState: function () {
		return 	{
					phraseErreur : ""
				};
	},
	
	changed: function (e) {
		// On envoie le nouveau mot de passe à l'élément parent
		// Pour qu'il puisse être comparé
		this.setState({phraseErreur: this.props.changeFct(e.target.value)});
	},
	
	render: function () {
		return 	(
				<div>
					<input 	className="form-control"
							type="password"
							placeholder="Retapez votre mot de passe"
							onKeyUp={this.changed} />
					<br />
					{this.state.phraseErreur}
					<br />
				</div>
				);
	}
});

// Le bouton pour valider
var Valider = React.createClass({
	notAvailable: function () {
		alert("Pas encore implémenté");
	},
	
	render: function () {
		return 	(
				<div>
					<input 	className="btn btn-primary"
							type="button"
							value="Valider"
							onClick={this.notAvailable}/>
					<br />
				</div>
				);
	}
});

// La page de l'inscription
var Inscription = React.createClass({
	render : function () {
		return (
			<form className="form-group">
				<Email />
				<Prenom />
				<Nom />
				<Mdps />
				<Valider />
			</form>
		);
	}
});

ReactDOM.render(<Inscription />, document.getElementById("container"));