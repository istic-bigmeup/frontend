


/**
 * ================== Déclaration des variables ================
 */
// Lecture des cookies

var cookiesTmp = document.cookie.split("; ");
var cookies = [];
for(var i = 0; i < cookiesTmp.length; i++){
    var key     = cookiesTmp[i].split("=")[0];
    var value   = cookiesTmp[i].split("=")[1];
    cookies[key] = value;
}

var client  = [];
var presta  = [];
var usr     = [];


/**
 * ================== Traitement ==================
 */
// Sets the ajax request
$.ajax({
    url: "http://bigmeup.istic.univ-rennes1.fr/api/front/getMissions.php?id_user=" + cookies["bmu_user_id"],
    async: false
}).done(function (data) {// When done
    // Parses the data from a JSON to an array
    data = JSON.parse(data);
    
    client = JSON.parse(data["client"]);
    usr = JSON.parse(data["usr"]);
    presta = JSON.parse(data["presta"]);

});

var Total_debit =0;
var Total_credit =0;
var montantDebit=0




/**
 * ========================================== ELEMENTS DU FORMULAIRE =====================================
 */


var montantDebit=0;
var montantCredit =0;
var Compte= React.createClass({

    totalCredit:function(){
                    var TotalCredit =0;
                    for (var i = 0; i < presta.length; i++) {
                        montantCredit= presta[i].quantite *presta[i].prix_unitaire_ht;
                        TotalCredit = TotalCredit+montantCredit;
                    };
                    return TotalCredit;
                },
    prestataire:function(){
                var returnPresta = [];
                 for (var i = 0; i < presta.length; i++) {
                              var montantCredit=0;
                              var commission = 0;
                                montantCredit= presta[i].quantite *presta[i].prix_unitaire_ht;
                                var commission= 0.15 * montantCredit;
                               returnPresta.push(
                                 <tr>
                                    <td>{presta[i].objet}</td>
                                     <td>{commission}</td>
                                    <td>{montantCredit}</td>
                                </tr>);
                                
                        };
                        return returnPresta;  
                    },
        resultat:function(){
                        var credit = this.totalCredit();
                        var debit = this.totalDebit();
                        var resultat = debit -credit;
                        return resultat;
                    },

        render: function() {
        //console.log(this.prestataire); 
                return (
                    <div>
                        <table className="table table-striped table-bordered" >
                            <thead>
                              <tr>
                                <th>Liblle</th>
                                <th>Débit</th>
                                <th>Crédit</th>
                              </tr>
                            </thead>
                            <tbody>
                                {this.prestataire()}

                                <tr>
                                    <td >Total</td>
                                    <td ></td>
                                    <td >{this.totalCredit()}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                   )
                }
            });

/**
 * L'affichage de la page de documents
 */
var Livre = React.createClass({
render: function() {
    return ( 
            <div className = "panel panel-primary" >
                <div className = "panel-heading" >
                    <h3 className = "panel-title text-center" >livre de compte</h3> 
                </div> 
                <div className = "panel-body" >
                    <Compte />
                </div> 
            </div>
        );
    }
});
ReactDOM.render( < Livre/ > , document.getElementById("container"));