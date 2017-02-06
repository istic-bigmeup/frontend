var Email = React.createClass({
	render: function () {
		return 	(
				<div>
					<input 	className="form-control"
							type="text"
							placeholder="Email"/>
					<br />
				</div>
				);
	}
});

var Mdp = React.createClass({
	render: function () {
		return 	(
				<div>
					<input 	className="form-control"
							type="password"
							placeholder="Mot de passe"/>
					<br />
				</div>
				);
	}
});

var Valider = React.createClass({
	notAvailable: function () {
		alert("Pas encore implémenté");
	},
	
	render: function () {
		return 	(
					<input 	className="btn btn-primary"
							type="button"
							onClick={this.notAvailable}
							value="Valider"/>
				);
	}
});

var Connexion = React.createClass({
	render: function () {
		return 	(
					<form class="form-group">
						<Email />
						<Mdp />
						<Valider />
						<br /><br />
						<a href="mdp_oublie">Mot de passe oublié?</a>
					</form>
				);
	}
});

ReactDOM.render(<Connexion />, document.getElementById("container"));