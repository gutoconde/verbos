const ServiceFatory = require('../model/ServiceFactory');
const ConjugacaoNaoEncontradaError = require('../model/ConjugacaoNaoEncontradaError');

module.exports.recuperarConjugacao = async(req, res) => {
	try {
        var modo = req.params.modo ? req.params.modo : null;
        var tempo = req.params.tempo;
        var verbo = req.query.verbo;
		const conjugacao = await ServiceFatory.getServicoConjugacao(req.db).recuperarConjugacao(verbo, tempo, modo);
		res.json(conjugacao);
		res.end();
	} catch (err) {
		console.log(err);
		var data = {
			'mensagem' : 'Erro ao recuperar conjugação: ' + err.message,
			'error' : err.stack
		};
		res.status(err instanceof ConjugacaoNaoEncontradaError ? 404 : 500).json(data);
	}
};