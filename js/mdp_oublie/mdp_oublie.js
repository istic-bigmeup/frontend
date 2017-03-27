var token;

var NewPwdInput = React.createClass({
    getInitialState: function(){
        return {
            value: "",
            inputClass: ""
        }
    },

    handleInputChange: function (event) {
        const _target = event.target;
        const _value = _target.type === 'checkbox' ? _target.checked : _target.value;
        const _name = _target.name;

        this.setState({
            value: _value
        });
    },

    handleBlur: function (event) {
        var confirmInputValue = $("#confirmValue").val();
        var newTextBox = $("#newTextBox");
        var confTextBox = $("#confTextBox");

        if (this.state.value == confirmInputValue) {
            newTextBox.hide();
            confTextBox.hide();
        }
        else{
            newTextBox.show();
            confTextBox.show();
        } 
    },

    render: function(){
        return (
            <div className="form-group row">
                <label htmlFor="newValue" className="col-2 col-form-label">Mot de passe</label>
                <div className="col-10">
                    <input type="password" name="newValue" id="newValue" className={"form-control " + this.state.inputClass} value={this.state.value} onChange={this.handleInputChange} onBlur={this.handleBlur} required />
                    <small className="form-text text-muted" id="newTextBox" style={{ display: "none" }}>Les mots de passe ne correspondent pas.</small>
                </div>
            </div>
        )
    }
});

var ConfirmInput = React.createClass({
    getInitialState: function(){
        return {
            value: "",
            inputClass: ""
        }
    },

    handleInputChange: function (event) {
        const _target = event.target;
        const _value = _target.type === 'checkbox' ? _target.checked : _target.value;
        const _name = _target.name;

        this.setState({
            value: _value
        });
    },

    handleBlur: function (event) {
        var newPwdInputValue = $("#newValue").val();
        var confTextBox = $("#confTextBox");
        var newTextBox = $("#newTextBox");

        if (this.state.value == newPwdInputValue) {
            newTextBox.hide();
            confTextBox.hide();
        }
        else{
            newTextBox.show();
            confTextBox.show();
        } 
    },

    render: function(){
        return (
            <div className="form-group row">
                <label htmlFor="confirmValue" className="col-2 col-form-label">Confirmation</label>
                <div className="col-10">
                    <input type="password" name="confirmValue" id="confirmValue" className={"form-control " + this.state.inputClass} value={this.state.value} onChange={this.handleInputChange} onBlur={this.handleBlur} required />
                    <small className="form-text text-muted" id="confTextBox" style={{ display: "none" }}>Les mots de passe ne correspondent pas.</small>
                </div>
            </div>
        )
    }
});

var BtnSubmit = React.createClass({

    handleClick: function (event) {
        event.preventDefault();
        submit();
    },

    render: function(){
        return (
                <input type="submit" name="submit" id="submit" value="Valider" className="btn btn-info pull-right" onClick={this.handleClick} />
        )
    }
});

var MdpOublie = React.createClass({
	render: function () {
		return 	(
					<form onSubmit={this.handleSubmit} className="form-group" role="form">
						<NewPwdInput />
						<ConfirmInput />
						<BtnSubmit />
					</form>
				);
	}
});

ReactDOM.render(<MdpOublie />, document.getElementById("container"));

/**
 * Submit the form
 * 
 */
function submit(){
    var newPwdInputValue = $("#newValue").val();
    var confirmInputValue = $("#confirmValue").val();
    var confTextBox = $("#confTextBox");
    var newTextBox = $("#newTextBox");
    var alertBoxError = $("#alertBoxError");
    
    //Définition des données à envoyer au serveur
	var token = getURLParam("t");
    var data = "token=" + token + "&mdp=" + newPwdInputValue;

    if(newPwdInputValue == confirmInputValue){
        $.ajax({
            url : "http://bigmeup.istic.univ-rennes1.fr/api/front/updateUser.php",
            type : 'POST',
            data : data
        }).done(function(response){
				// Parses the data from a JSON to an array
				data = JSON.parse(response);

				if(data["response"] == "true"){
                    document.location = "connexion.html";
                }
                else{
                    console.log("Enregistrement echoué !")
                    alertBoxError.show();
                }
        });
    }
    else{
        alertBoxError.show();
        newTextBox.show();
        confTextBox.show();
    } 
}

/**
 * Return all or the specified parameter of the url
 * 
 * @param {any} param 
 * @returns 
 */
function getURLParam(param) {
	var vars = {};
	window.location.href.replace( location.hash, '' ).replace( 
		/[?&]+([^=&]+)=?([^&]*)?/gi, // regexp
		function( m, key, value ) { // callback
			vars[key] = value !== undefined ? value : '';
		}
	);

	if ( param ) {
		return vars[param] ? vars[param] : null;	
	}
	return vars;
}