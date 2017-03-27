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

/**
 * Champs texte
 */
var InfoItem = React.createClass({
    render: function(){
        return (
            <li>
                <span className="">{this.props.label}: </span>
                <span className="">{this.props.data}</span>
            </li>
        )
    }
});

/**
 * Bouton de redirection vers un document
 */
var DocumentButton = React.createClass({
    handleClick: function(){
        alert("Developpement en cours");
    },
    
    render: function(){
        return (
            <button type="button" className={"btn btn-sm " + this.props.class} onClick={this.handleClick}>{this.props.label}</button>
        )
    }
});

/**
 * Bouton d'édition de la mission
 */
var EditButton = React.createClass({
    handleClick: function(){
        alert("Developpement en cours");
    },
    
    render: function(){
        return (
            <button type="button" className="btn btn-sm btn-warning" onClick={this.handleClick}>Editer</button>
        )
    }
});

/**
 * Container de présentation de la facture
 */
var Container = React.createClass({
    getInitialState: function () {
        return {
            missonLoading: true,
            missionData: '',
            missionError: '',
            clientLoading: false, 
            clientData: '',
            prestaLoading: false, 
            prestaData: ''
        };
    },

    componentDidMount: function () {
        var that = this;
        this.props.promise
            .done(function(response) {
                that.setState({ 
                    missonLoading: false, 
                    missionData: response[0] 
                });

                that.getClient(response[0].id_client);
                that.getPrestataire(response[0].id_prestataire);
            })
            .fail(function(error){
                that.setState({ 
                    missonLoading: false, 
                    missionError: error
                });
            });
    },

    getClient : function(id_client){
        var url = ('../../api/front/getUser.php?id=') + id_client;
        var that = this;
        $.getJSON(url)
            .done(function( response ) {
                that.setState({ clientLoading: false, clientData: response[0] });
            })
            .fail(function( jqxhr, textStatus, error ) {
                var err = textStatus + ", " + error;
                console.log( "Client request failed: " + err );
        });
    },

    getPrestataire : function(id_prestataire){
        var url = ('../../api/front/getUser.php?id=') + id_prestataire;
        var that = this;
        $.getJSON(url)
            .done(function( response ) {
                that.setState({ prestaLoading: false, prestaData: response[0] });
            })
            .fail(function( jqxhr, textStatus, error ) {
                var err = textStatus + ", " + error;
                console.log( "Prestataire request failed: " + err );
        });
    },

    render: function () {
        return (
            <div>
                <ul>
                    <InfoItem label="Client" data={this.state.clientData.nom_entreprise} />
                    <InfoItem label="Prestataire" data={this.state.prestaData.nom + " " + this.state.prestaData.prenom} />
                    <InfoItem label="Objet" data={this.state.missionData.objet} />
                    <InfoItem label="Montant/jour" data={this.state.missionData.prix_unitaire_ht} />
                    <InfoItem label="Nombre de jour" data={this.state.missionData.quantite} />
                    <InfoItem label="Date de début" data={this.state.missionData.date_debut} />
                    <InfoItem label="Date de fin" data={this.state.missionData.date_fin} />
                    <InfoItem label="Lieu de la mission" data={this.state.missionData.lieu_mission} />
                    <InfoItem label="Status" data={this.state.missionData.status} />
                    <InfoItem label="Validation du client" data={(this.state.missionData.validation_client) ? 'oui' : 'non'} />
                    <InfoItem label="Validation du prestataire" data={(this.state.missionData.validation_prestataire) ? 'oui' : 'non'} />
                    <InfoItem label="Autres frais liés" data={this.state.missionData.autres_frais} />
                    <InfoItem label="Lieu de la mission" data={this.state.missionData.lieu_mission} />
                    <InfoItem label="Lieu de la mission" data={this.state.missionData.lieu_mission} />
                    <InfoItem label="Clauses particulières" data={this.state.missionData.clause} />
                </ul>
                <DocumentButton label="Facture" class="btn-primary" id={this.state.missionData.facture} uri="" />
                <DocumentButton label="Devis" class="btn-info" id={this.state.missionData.devis} uri="" />
                <EditButton />
            </div>
        );
    }
});

var userId = getCookie("bmu_user_id");
//userId = "58b8adac8333d039d71c2e94";
var url = 'http://bigmeup.istic.univ-rennes1.fr/api/front/getMission.php?id=' + userId;

ReactDOM.render(<Container promise={$.getJSON(url)} />,
    document.getElementById("container"));