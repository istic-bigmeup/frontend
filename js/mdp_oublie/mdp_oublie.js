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

var Valider = React.createClass({
	notAvailable: function () {
		alert("Pas encore implémenté");
	},
	
	render: function () {
		return 	(
					<div>
						<input 	className="btn btn-primary"
								type="button"
								value="Envoyer"
								onClick={this.notAvailable}/>
					</div>
				)
	}
});

var MdpOublie = React.createClass({
	render: function () {
		return 	(
					<form className="form-group">
						<Email />
						<Valider />
					</form>
				);
	}
});

ReactDOM.render(<MdpOublie />, document.getElementById("container"));