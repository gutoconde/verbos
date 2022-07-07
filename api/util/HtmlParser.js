'use strict';

const jsdom = require("jsdom");
const { JSDOM } = jsdom;

class HtmlParser {

    static parse(html) {
        var resultadoVerbo = {
            verbo: null,
            conjugacao: []
        };
        
        var modos = ['INDICATIVO', 'SUBJUNTIVO'];
        
        var temposDoInticativo = ['PRESENTE', 'PRETERITO_IMPERFEITO',
            'PRETERITO_PERFEITO', 'PRETERITO_MAIS_QUE_PERFEITO',
            'FUTURO_DO_PRESENTE', 'FUTURO_DO_PRETERITO'];

        var temposSubjuntivo = ['PRESENTE_DO_SUBJUNTIVO',
            'PRETERITO_IMPERFEITO_DO_SUBJUNTIVO',
            'FUTURO_DO_SUBJUNTIVO' ];

        var formasNominais = [
            'IMPERATIVO_AFIRMATIVO', 'IMPERATIVO_NEGATIVO', 
            'INFINITIVO_PESSOAL', 'INFINITIVO_IMPESSOAL', 
            'GERUNDIO', 'PARTICIPIO_PASSADO'];
        
        try {
            const dom = new JSDOM(html);
            const title = dom.window.document.title;
            const maintd = dom.window.document.getElementById('maintext');
            const trIndicativo = maintd.querySelectorAll('tr')[0];
            const trTempos = maintd.querySelectorAll('tr')[2]
            const tdTempos = trTempos.querySelectorAll('td');

            resultadoVerbo.verbo = title.split(' ')[0].trim();
            
            for (var j = 0; j < tdTempos.length; j++) {
                var item = {
                    modo: modos[0],
                    tempo: temposDoInticativo[j],
                    verbos: [],
                };
                const brs = tdTempos[j].childNodes;
                for(var i = 0; i < brs.length; i++) {
                    if(brs[i] && brs[i].nodeType === brs[i].TEXT_NODE && brs[i].nodeValue.trim() !== '') {
                        var texto = brs[i].nodeValue.split('/')[0].trim();
                        texto = texto.replace(/(\r\n|\n|\r|\t)/gm, '');
                        texto = texto && texto.trim() !== '' && texto.trim() !== '-' ? texto : null; 
                        item.verbos.push(texto);
                    }
                }
                resultadoVerbo.conjugacao.push(item);
            }

            const trTemposSubjuntivo = maintd.querySelectorAll('tr')[5];
            const tdTemposSubjuntivo = trTemposSubjuntivo.querySelectorAll('td');

            for (var j = 0; j < temposSubjuntivo.length; j++) {
                var item = {
                    modo: modos[1],
                    tempo: temposSubjuntivo[j],
                    verbos: [],
                };
                const brs = tdTemposSubjuntivo[j].childNodes;
                for(var i = 0; i < brs.length; i++) {
                    if(brs[i] && brs[i].nodeType === brs[i].TEXT_NODE && brs[i].nodeValue.trim() !== '') {
                        var texto = brs[i].nodeValue.split('/')[0].trim();
                        texto = texto.replace(/(\r\n|\n|\r|\t)/gm, '');
                        texto = texto && texto.trim() !== '' && texto.trim() !== '-' ? texto : null; 
                        item.verbos.push(texto);
                    }
                }
                resultadoVerbo.conjugacao.push(item);
            }

            const tdImperativo = tdTemposSubjuntivo[3];
            var itemImperativoAfirmativo = {
                modo: null,
                tempo: formasNominais[0],
                verbos: [],
            };
            var itemImperativoNegativo = {
                modo: null,
                tempo: formasNominais[1],
                verbos: [],
            };
            var brs = tdImperativo.childNodes;
            for(var i = 0; i < brs.length; i++) {
                if(brs[i] && brs[i].nodeType === brs[i].TEXT_NODE && brs[i].nodeValue.trim() !== '') {
                    var va = null;
                    var vn = null;
                    var v = brs[i].nodeValue.replace(/(\r\n|\n|\r|\t)/gm, '').trim();
                    if(v !== '-' && v !== '- (-)') {
                        va = v.split(' ')[0];
                        var m = v.match(/\(([^)]+)\)/);
                        vn = m ? m[1] : v;
                    }
                    itemImperativoAfirmativo.verbos.push(va);
                    itemImperativoNegativo.verbos.push(vn); 
                }
            }
            resultadoVerbo.conjugacao.push(itemImperativoAfirmativo);
            resultadoVerbo.conjugacao.push(itemImperativoNegativo);

            const trInfinitivo = maintd.querySelectorAll('tr')[4];
            const tdsInfinitivo = trInfinitivo.querySelectorAll('td')[4];
            var itemInfinitivo = {
                modo: null,
                tempo: formasNominais[3],
                verbos: [],
            };
            
            if(tdsInfinitivo.textContent) {
                var texto = tdsInfinitivo.textContent.split('/')[0].trim();
                texto = texto.replace(/(\r\n|\n|\r|\t)/gm, '');
                texto = texto && texto.trim() !== '' && texto.trim() !== '-' ? texto : null; 
                itemInfinitivo.verbos.push(texto);
            }
            resultadoVerbo.conjugacao.push(itemInfinitivo);

            const tdInfinitivoPessoal = tdTemposSubjuntivo[4];
            var itemInfinitivoPessoal = {
                modo: null,
                tempo: formasNominais[2],
                verbos: [],
            };
            
            brs = tdInfinitivoPessoal.childNodes;
            for(var i = 0; i < brs.length; i++) {
                if(brs[i] && brs[i].nodeType === brs[i].TEXT_NODE && brs[i].nodeValue.trim() !== '') {
                    var texto = brs[i].nodeValue.split('/')[0].trim();
                    texto = texto.replace(/(\r\n|\n|\r|\t)/gm, '');
                    texto = texto && texto.trim() !== '' && texto.trim() !== '-' ? texto : null; 
                    itemInfinitivoPessoal.verbos.push(texto);
                }
            }
            resultadoVerbo.conjugacao.push(itemInfinitivoPessoal);

            const tdGerundio = tdTemposSubjuntivo[5];
            var itemGerundio = {
                modo: null,
                tempo: formasNominais[4],
                verbos: []
            };
            brs = tdGerundio.childNodes;
            if(brs[0] && brs[0].nodeType === brs[0].TEXT_NODE && brs[0].nodeValue.trim() !== '') {
                var texto = brs[0].nodeValue.split('/')[0].trim();
                texto = texto.replace(/(\r\n|\n|\r|\t)/gm, '');
                texto = texto && texto.trim() !== '' && texto.trim() !== '-' ? texto : null; 
                itemGerundio.verbos.push(texto);
            }
            resultadoVerbo.conjugacao.push(itemGerundio);
            
            const tableParticioPassado = maintd.querySelectorAll('table')[1];
            const tdsParticioPassado = tableParticioPassado.querySelectorAll('td');
            
            var itemParticipioPassado = {
                modo: null,
                tempo: formasNominais[5],
                verbos: [],
                verbosAlternativos: [],
            };
            for(var i = 0; i < tdsParticioPassado.length; i++) {
                if(tdsParticioPassado[i].textContent) {
                    var v = tdsParticioPassado[i].textContent.replace(/(\r\n|\n|\r|\t)/gm, '');
                    var vs = v.split('/');
                    itemParticipioPassado.verbos.push(vs[0].trim());
                    if(vs.length > 1) {
                        itemParticipioPassado.verbosAlternativos.push(vs[1].trim());
                    }
                    
                }
            }
            resultadoVerbo.conjugacao.push(itemParticipioPassado);
            
        } catch(error) {
            throw error;
        }
        return resultadoVerbo;
    }

    static parseParametros(html) {
        var getParams = null;
        const dom = new JSDOM(html);
        const tag = dom.window.document.querySelector('script');
        if(tag) {
            const text = tag.textContent;
            var matches = text.match(/\'(.*?)\'/);
            if (matches) {
                getParams = matches[1];
            }
        }
        return getParams;
    }

    static parseParametrosMaisDeUmResultado(html) {
        var getParams = null;
        const dom = new JSDOM(html);
        const maintd = dom.window.document.getElementById('maintext');
        
        console.log('Maintd : ' + maintd.textContent);
        if(!maintd) {
            return null
        }

        const table = maintd.querySelectorAll('table')[0];
        if(!table) {
            return null
        }

        const trLink = table.querySelectorAll('tr')[0];
        if(!trLink) {
            return null
        }

        const tdLink = trLink.querySelectorAll('td')[2];
        if(!tdLink) {

            return null
        }
        const aLink = tdLink.querySelectorAll('a')[0];

        if(!aLink) {
            return null
        }
        return aLink.getAttribute('href');
    }

    static parseUrls(html) {
        const urlBase = 'http://www.portaldalinguaportuguesa.org/advanced.php';
        const dom = new JSDOM(html);
        const maintd = dom.window.document.getElementById('maintext');
        const alinks = maintd.querySelectorAll('a');
        var resultado = {
            anterior : null,
            proximo : null,
            links: [],
        };
        if(alinks) {
            for (var i = 0; i < alinks.length; i++) {
                if(alinks[i].textContent === 'previous') {
                    resultado.anterior = alinks[i].getAttribute('href');
                } else if(alinks[i].textContent === 'next') {
                    resultado.proximo = alinks[i].getAttribute('href');
                } else {
                    resultado.links.push(urlBase + alinks[i].getAttribute('href'));
                }
                
            }
        }
        return resultado;
    }

    static parseQueryString(query) {
        let queryParams = {};
        if(query) {
            let queryStrings = query.substring(1);
            let params = queryStrings.split('&');
    
            for (var i = 0; i < params.length; i++) {
                var pair = params[i].split('=');
                queryParams[pair[0]] = decodeURIComponent(pair[1]);
            }
        }
        return queryParams;
    }

};

module.exports = HtmlParser;