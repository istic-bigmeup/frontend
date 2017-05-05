
/**
 * ================== LIVRE DES COMPTES================
 *
    Le livre de compte est un recapitulatif des prestations effectuées par le l'utilisateur
    Chaque mission est constituée d'une commission de BigMeUp et du revenu réalisé par le prestataire.
    Les proportions sont faites selon le profil de l'utilisateur:
    -membre de la French Tach la commission BigMeUp est de 7.5%
    -non membre de la French Tech la commission BigMeUp est 15% 
 * =====================================================================
 */

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
// declaration des tableaux   
var client  = [];
var presta  = [];
var usr     = [];


/**
 * ================== Traitement ==================
 */
// Sets the ajax request
$.ajax({
    url: "http://administration.bigmeup.fr/api/front/getMissions.php?id_user=" + cookies["bmu_user_id"],
    async: false
}).done(function (data) {// When done
    // Parses the data from a JSON to an array
    data = JSON.parse(data);
    // chargement des tableaux des données des cookies
    client = JSON.parse(data["client"]);
    usr = JSON.parse(data["usr"]);
    presta = JSON.parse(data["presta"]);

});




/**
 * ========================================== ELEMENTS DE LA PAGE =====================================
 */

  var Total = React.createClass({
render: function() {
    return ( 
                <div className = "label label-default" >
                    Total
                </div> 
        );
    }
});
 var Total_commission = React.createClass({
    totalCommission:function(){
            var TotalCommission =0;
                // on cherche le profil de l'utilisateur 
                for (var i = 0; i < usr.length; i++) {
                // on 
                    if (usr[i]._id.$id == cookies["bmu_user_id"]) {

                        if (usr[i].french_tech == 1) {
                           // s'il est membre de la French Tech
                            var pourcentage= 0.075;
                        }else{
                            // sinon
                            var pourcentage= 0.15;
                        };
                    };                   
                };
                // on parcours le tableau presta et calculer la commission BigMeUp
                for (var i = 0; i < presta.length; i++) {
                    montantCredit= presta[i].quantite *presta[i].prix_unitaire_ht*pourcentage;
                    TotalCommission = TotalCommission+montantCredit;
                };
                
                TotalCommission=new Intl.NumberFormat().format(TotalCommission);
                return TotalCommission;
            },
render: function() {
    return ( 
            
                <div className = "label label-default" >
                    {this.totalCommission()}
                </div> 
            
        );
    }
});

 var Total_revenu = React.createClass({
     totalRevenu:function(){
            var totalRevenu =0;
            for (var i = 0; i < usr.length; i++) {
                
                if (usr[i]._id.$id == cookies["bmu_user_id"]) {
                    if (usr[i].french_tech == 1) {
                       // s'il est membre de la French Tech
                        var pourcentage= 0.075;
                    }else{
                        // sinon
                        var pourcentage= 0.15;
                    };
                };                   
            };
            for (var i = 0; i < presta.length; i++) {
                montantCredit= presta[i].quantite *presta[i].prix_unitaire_ht*(1-pourcentage);
                totalRevenu = totalRevenu+montantCredit;
            };
            // la fonction Intl.NumberFormat().format() permet de separer les chiffres par millier
            totalRevenu=new Intl.NumberFormat().format(totalRevenu);
            return totalRevenu;
        },
render: function() {
    return ( 
            
                <div className = "label label-default" >
                    {this.totalRevenu()}
                </div> 
            
        );
    }
});

var montantDebit=0;
var montantCredit =0;
var Compte= React.createClass({
    // Calcul des revenus du prestataire sur chaque mission
    prestataire:function(){
                var returnPresta = [];
                for (var i = 0; i < usr.length; i++) {
                    
                    if (usr[i]._id.$id == cookies["bmu_user_id"]) {
                        if (usr[i].french_tech == 1) {
                           
                            var pourcentage= 0.075;
                        }else{
                            var pourcentage= 0.15;
                        };
                    };                   
                };
                for (var i = 0; i < presta.length; i++) {
                var montantCredit=0;
                var commission = 0;
                montantCredit= presta[i].quantite *presta[i].prix_unitaire_ht;
                var commission= pourcentage * montantCredit;
                montantCredit= (1 - pourcentage) * montantCredit;
                // construction du tableau dans la variable returnPresta
                returnPresta.push(
                    <tr key={i}>
                        <td>{presta[i].date_fin}</td>
                        <td>{presta[i].objet}</td>
                        <td>{commission}</td>
                        <td>{montantCredit}</td>
                    </tr>);
                                
                };
                return returnPresta;  
                },

        render: function() {
                return (
                    <div>
                        <table id="tab_compte" className="table table-striped">
                            <thead>
                             <tr>
                                <th>Date de mission</th>
                                <th>Objet de la mission</th>
                                <th>Commission BigMeUp</th>
                                <th>Revenu</th>
                              </tr>
                            </thead>
                            <tbody>
                                {this.prestataire()}
                                <tr>
                                    <td></td>
                                    <td><Total/></td>
                                    <td><Total_commission/></td> 
                                    <td ><Total_revenu/></td> 
                                </tr>
                            </tbody>
                            <tfoot>
                              <tr>
                                <th>Date de mission</th>
                                <th>Objet de la mission</th>
                                <th>Commission BigMeUp</th>
                                <th>Revenu</th>
                              </tr>
                            </tfoot>
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
                    <h3 className = "panel-title text-center" >Livre de compte de vos prestations</h3> 
                </div> 
                <div className = "panel-body" >
                    <Compte />
                </div> 
            </div>
        );
    }
});

// affichage var Livre dans le container de la page dédiée livre_mission.html
ReactDOM.render( < Livre/ > , document.getElementById("container"));

// configuration de datatable au format français
$(document).ready(function() {
    $('#tab_compte').DataTable({
        "language": {
            "url": "//cdn.datatables.net/plug-ins/1.10.15/i18n/French.json"
        }
    });
});

