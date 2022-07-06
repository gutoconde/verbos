const assert = require('assert');
const servicoIntegracao = require('../../integracao/ServicoIntegracaoPortalLP');

describe('Testando parse de conjugações', () => {
    const testCases = require('./HtmlParserTestCases');
    testCases.forEach(testCase => {
        
        var descricao = 'Testando verbo ' + testCase.verbo + ' no tempo ' + testCase.tempo + (testCase.modo ? ' do ' + testCase.modo : '');
        
        it(descricao, async() => {
            var resposta = await servicoIntegracao.listarConjugacoes(testCase.verbo);
            var conjugacao = resposta.conjugacao.filter(c => c.modo === testCase.modo && c.tempo === testCase.tempo)[0];
            //console.log(conjugacao);
            conjugacao.verbos.forEach((verbo, index) => {
                assert.equal(verbo, testCase.verbosEsperados[index]);
            });
        });
    });
});