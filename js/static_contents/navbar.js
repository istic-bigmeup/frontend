var Navbar = React.createClass({	
	render: function () {
		var connecte = false;
		
		return (
			<nav className="navbar navbar-default">
				<div className="collapse navbar-collapse">
					<a className="navbar-brand" href="index.html">BigMeUp</a>
					<ul className="nav navbar-nav">
						{connecte ? "" : <li><a href="inscription.html">Inscription</a></li>}
						{connecte ? "" : <li><a href="connexion.html">Connexion</a></li>}
						{connecte ? <li><a href="historiques.html">Historiques</a></li> : ""}
						{connecte ? <li><a href="profil.html">Profil</a></li> : ""}
					</ul>
				</div>
			</nav>
		);
	}
});

ReactDOM.render(<Navbar />, document.getElementById("navbar"));