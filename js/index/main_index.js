var BtnShareTribe = React.createClass({
	render: function(){
		return (
			<a href="https://www.bigmeup.fr" className="btn btn-primary" title="Aller au ShareTribe">Aller sur l'espace de publication des annonces</a>
		);
	}
});

var BtnAdmin = React.createClass({
	render: function(){
		return (
			<a href="frontend/connexion.html" className="btn btn-primary" title="Aller à la plateforme d'administration">Aller sur mon espace administratif</a>
		);
	}
});

var ResearchBar = React.createClass({
	chercher: function () {
		var skill = $("#search_input").val();
		window.open("https://www.bigmeup.fr/?q=" + skill, "_blank");
	},
	
	render: function(){
		return(
			<form role="form">
				<div className="input-group">
					<input type="text" className="form-control" name="competence" id="search_input" placeholder="Compétences recherchées" />
					<div className="input-group-btn">
					<button className="btn btn-primary" type="submit" id="search_btn" onClick={this.chercher}>
						<i className="glyphicon glyphicon-search"></i>
					</button>
					</div>
				</div>
			</form>
		);
	}
});

var App = React.createClass({
	chercher: function () {
		var skill = document.getElementsByName("competence")[0].value;
		window.open("https://www.bigmeup.fr/?q=" + skill, "_blank");
	},
	
	render: function () {
		return (
			<div>
				<div className="">
					<a href="#"><img src="frontend/img/logoBMU_800x800.png" alt="logo" width="200" height="200" className="img img-responsive" /></a>
				</div>
				<ResearchBar />
				<div className="row text-center" style={{padding: "10px"}}>
					<span style={{padding: "10px"}}><BtnShareTribe /></span>
					<span style={{padding: "10px"}}><BtnAdmin /></span>
				</div>
			</div>
		);
	}
});

ReactDOM.render(<App />, document.getElementById('container'));