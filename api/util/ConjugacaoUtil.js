'use strict';

class ConjugacaoUtil {

    static montarConjugacao(conjugacoes) {
        conjugacoes.forEach(conjugacao => {
            if(conjugacao.verbo) {
                var texto = conjugacao.textoFormato.replace('${PESSOA}', conjugacao.pessoa ? conjugacao.pessoa : '');
                texto = texto.replace('${VERBO}', conjugacao.verbo ? conjugacao.verbo : '');
                conjugacao.conjugacao = texto.toLowerCase();
            } else {
                conjugacao = null; 
            }
        });
        return conjugacoes;
    }

};

module.exports = ConjugacaoUtil;