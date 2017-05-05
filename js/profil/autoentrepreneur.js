



/**
 * ========================================== ELEMENTS DU FORMULAIRE =====================================
 */
var Question_1 = React.createClass({
    oui: function(){
        
        document.getElementsByName("bouton_1")[0].innerHTML = "Hello ";
    },
    
    render: function () {
        return  (
                    <div>
                        <p>Question 1</p>
                        
                        <div>
                        <select name="lieu_select" className="form-control" onChange={this.selectChanged1}>
                            <optgroup label="Entreprise cliente">
                                <option value="client">Locaux du client</option>
                            </optgroup>
                            <optgroup label="Autre">
                                <option value="autre">Autre (à préciser)</option>
                            </optgroup>
                        </select>
                        <button onclick={this.selectChanged}>non</button>
                        <button onclick={this.oui}>oui</button>
                        <span name="bouton_1"> </span>
                        
                        <br/>
                        
                        <input  className="form-control" 
                                type="text" 
                                placeholder="A préciser (facultatif)" 
                                value=""
                                style={{display: "none"}} 
                                name="lieu_input" />
                    </div>
                        
                        <p  id="err_lieu_input" 
                            className="text-warning" 
                            style={{display: "none"}}>
                                Veuillez renseigner le lieu du déroulement de la mission
                        </p>
                        
                        <br/>
                    </div>
                );
    }
});  

var Question_2 = React.createClass({
    selectChanged: function(){
        var select = document.getElementsByName("lieu_select")[0];
        document.getElementsByName("code")[0].style.display =     (
                                                                            select.value == "autre" ?
                                                                            "block" : "none"
                                                                        )
    },
    
    render: function () {
        return  (
                    <div className= "row">
                        <div className="col-md-8">Question</div>
                        
                        <div className="col-md-2">
                        <select name="lieu_select" className="form-control" onChange={this.selectChanged}>
                                <option value=""></option>
                                <option value="oui">NON</option>
                                <option value="autre">OUI</option> 
                        </select>
                        </div>
                        
                        <br/>
                        <div className="col-md-12">
                        <input  className="form-control" 
                                type="text" 
                                placeholder="Votre code" 
                                value=""
                                style={{display: "none"}} 
                                name="code" />
                        </div>
                        
                        <p  id="err_lieu_input" 
                            className="text-warning" 
                            style={{display: "none"}}>
                                Veuillez renseigner le lieu du déroulement de la mission
                        </p>
                        
                        <br/>
                    </div>
                );
    }
});  


/**
 * L'affichage de la page de documents
 */
        var Declaration= React.createClass({
        render: function() {

        return ( 
            <div className = "panel panel-primary" >
           
                <div className = "panel-heading" >
                     <h3 className = "panel-title text-center" > Aide à la déclaration</h3> 
                </div> 
                
                <div className = "panel-body" >
                <div className = "row" >
                  
                    <Question_2 />
                </div>    
            </div> 
        < /div>
                );
        }
        });
        ReactDOM.render( < Declaration / > , document.getElementById("container"));