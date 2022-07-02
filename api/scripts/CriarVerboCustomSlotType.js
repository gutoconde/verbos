'use strict';

const serviceFactory = require('../model/ServiceFactory');
const fs = require('fs');

require('dotenv').config();
console.log('banco de dados : ' + process.env.VERBOS_DBSOURCE);
var db = require("../integracao/Database.js");

module.exports.execute = async() => {    

        
    try {
        console.log('Consultando lista de verbos...');
        var verbos = await serviceFactory.getRepositorioVerbo(db).listarVerbos();
        var slotType = {
            "name": "VERBO",
            "values": []
        };
        for(var i = 0; i< verbos.length; i++)  {
            var slotValue = {
                "id" : verbos[i].codigo,
                "name" : {
                    "value": verbos[i].descricao
                }
            }
            if(verbos[i].descricao.indexOf('-') > 0) {
                var sinonimo = verbos[i].descricao.replace('-', ' ');
                slotValue.name.synonyms = [sinonimo];
            }
            slotType.values.push(slotValue);
        }
        var jsonContent = JSON.stringify(slotType);
        console.log(jsonContent);

        fs.writeFile("./alexa-skill/VerboSlot.json", jsonContent, 'utf8', function (err) {
            if (err) {
                console.log("An error occured while writing JSON Object to File.");
                return console.log(err);
            }
            console.log("JSON file has been saved.");
        });
    } catch(error) {
        console.error(error);
    }
   return;
};

this.execute();






