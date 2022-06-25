const sql = require('./sql/Verbo');

class RepositorioVerbo {

    constructor(db) {
        this.db = db;
    }

    insert(verbo) {
        var param = {
            '$codigo' : verbo.codigo.normalize('NFD'),
            '$descricao' : verbo.descricao
        }
        const id = new Promise((resolve, reject) => {
            var stmt = this.db.prepare(sql.insert);
            stmt.run(param,
                function(error){
                    if(error) {
                        reject(error);	
                    } else {   
                        resolve(this.lastID);
                    }
                });	
        });
        return id;
    }

    listarVerbos() {
        const resultado = new Promise((resolve, reject) => {
            this.db.all(sql.selectVerbos, (error, rows) => {
                if(error) {
                    reject(error);	
                } else {
                    resolve(rows);
                }
            });
        });
        return resultado;
    }

    recuperarVerbo(codigo) {
        const verbo = new Promise((resolve, reject) => {
            var param = {
                '$codigo' : codigo.normalize('NFD'),
            };
            this.db.get(sql.selectVerboPorCodigo, param, (error, row) => {
                if(error) {
                    reject(error);	
                } else {
                    resolve(row);
                }
            });
        });
        return verbo;
    }

    
};

module.exports = RepositorioVerbo;