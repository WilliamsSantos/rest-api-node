//CONEXÃO COM DB
const mysql = require('mysql');

const con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "apinode"
});


con.connect(function(err) {
  if (err) console.log(" Erro ao conectar-se ao banco de dados. /n verifique se o servidor está desligado. "+err) ;
  console.log("Connectado!");
});

module.exports = con;
