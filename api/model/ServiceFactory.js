const RepositorioConjugacao = require('../model/RepositorioConjugacao');
const RepositorioVerbo = require('../model/RepositorioVerbo');

const ServicoConjugacao = require('../model/ServicoConjugacao');

class ServiceFactory {

    static getRepositorioConjugacao(db) {
        return new RepositorioConjugacao(db);
    }

    static getRepositorioVerbo(db) {
        return new RepositorioVerbo(db);
    }

    static getServicoConjugacao(db) {
        return new ServicoConjugacao(
            ServiceFactory.getRepositorioConjugacao(db),
            ServiceFactory.getRepositorioVerbo(db)
        );
    }
};
module.exports = ServiceFactory;

