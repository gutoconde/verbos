'use strict';

const servicoIntegracaoPortalLP = require('../integracao/ServicoIntegracaoPortalLP');
const ConjugacaoNaoEncontradaError = require('../model/ConjugacaoNaoEncontradaError');

const ConjugacaoUtil = require('../util/ConjugacaoUtil');

class ServicoConjugacao {

    constructor(repositorio, repositorioVerbo) {
        this.repositorio = repositorio;
        this.repositorioVerbo = repositorioVerbo;
    }

    async recuperarConjugacao(verbo, tempo, modo) {
        var vb = await this.repositorioVerbo.recuperarVerbo(verbo);
        var conjugacoes = [];
        if(vb) {
            conjugacoes = await this.repositorio.recuperarConjugacao(verbo, tempo, modo);
        } else {
            await this.recuperarConjugacaoDaInternet(verbo);
            console.log('verbo ' + verbo + ' carregado');
            conjugacoes = await this.repositorio.recuperarConjugacao(verbo, tempo, modo);
        }
        
        return ConjugacaoUtil.montarConjugacao(conjugacoes);
    }
 
    async recuperarConjugacaoDaInternet(verbo) {
        var conjugacoes = await servicoIntegracaoPortalLP.listarConjugacoes(verbo);
        if(!conjugacoes) {
            throw new ConjugacaoNaoEncontradaError("Conjugação do verbo " + verbo + " não encontrada");
        }
        var vb = {
            codigo : verbo.toUpperCase(),
            descricao: verbo,
        };
        var idVerbo = await this.repositorioVerbo.insert(vb);
        
        for(var i=0; i < conjugacoes.length; i++) {
            var conjugacao = {
                idVerbo: idVerbo,
                codigoModo: conjugacoes[i].modo,
                codigoTempo: conjugacoes[i].tempo,
            };
            var idConjugacao = await this.repositorio.insert(conjugacao);
            var textosFormas = conjugacoes[i].verbos; 
            //var textosFormas = textosFormas.filter(texto => texto !== null && texto.trim() !== '');
            for(var j=0; j < textosFormas.length; j++ ) {
                var forma = {
                    idConjugacao: idConjugacao,
                    texto : textosFormas[j],
                    idPessoa: j + 1,
                };
                
                if(conjugacoes[i].tempo === 'INFINITIVO' || 
                    conjugacoes[i].tempo === 'GERUNDIO' || 
                    conjugacoes[i].tempo === 'PARTICIPIO_PASSADO' ) {
                        forma.idPessoa = null;
                }

                if(conjugacoes[i].tempo === 'IMPERATIVO_AFIRMATIVO' || 
                    conjugacoes[i].tempo === 'IMPERATIVO_NEGATIVO') {
                        if(forma.idPessoa === 3) {
                            forma.idPessoa = 7
                        };
                        if(forma.idPessoa === 6) {
                            forma.idPessoa = 8
                        };
                }
                if(forma.texto !== null && forma.texto.trim() != '') {
                    await this.repositorio.insertForma(forma);
                }
                
            }
            
        }
    }
};

module.exports = ServicoConjugacao;