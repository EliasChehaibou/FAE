var express = require("express");

require("dotenv").config();

var PORT = process.env.PORT || 2000;

var cors = require("cors");
var mysql = require("mysql");

var connection;

var dbhost = process.env.DB_HOST || "localhost";
var dbuser = process.env.DB_USER || "root";
var dbpassword = process.env.DB_PASSWORD || "";
var dbname = process.env.DB_NAME || "ebey";
var dev_database_url =
  "mysql://" + dbuser + ":" + dbpassword + "@" + dbhost + "/" + dbname;

const app = express();

function handleMysqlContext() {
  connection = mysql.createConnection(
    process.env.CLEARDB_DATABASE_URL || dev_database_url
  );
  connection.connect(function (err) {
    if (err) {
      console.log("error when connecting to db:", err);
      setTimeout(handleMysqlContext, 2000);
    }
  });
  connection.on("error", function (err) {
    console.log("db error", err);
    if (err.code === "PROTOCOL_CONNECTION_LOST") {
      // Connection to the MySQL server is usually
      handleMysqlContext(); // lost due to either server restart, or a
    } else {
      // connnection idle timeout (the waittimeout
      throw err; // server variable configures this)
    }
  });
}

handleMysqlContext();

app.use(cors());
app.use(express.urlencoded());
app.use(express.json());

/*app.get('/api/fae', (,res) => {
    res.send({
        msg: "Chez FAE on a tout ce qu'on veut!"
    })
})*/
app.listen(PORT, () => {
  console.log(`le serveur est lancé sur le port: ${PORT}`);
});

// recherche annonces
app.get("/search/annonces", function (req, res) {
  var query = "SELECT * from annonces";
  connection.query(query, function (error, results, fields) {
    if (error) throw error;
    res.send(JSON.stringify(results));
  });
});

// recherche annonces par categorie
app.get("/search/annonces/categorie", function (req, res) {
  var params = req.query;
  var query =
    "SELECT * from annonces where IDCategorie =" +
    connection.escape(params.IDCate);
  connection.query(query, function (error, results, fields) {
    if (error) throw error;
    res.send(JSON.stringify(results));
  });
});

// recherche annonces avec texte
app.get("/search/annonces/recherche", function (req, res) {
  var params = req.query;
  var query = "SELECT * from annonces where Titre LIKE '%" + params.Texte;
  query += "%'";
  connection.query(query, function (error, results, fields) {
    if (error) throw error;
    res.send(JSON.stringify(results));
  });
});

// recherche annonces avec texte et categorie
app.get("/search/annonces/rechcate", function (req, res) {
  var params = req.query;
  var query = "SELECT * from annonces where Titre LIKE '%" + params.Texte;
  query += "%' AND IDCategorie =" + connection.escape(params.IDCate);
  connection.query(query, function (error, results, fields) {
    if (error) throw error;
    res.send(JSON.stringify(results));
  });
});

// recherche categories
app.get("/search/categories", function (req, res) {
  var query = "SELECT * from categories";
  connection.query(query, function (error, results, fields) {
    if (error) throw error;
    res.send(JSON.stringify(results));
  });
});

// formulaire d'inscription
app.post("/inscription", function (req, res) {
  var params = req.body;
  var userID;
  if (params.Birthdate == "") {
    delete params.Birthdate;
  }
  if (params.Confirm) {
    delete params.Confirm;
  }
  connection.query(
    "SELECT MAX(IDUtilisateur) AS IDUser from utilisateurs",
    function (error, results, fields) {
      if (error) throw error;
      userID = results[0].IDUser;
      connection.query(
        "INSERT INTO `utilisateurs` SET IDUtilisateur = " +
          (userID + 1) +
          ", ?",
        params,
        function (error, results, fields) {
          if (error) throw error;
          res.status(204).send();
        }
      );
    }
  );
});

// formulaire de connexion
app.post("/connexion", function (req, res) {
  var params = req.body;
  console.log(params);
  connection.query(
    "SELECT IDUtilisateur from utilisateurs WHERE Email='" +
      params.Email +
      "' AND password='" +
      params.Password +
      "'",
    function (error, results, fields) {
      if (error) throw error;
      console.log(results);
      res.send(JSON.stringify(results));
    }
  );
});
