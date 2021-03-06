'use strict';

const axios = require('axios');
const htmlParser = require('../util/HtmlParser');

class ServicoIntegracaoPortalLP {

    static async listarConjugacoes(verbo) {
        const url = await ServicoIntegracaoPortalLP.recuperarURLDeConsulta(verbo);
        return await ServicoIntegracaoPortalLP.recuperaConjugacao(url);
    }

    static async recuperaConjugacao(url) {
        var result = null;
        if(url) {
            const options = {
                method: 'GET',
                headers: { 'content-type': 'text/html', 'Accept-Charset': 'UTF-8' },
                url: url,
            };
            const resposta = await axios(options);
            result = htmlParser.parse(resposta.data);
        }
        return result;
    }

    static async recuperarURLDeConsulta(verbo) {
        var urlBase = 'http://www.portaldalinguaportuguesa.org/advanced.php';
        const params = {
            'action': 'search',
            'act': 'advanced',
            'lemmasel': 'exact',
            'lemmaquery': verbo,
            'restrict': 'VRB',
            'sumbmit': 'Pesquisa'
        };
        const options = {
            method: 'POST',
            headers: { 'content-type': 'application/x-www-form-urlencoded', 'Accept': 'text/html', 'Accept-Charset': 'UTF-8' },
            url: urlBase,
            params
        };
        const resposta = await axios(options);
        var getParams = htmlParser.parseParametros(resposta.data);
        
        if(getParams === null) {
            getParams = await ServicoIntegracaoPortalLP.recuperarURLDeMaisDeUmResultado(resposta.data);
            if(getParams === null) {
                return null;
            }
        }
        return urlBase + getParams;
    }

    static recuperarURLDeMaisDeUmResultado(html) {
        return htmlParser.parseParametrosMaisDeUmResultado(html);
    }

    static async recuperarURLsPorIndice(indice) {
        var urlBase = 'http://www.portaldalinguaportuguesa.org/advanced.php';
        const params = {
            'wordformsel': 'exact',
            'wordformquery': '',
            'lemmasel': 'exact',
            'lemmaquery': '',
            'restrict': 'VRB',
            'gender': '',
            'show': 'list',
            'action': 'search',
            'act': 'advanced',
            'start': indice
        };

        const options = {
            method: 'GET',
            url: urlBase,
            params
        };
        const resposta = await axios(options);
        
        return resposta;
    }
};

module.exports = ServicoIntegracaoPortalLP;