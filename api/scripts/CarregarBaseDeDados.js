'use strict';

const serviceFactory = require('../model/ServiceFactory');
const servicoIntegracao = require('../integracao/ServicoIntegracaoPortalLP');
const htmlParser = require('../util/HtmlParser');

require('dotenv').config();
console.log('banco de dados : ' + process.env.VERBOS_DBSOURCE);
var db = require("../integracao/Database.js");

module.exports.execute = async() => {    

        var index = 0;
        do {
            try {
                console.log('Consultando lista de verbos - index : ' + index);
                var resposta = await servicoIntegracao.recuperarURLsPorIndice(index);
                var resultado = htmlParser.parseUrls(resposta.data);
                var queryParams = htmlParser.parseQueryString(resultado.proximo);
                for(var i = 0; i< resultado.links.length; i++)  {
                    var resultadoVerbo = await servicoIntegracao.recuperaConjugacao(resultado.links[i]);
                    serviceFactory.getServicoConjugacao(db).salvarConjugacao(resultadoVerbo);
                    console.log('verbo ' + resultadoVerbo.verbo + ' carregado.');
                }
                index = parseInt(queryParams.start);
            } catch(error) {
                console.error(error);
            }
            
        } while(index <= 14518);
        console.log('Banco de dados carregado.');
   return;
};

this.execute();






