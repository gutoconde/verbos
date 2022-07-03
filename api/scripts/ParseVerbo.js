'use strict';

const serviceFactory = require('../model/ServiceFactory');
const servicoIntegracao = require('../integracao/ServicoIntegracaoPortalLP');
const htmlParser = require('../util/HtmlParser');

require('dotenv').config();
var db = require("../integracao/Database.js");

module.exports.execute = async() => {    

        var verbo = 'relampejar';
        try {
            var resposta = await servicoIntegracao.listarConjugacoes(verbo);
            console.log(resposta.conjugacao);
            //serviceFactory.getServicoConjugacao(db).salvarConjugacao(resposta);
            
            
        } catch(error) {
            console.error(error);
        }
   return;
};

this.execute();






