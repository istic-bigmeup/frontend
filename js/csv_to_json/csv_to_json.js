import React from 'react';
import ReactDOM from 'react-dom';

var objects;

var ReadFile = React.createClass({
    readFile:function(){
        var file = this.refs.file.files[0];
        var reader = new FileReader();
        reader.onload = function(evt){
             var resultText = evt.target.result;
             objects = this.csvToJson(resultText);
             console.log(objects);
        }.bind(this);
        var newFile = file.slice(0,5000);
        reader.readAsText(newFile); 
    },
    csvToJson:function(csvString){
        var Converter = require("csvtojson").Converter;
        var converter = new Converter({});
        converter.fromString(csvString, function(err,result){
           //When i console log the result it is working but when i return the result 
           // i am getting a undefined error
           //console.log(result);
           return result;
        });
    },
    render:function(){
      return (
         <input type="file" ref="file" onChange={this.readFile} /> 
      );
    }
});

ReactDOM.render(<ReadFile />,document.getElementById('container'));