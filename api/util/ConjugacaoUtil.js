'use strict';

class ConjugacaoUtil {

    static montarConjugacao(conjugacoes) {
        conjugacoes.forEach(conjugacao => {
            var texto = conjugacao.textoFormato.replace('${PESSOA}', conjugacao.pessoa ? conjugacao.pessoa : '');
            texto = texto.replace('${VERBO}', conjugacao.verbo ? conjugacao.verbo : '');
            conjugacao.conjugacao = texto.toLowerCase();
        });
        return conjugacoes;
    }

};

module.exports = ConjugacaoUtil;