'use strict';

class ConjugacaoNaoEncontradaError extends Error {
    constructor(message) {
        super(message);
        this.name = this.constructor.name;
    }
};

module.exports = ConjugacaoNaoEncontradaError;