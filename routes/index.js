const express	 	= require('express');
const router 		= express.Router();
const message 		= "";
const User 			= require('../models/Usuario');

/* GET home page. */

router.get('/', function(req, res, next) {

	let usuario = new User();
	usuario.mostraDados((callback) => {
		console.log(callback);
		res.render('index', {
			title: 'Bem vindo a simples API',
			message: "", 
			dados: callback
		});
	});
});

router.get('/apagar/usuario:id', function(req, res, next) {
  
	let usuario = new User();
	usuario.apagarDados(req.params.id);
	res.redirect('/');

});

router.post('/registrando', function(req, res, next) {
  
	let novoUsuario = { nome: req.body.nome, email: req.body.email, senha:req.body.senha};
	let usuario 	= new User();
	usuario.gravarDados(novoUsuario);
	res.redirect('/');	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              ('/');
});

//UPDATE view
router.get('/usuario/(:id)', function(req, res, next) {
  
	let usuario_id 	= [req.params.id];
	let usuario = new User();
	console.log('================================= '+usuario_id);
	usuario.usuarioParaUpdate(usuario_id, function(callback) {
	console.log("USUARIO UPDATE "+JSON.stringify(callback));	
		res.render('update', {
				title: 'Alterar usuario',
				message: "",
				usuario: callback
			});		
	});
		
});

router.post('/alterado:id', function(req, res, next) {
	
	let novosDados = [
		{
			id: 	req.params.id,
			nome: 	req.body.nome, 
			email: 	req.body.email, 
			senha: 	req.body.senha 
		}
	
	];

	console.log('Novos dados para atualizar '+ novosDados);
	let usuario = new User();
	usuario.atualizarDados(novosDados);
	res.redirect('/');	        

});

module.exports = router;
























