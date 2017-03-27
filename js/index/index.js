var BoxLogin = React.createClass({
	disconnect: function(){
		var date = new Date();
		date.setTime(date.getTime() - (1*24*60*60*1000));

		// Sets the cookie
		document.cookie = "bmu_connecte=true; expires=" + date + "; path=/";
		document.cookie = "bmu_user_id=0; expires=" + date + "; path=/";
		document.cookie = "bmu_admin_id=0; expires=" + date + "; path=/";

		// Redirects to profil.html
		document.location = "../index.html";
	},

	render: function(){
		return (
			<div className="col-lg-4 tile tile1">
				<h2><a href="#" className="display-2" onClick={this.disconnect}>Me Deconnecter</a></h2>
			</div>
		);
	}
});

var BoxMission = React.createClass({
	render: function(){
		return (
			<div className="col-lg-4 tile tile1">
				<h1><a href="missions.html" className="display-2">Mes missions</a></h1>
			</div>
		);
	}
});

var BoxProfil = React.createClass({
	render: function(){
		return (
			<div className="col-lg-4 tile tile1">
				<h1><a href="profil.html" className="display-2">Mon Profil</a></h1>
			</div>
		);
	}
});

var BoxCompta = React.createClass({
	render: function(){
		return (
			<div className="col-lg-4 tile tile1">
				<h1><a href="livre_compte.html" className="display-2">Mon livre de compte</a></h1>
			</div>
		);
	}
});


var ExampleApplication = React.createClass({

	render: function () {
		return (
			<div>
				<BoxCompta />
				<BoxProfil />
				<BoxMission />
				<BoxLogin />
			</div>
		);
	}
  });

ReactDOM.render(<ExampleApplication />, document.getElementById('container'));