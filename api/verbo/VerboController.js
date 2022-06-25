const ServiceFatory = require('../model/ServiceFactory');

module.exports.listarVerbos = async(req, res) => {
	try {
		const verbos = await ServiceFatory.getRepositorioVerbo(req.db).listarVerbos();
		res.json(verbos);
		res.end();
	} catch (err) {
		console.error(err.stack);
		var data = {
			'mensagem' : 'Erro ao recuperar verbos: ' + err.message,
			'error' : err.message
		}
		res.status(500).json(data);
	}
};