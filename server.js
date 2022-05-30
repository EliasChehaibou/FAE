var express = require("express");
require("dotenv").config();
var PORT = process.env.PORT || 2000;
var cors = require("cors");
var mysql = require("mysql");
var connection;
var dbhost = process.env.DB_HOST || "localhost";
var dbuser = process.env.DB_USER || "root";
var dbpassword = process.env.DB_PASSWORD || "";
var dbname = process.env.DB_NAME || "fae_database";
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

app.use(cors({ origin: "*" }));
app.use(express.urlencoded());
app.use(express.json());

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
          ", IDHistorique = " +
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
  connection.query(
    "SELECT IDUtilisateur, IDAdmin from utilisateurs WHERE Email='" +
      params.Email +
      "' AND password='" +
      params.Password +
      "'",
    function (error, results, fields) {
      if (error) throw error;
      res.send(JSON.stringify(results));
    }
  );
});

// recherche utilisateur
app.get("/search/utilisateur", function (req, res) {
  var params = req.query;
  var query =
    "SELECT * from utilisateurs where IDUtilisateur =" +
    connection.escape(params.IDUtilisateur);
  connection.query(query, function (error, results, fields) {
    if (error) throw error;
    res.send(JSON.stringify(results));
  });
});

// recherche detail
app.get("/search/detail", function (req, res) {
  var params = req.query;
  var query =
    "SELECT * from annonces where IDAnnonce =" +
    connection.escape(params.IDAnnonce);
  connection.query(query, function (error, results, fields) {
    if (error) throw error;
    res.send(JSON.stringify(results));
  });
});

// enchere offre
app.get("/encherir", function (req, res) {
  console.log("ok");
  var params = req.query;
  var query =
    "UPDATE annonces set Enchere =" +
    params.Enchere +
    ", IDAcheteur = " +
    params.IDUtilisateur +
    " where IDAnnonce =" +
    params.IDAnnonce;
  connection.query(query, function (error, results, fields) {
    if (error) throw error;
    res.status(204).send();
  });
});

// achat immédiat offre
app.get("/achim", function (req, res) {
  var params = req.query;
  var annonce = JSON.parse(params.Annonce);
  var DateCrea = annonce.DateCrea.slice(0, 19).replace("T", " ");
  var DateFin = annonce.DateFin.slice(0, 19).replace("T", " ");
  var query =
    "INSERT INTO historiques(IDAnnonce, IDUtilisateur, EnchereDepart, Enchere, Description, AchatImmediat, IsAchIm, IDCategorie, DateCrea, DateFin, Titre, IDAcheteur) VALUES ('" +
    annonce.IDAnnonce +
    "', '" +
    annonce.IDUtilisateur +
    "', '" +
    annonce.EnchereDepart +
    "', '" +
    annonce.Enchere +
    "', '" +
    annonce.Description +
    "', '" +
    annonce.AchatImmediat +
    "', '" +
    annonce.IsAchIm +
    "', '" +
    annonce.IDCategorie +
    "', '" +
    DateCrea +
    "', '" +
    DateFin +
    "', '" +
    annonce.Titre +
    "', '" +
    params.IDUtilisateur +
    "');";
  connection.query(query, function (error, results, fields) {
    if (error) throw error;
    query =
      " DELETE FROM annonces where IDAnnonce = '" + annonce.IDAnnonce + "';";
    connection.query(query, function (error, results, fields) {
      if (error) throw error;
      res.status(204).send();
    });
  });
});

// formulaire poster une annonce
app.post("/poster", function (req, res) {
  var params = req.body;
  var IDAnnonce1;
  var IDAnnonce2;
  var IDAnnonce;
  connection.query(
    "SELECT MAX(IDAnnonce) AS IDAnnonce from annonces",
    function (error, results, fields) {
      if (error) throw error;
      IDAnnonce1 = results[0].IDAnnonce;
      connection.query(
        "SELECT MAX(IDAnnonce) AS IDAnnonce from historiques",
        function (error, results, fields) {
          if (error) throw error;
          IDAnnonce2 = results[0].IDAnnonce;
          IDAnnonce = Math.max(IDAnnonce1, IDAnnonce2);
          connection.query(
            "INSERT INTO `annonces` SET DateCrea=NOW(), IDAnnonce = " +
              (IDAnnonce + 1) +
              ", IDUtilisateur = " +
              params.IDUtilisateur +
              ", ?",
            params.Annonce,
            function (error, results, fields) {
              if (error) throw error;
              res.status(204).send();
            }
          );
        }
      );
    }
  );
});

// recherche historique
app.get("/historique", function (req, res) {
  var params = req.query;
  connection.query(
    "SELECT * from historiques where IDUtilisateur =" + params.IDUtilisateur,
    function (error, results, fields) {
      if (error) throw error;
      var vend = JSON.stringify(results);
      connection.query(
        "SELECT * from historiques where IDAcheteur =" + params.IDUtilisateur,
        function (error, results, fields) {
          if (error) throw error;
          var ach = JSON.stringify(results);
          connection.query(
            "SELECT * from annonces where IDUtilisateur =" +
              params.IDUtilisateur,
            function (error, results, fields) {
              if (error) throw error;
              var vent = JSON.stringify(results);
              connection.query(
                "SELECT * from annonces where IDAcheteur =" +
                  params.IDUtilisateur,
                function (error, results, fields) {
                  if (error) throw error;
                  var enc = JSON.stringify(results);
                  res.send({
                    vendues: vend,
                    achetees: ach,
                    vente: vent,
                    enchere: enc,
                  });
                }
              );
            }
          );
        }
      );
    }
  );
});

// recherche liste utilisateurs
app.get("/search/utilisateurs", function (req, res) {
  var params = req.query;
  var query =
    "SELECT * FROM utilisateurs WHERE NOT IDUtilisateur= " +
    params.IDUtilisateur;
  connection.query(query, function (error, results, fields) {
    if (error) throw error;
    res.send(JSON.stringify(results));
  });
});

// supprimer categorie
app.get("/delete/categorie", function (req, res) {
  var params = req.query;
  var query =
    "DELETE FROM categories WHERE IDCategorie=" +
    params.IDCategorie +
    " AND Nom='" +
    params.Nom +
    "'";
  connection.query(query, function (error, results, fields) {
    if (error) throw error;
    res.status(204).send();
  });
});

// formulaire de création de catégorie
app.post("/createcate", function (req, res) {
  var params = req.body;
  connection.query(
    "SELECT MAX(IDCategorie) AS IDCate from categories",
    function (error, results, fields) {
      if (error) throw error;
      cateID = results[0].IDCate;
      connection.query(
        "INSERT INTO `categories` SET IDCategorie = " +
          (cateID + 1) +
          ", Nom = '" +
          params.Nom +
          "'",
        function (error, results, fields) {
          if (error) throw error;
          res.status(204).send();
        }
      );
    }
  );
});

// supprimer utilisateur
app.get("/delete/user", function (req, res) {
  var params = req.query;
  var query =
    "DELETE FROM utilisateurs WHERE IDUtilisateur=" + params.IDUtilisateur;
  connection.query(query, function (error, results, fields) {
    if (error) throw error;
    res.status(204).send();
  });
});

// supprimer annonce
app.get("/delete/annonce", function (req, res) {
  var params = req.query;
  const annonce = JSON.parse(params.Annonce);
  var query = "DELETE FROM annonces WHERE IDAnnonce=" + annonce.IDAnnonce;
  try {
    connection.query(query, function (error, results, fields) {
      if (error) throw error;
      res.status(204).send();
    });
  } catch (error) {
    console.log(error);
  }
});
