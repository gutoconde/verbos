const sql = require('./sql/Conjugacao');

class RepositorioConjugacao {

    constructor(db) {
        this.db = db;
    }

    recuperarConjugacao(verbo, tempo, modo=null) {
        const resultado = new Promise((resolve, reject) => {
            var param = {
                '$modo' : modo,
                '$tempo' : tempo,
                '$verbo': verbo.normalize('NFD')
            };
            this.db.all(sql.selectConjugacao, param, (error, rows) => {
                if(error) {
                    reject(error);	
                } else {
                    resolve(rows);
                }
            });
        });
        return resultado;
    }

    /**
     * Insere uma nova conugacao.
     * @param {Comjugacao} conjugacao O Objeto deve vir com o codigo do tempo 
     * e nao com o ID. 
     * @returns ID da conjugacao
     */
    insert(conjugacao) {
        const id = new Promise((resolve, reject) => {
            var param = {
                '$idVerbo' : conjugacao.idVerbo,
                '$codigoTempo': conjugacao.codigoTempo.normalize('NFD')
            };
            var stmt = this.db.prepare(sql.insert);
            stmt.run(
                param,
                function(error) {
                    if(error) {
                        reject(error);	
                    } else {
                        resolve(this.lastID);
                    }
            });	
        });
        return id;
    }

    insertForma(forma) {
        const id = new Promise((resolve, reject) => {
            var param = {
                '$idConjugacao' : forma.idConjugacao, 
                '$idPessoa' : forma.idPessoa, 
                '$texto': forma.texto,
            };
            var stmt = this.db.prepare(sql.insertForma);
            stmt.run(param,
                function(error) {
                    if(error) {
                        reject(error);	
                    } else {
                        resolve(this.lastID);
                    }
            });	
        });
        return id;
    }
};
module.exports = RepositorioConjugacao;