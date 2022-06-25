'use strict';

const conjugacaoController = require('./conjugacao/ConjugacaoController');
const verboController = require('./verbo/VerboController');

module.exports = function(app) {
    app.route('/rest/conjugacao/:modo?/:tempo').get(conjugacaoController.recuperarConjugacao);
    app.route('/rest/verbos').get(verboController.listarVerbos);
};