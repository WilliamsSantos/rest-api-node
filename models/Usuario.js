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
				  conn.query("SELECT * FROM apinode.usuarios ", function (err, result, fields) {
				    if (err){
				  		console.log(err);
				    }
				   this.dados = result;
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
				var sql = "INSERT INTO  apinode.usuarios (nome, email, senha) VALUES ?";
				var valores = [ [this.nome, this.email, this.senha] ];
			  conn.query(sql, [valores], function (err, result) {
			    if (err){
			    	if(Error == "ER_DUP_ENTRY: Duplicate entry 'Williamsb.boy@hotmail.com' for key 'email_UNIQUE'"){
			    		console.log('Email duplicado');
			    	}
			    	// if(Error == )
			    }
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
		  var sql = "DELETE FROM apinode.usuarios WHERE id = ?";
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
				  sql = "SELECT * FROM apinode.usuarios WHERE id="+this.identificador;
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
		
		this.identificador 	= novosDados.id;
		this.nome 					= novosDados.nome;
		this.email					= novosDados.email;
		this.senha 					= novosDados.senha;
		
		console.log("Estes são os dados dentro do atualizarDados "+this.identificador + this.nome + this.email + this.senha)
		
		conn.connect(function(err) {
		  if (err) console.log(err);
			var sql = "UPDATE 'apinode'.'usuarios' SET 'nome'='"+this.nome+"', 'email'='"+this.email+"', 'senha'='"+this.senha+"' WHERE 'id'='"+this.identificador+"'";
		  conn.query(sql, function (err, result) {
		    if (err) throw err;
		    console.log(result.affectedRows + " UPDATE feito com sucesso!!");
		    return true;
		  });
		});
	}



//	dadosConvertidos = null;
//	if(dados == undefined){
//
//		console.log("retorno da funcao = "+Usuario.prototype.mostraDados());
//		dadosConvertidos = JSON.stringify();
//		console.log("Preenchido com = "+dadosConvertidos);	
//
//		if (dadosConvertidos == undefined) {
//			dadosVazios = {
//				nome  : "",
//				Email : "",
//				Senha : ""
//			}
//			console.log("dados vazios!");
//			return dadosVazios;
//		}else{
//			console.log("dados convertidos = "+dadosConvertidos)
//			return dadosConvertidos;
//		}		
//	}else{
//
//		this.nome 	= dados.nome;
//		this.email 	= dados.email;
//		this.senha 	= dados.senha;
//
//	}






module.exports = Usuario;