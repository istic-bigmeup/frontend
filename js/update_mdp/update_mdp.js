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
}

//Get the user id
var userId = getCookie("bmu_user_id");
var testOldMdp = false;

var OldPwdInput = React.createClass({
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
        var mdp = this.state.value;
        var oldTextBox = $("#oldTextBox");

		$.ajax({
			url: "http://bigmeup.istic.univ-rennes1.fr/api/front/getUser.php?id=" + userId + "&mdp=" + mdp
		}).done(function (data) {// When done
			// Parses the data from a JSON to an array
			data = JSON.parse(data);

			// Controls the answer of the API
			if (data["answer"] == "true") {
                oldTextBox.hide();
                testOldMdp = true;
			}
            else{
                oldTextBox.show();
                testOldMdp = false;
            } 

            console.table(data);
		});
    },

    render: function(){
        return (
            <div className="form-group row">
                <label htmlFor="oldValue" className="col-2 col-form-label">Actuel</label>
                <div className="col-10">
                    <input type="password" name="oldValue" id="oldValue" className={"form-control " + this.state.inputClass} value={this.state.value} onChange={this.handleInputChange} onBlur={this.handleBlur} required />
                    <small className="form-text text-muted" id="oldTextBox" style={{ display: "none" }}>Mot de passe erroné !</small>
                </div>
            </div>
        )
    }

});

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
                <label htmlFor="newValue" className="col-2 col-form-label">Nouveau</label>
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

var AlertBoxSuccess = React.createClass({
    render: function(){
        return (
            <div className="alert alert-success alert-dismissible fade hide" id="alertBoxSucces" role="alert" style={{ display: "none" }}>
                <button type="button" className="close" data-dismiss="alert" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
                <strong>Succès!</strong> Modification effectuée avec succès.
            </div>            
        )
    }
});

var AlertBoxError = React.createClass({
    render: function(){
        return (
            <div className="alert alert-danger alert-dismissible fade hide" id="alertBoxError" role="alert" style={{ display: "none" }}>
                <button type="submit" className="close" data-dismiss="alert" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
                <strong>Attention !</strong> Modification non effectuée. Veuillez reéssayer.
            </div>            
        )
    }
});

var Form = React.createClass({

    handleSubmit: function (event) { 
        event.preventDefault();
        submit();
    },

    render: function () {
        return (
            <form onSubmit={this.handleSubmit} className="form-group" role="form">
                <AlertBoxSuccess />
                <AlertBoxError />
                <OldPwdInput />
                <fieldset>
                    <NewPwdInput />
                    <ConfirmInput />
                </fieldset>
                <BtnSubmit />
            </form>
        );
    }
});

ReactDOM.render(
    <Form />,
    document.getElementById("container")
);

function submit(){
    var newPwdInputValue = $("#newValue").val();
    var confirmInputValue = $("#confirmValue").val();
    var confTextBox = $("#confTextBox");
    var newTextBox = $("#newTextBox");
    var oldTextBox = $("#oldTextBox");
    var alertBoxSucces = $("#alertBoxSuccess");
    var alertBoxError = $("#alertBoxError");
    
    //Définition des données à envoyer au serveur
    var data = "id=" + userId + "&mdp=" + newPwdInputValue;

    if((newPwdInputValue == confirmInputValue) && testOldMdp ){
        $.ajax({
            url : "http://bigmeup.istic.univ-rennes1.fr/api/front/updateUser.php",
            type : 'POST',
            data : data
        }).done(function(response){
				// Parses the data from a JSON to an array
				data = JSON.parse(response);

				if(data["response"] == "true"){
                    console.info(response);
                    console.log("Enregistrement effectué !");

                    alertBoxSucces.show();
                    alertBoxError.hide();
                    newTextBox.hide();
                    confTextBox.hide();
					alert("Mot de passe modifié");
					window.location = "index.html";
                }
                else{
                    console.log("Enregistrement echoué !");
					alert("Erreur dans la modification de mot de passe");
                }
        });
    }
    else{
        alertBoxSucces.hide();
        alertBoxError.show();
        newTextBox.show();
        confTextBox.show();
    } 
}