const mysql	= require('mysql');
const conn  = require('../db/db_connection');
var Usuario = function(){}	


// Função que retorna a consulta no banco de dados na variavel dados

	Usuario.prototype.mostraDados = function(callback){
	
		this.usuario_id;
		console.log("Esse é o usuario "+this.usuario_id);
	//função para pesquisas especificas atraves de um parametro ID
		conn.connect((err) => {
			if(err)console.log(err);
			  conn.query("SELECT * FROM usuarios.usuario ", function (err, result, fields) {
			    if (err){
			  		console.log(err);
			    }
			   	this.dados = result;
		     	console.log("dados do DB = "+this.dados);
		     	return callback(this.dados);  
			});
		});	
	}
//função que grava as funções no DB

	Usuario.prototype.gravarDados = function(valores){
		this.nome 	= valores.nome;
		this.senha 	= valores.senha;
		this.email 	= valores.email;
	
		conn.connect((err) => {
			if (err) console.log(err) ;
			var sql = "INSERT INTO  usuarios.usuario (nome, email, senha) VALUES ?";
			var valores = [ [this.nome, this.email, this.senha] ];
		  conn.query(sql, [valores], function (err, result) {
		    if (err)console.log(err);
		    	console.log("Gravado com sucesso!!");
		  });
		});
		return true;
	}

//função que apaga os dados no DB

	Usuario.prototype.apagarDados = function(id){
	 	this.usuario = id;
	 	console.log("Esse é o id para apagar = "+this.usuario);
		conn.connect((err) => {
		  if (err) console.log(err);
		  //ele deleta os dados por ID
		  var sql = "DELETE FROM usuarios.usuario WHERE idusuario = ?";
		  conn.query(sql,[this.usuario], function (err, result) {
		    if (err) console.log(err)
		    console.log("Dado deletado com sucesso!!!: " + result.affectedRows);
		  });
		});
		return;
	}


//função que da update no DB

	Usuario.prototype.usuarioParaUpdate = function(usuario_id, callback ){
		console.log('ESTOU DENTRO DE usuarioUpdate ');
		console.log('Usuario id = '+usuario_id);
		this.identificador = usuario_id;	

			conn.connect((err) => {
				  if (err) {
				  	console.log(err);
				  }
				  sql = "SELECT * FROM usuarios.usuario WHERE idusuario = "+this.identificador+" ;";
				  console.log("ESSE É o sql = "+sql);
				  conn.query(sql, function (err, result, fields) {
				    if (err){
				  		console.log(err);
				    }
				   this.dados = result;
				   console.log('Usuario id = '+JSON.stringify(this.dados));
			     return callback(this.dados);  
				});
			});	
		return;
	}

	Usuario.prototype.atualizarDados = function(novosDados){
		
		// console.log('=========================================');
		// console.log(novosDados);
		// console.log('=========================================');

		let identificador 	= novosDados[0].id;
		let nome 			= novosDados[0].nome;
		let email			= novosDados[0].email;
		let senha 			= novosDados[0].senha;
	
	//tem que verificar as variaveis preenchidas e as recolher dentro de uma array ou hash. 
	// Depois puxar os dados que já estão cadastrodos no db do usuario selecionado 
	// e dizer se a variavel com o novo dado está preenchida então salva no banco de dados, 
	// se está vazia então puxa aquele dado antigo ja cadastado no db preenche a variavel depois, salva  	
	console.log("Estes são os dados dentro do atualizarDados "+identificador+" "+ nome +" "+ email +" "+ senha);			
				dados_preenchidos = {};
					if(nome == ""){				
						dados_preenchidos['nome'] = nome;
						console.log("Estes dados "+dados_preenchidos);
					}else{
						dados_preenchidos['nome'] = nome;
					}
					if(senha == ""){
						dados_preenchidos['senha'] = senha;
					}else{
						dados_preenchidos['senha'] = senha ;
					}
					if(email == ""){
						dados_preenchidos['email'] = email;
					}else{
						dados_preenchidos['email'] = email;
					}
			
			console.log("dados preenchidos depois do loop "+dados_preenchidos);
			conn.connect(function(err) {
			  if (err) console.log(err);
				var sql = "UPDATE `usuarios`.`usuario` SET `nome`=`"+nome+"`, `email`=`"+email+"`, `senha`=`"+senha+"` WHERE `idusuario` =`"+identificador+"`;";
			  conn.query(sql, function (err, result) {
			    if (err) throw err;
			    console.log(result.affectedRows + " UPDATE feito com sucesso!!");
			    return true;
			  });
			});
		};

module.exports = Usuario;